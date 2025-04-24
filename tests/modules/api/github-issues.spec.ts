import { test, expect } from '../../../src/modules/api/setup';
import { TestData } from '../../../src/modules/api/fixtures/test-data';

test.describe('GitHub Issues API Tests', () => {
  
  test('Create a new issue successfully', async ({ issuesService }) => {
    const testIssueData = TestData.issues.createTestIssue();
    const result = await issuesService.createIssue(testIssueData);
    
    // Verify issue was created successfuly
    expect(result.success).toBe(true);
    expect(result.status).toBe(201);
    expect(result.data).toBeDefined();
    
    if (result.data) {
      expect(result.data.title).toBe(testIssueData.title);
      expect(result.data.body).toBe(testIssueData.body);
      
      // Clean up - close the issue
      await issuesService.closeIssue(result.data.number);
    } else {
      expect(result.data).toBeDefined();
    }
  });
  
  test('Create a new issue: missing required fields', async ({ issuesService }) => {
    // Create a new issue without a title (required field)
    const invalidIssueData = { body: 'This issue has no title' } as any;
    const result = await issuesService.createIssue(invalidIssueData, undefined, undefined, { failOnError: false });
    
    // Verify error response
    expect(result.success).toBe(false);
    expect(result.status).toBe(422);
    expect(result.error).toBeDefined();
    expect(result.error).toContain('title');
    expect(result.error).toContain("wasn't supplied.");
  });
  
  test('Create a new issue with title only', async ({ issuesService }) => {
    const minimalIssueData = { title: 'Automation UI Tiltle only Issue' };
    const result = await issuesService.createIssue(minimalIssueData);
    
    // Verify success
    expect(result.success).toBe(true);
    expect(result.status).toBe(201);
    expect(result.data).toBeDefined();
    
    if (result.data) {
      expect(result.data.title).toBe(minimalIssueData.title);
      
      // Clean up - close the issue
      await issuesService.closeIssue(result.data.number);
    } else {
      expect(result.data).toBeDefined();
    }
  });

  test('Create issue with special characters in title and body', async ({ issuesService }) => {
    const specialCharsIssue = {
      title: '🚀 Special Characters: €üñíçødê & <script>alert("test")</script>',
      body: '# Markdown header\n\n* Emoji: 🔥🌟\n* Special chars: ©®™\n* HTML: <b>bold</b>\n* Code: ```const test = "value";```'
    };
    
    const result = await issuesService.createIssue(specialCharsIssue);
    
    // Verify success
    expect(result.success).toBe(true);
    expect(result.status).toBe(201);
    expect(result.data).toBeDefined();
    
    if (result.data) {
      // GitHub might sanitize HTML tags, so we check for partial matches
      expect(result.data.title).toContain('Special Characters');
      expect(result.data.title).toContain('üñíçødê');
      expect(result.data.body).toContain('Markdown header');
      expect(result.data.body).toContain('Emoji');
      
      // Clean up - close the issue
      await issuesService.closeIssue(result.data.number);
    } else {
      expect(result.data).toBeDefined();
    }
  });

  test('Create issue with very long title (boundary testing)', async ({ issuesService }) => {
    // GitHub typically has a limit around 256 chars for titles
    const longTitle = 'A'.repeat(250);
    const longTitleIssue = {
      title: longTitle,
      body: 'Testing with a very long title to check GitHub API limits'
    };
    
    const result = await issuesService.createIssue(longTitleIssue);
    
    // Verify success
    expect(result.success).toBe(true);
    expect(result.status).toBe(201);
    expect(result.data).toBeDefined();
    
    if (result.data) {
      expect(result.data.title).toBe(longTitle);
      
      // Clean up - close the issue
      await issuesService.closeIssue(result.data.number);
    } else {
      expect(result.data).toBeDefined();
    }
  });

  test('Create issue with very long body content', async ({ issuesService }) => {
    // Create a large body (65KB is well within GitHub's limits but tests large payloads)
    const longBody = 'B'.repeat(65000);
    const longBodyIssue = {
      title: 'Issue with very long body content',
      body: longBody
    };
    
    const result = await issuesService.createIssue(longBodyIssue);
    
    // Verify success
    expect(result.success).toBe(true);
    expect(result.status).toBe(201);
    expect(result.data).toBeDefined();
    
    if (result.data) {
      expect(result.data.title).toBe(longBodyIssue.title);
      expect(result.data.body.length).toBe(longBody.length);
      
      // Clean up - close the issue
      await issuesService.closeIssue(result.data.number);
    } else {
      expect(result.data).toBeDefined();
    }
  });

  test('Check non-existent issues', async ({ issuesService, request }) => {
    const nonExistentIssueNumber = 999999999;
    
    try {
      await issuesService.getIssue(nonExistentIssueNumber);
      expect(true).toBe(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toContain('Failed to get issue');
        expect(error.message).toContain('404');
      } else {
        expect(error).toBe('Error should be an instance of Error');
      }
    }
  });
});