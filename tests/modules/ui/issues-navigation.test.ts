import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/modules/ui/pages/login/LoginPage';
import { RepositoryPage } from '../../../src/modules/ui/pages/repo/RepositoryPage';
import { IssuesListPage } from '../../../src/modules/ui/pages/issues/IssuesListPage';
import dotenv from 'dotenv';

dotenv.config();

test.describe('GitHub Issue Tests', () => {
  let repoOwner: string;
  let repoName: string;

  test.beforeEach(async ({ page }) => {
    // Get credentials
    const username = process.env.GITHUB_USERNAME;
    const password = process.env.GITHUB_PASSWORD;
    repoOwner = process.env.GITHUB_OWNER || '';
    repoName = process.env.GITHUB_REPO || '';

    if (!username || !password) {
      throw new Error('Environment variables GITHUB_USERNAME and GITHUB_PASSWORD must be defined.');
    }

    if (!repoOwner || !repoName) {
      throw new Error('Environment variables GITHUB_OWNER and GITHUB_REPO must be defined.');
    }

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.navigate('https://github.com/login');
    await loginPage.login(username, password);
  });

  test('End-to-End test: Create GitHub issue, close it and check the issue list', async ({ page }) => {
    const repoPage = new RepositoryPage(page);
    // Navigate to the repository page
    await repoPage.navigateTo(repoOwner, repoName);
    
    // Verify we're on the correct repository
    const isOnRepo = await repoPage.isOnRepository(repoOwner, repoName);
    expect(isOnRepo).toBeTruthy();

    // Navigate to the issues tab
    await repoPage.openIssuesPage();

    // Create instance of issues page
    const issuesPage = new IssuesListPage(page);

    // Verify if issues page is opened
    const isOnIssuesPage = await issuesPage.isOnIssuesPage();
    expect(isOnIssuesPage).toBeTruthy();

    // Verify the New Issue button is visible
    const hasNewIssueButton = await issuesPage.hasNewIssueButton();
    expect(hasNewIssueButton).toBeTruthy();

    // Click on New Issue button and get new issue page
    const newIssuePage = await issuesPage.openNewIssuePage();
    const hasRequiredElements = await newIssuePage.hasRequiredElements();
    expect(hasRequiredElements).toBeTruthy();

    // Create a new issue
    const timestamp = new Date().toISOString();
    const issueTitle = `Test Issue - ${timestamp}`;
    const issueDescription = `Test Issue Description UI automation.\n\nTimestamp: ${timestamp}`;

    const issuePage = await newIssuePage.createIssue(issueTitle, issueDescription);

    // Verify the issue was created successfully
    const isCreated = await issuePage.verifyIssueCreated();
    expect(isCreated).toBeTruthy();

    // Verify the issue title matches what we created
    const actualTitle = await issuePage.getIssueTitle();
    expect(actualTitle).toContain(issueTitle);

    // Navigate back to the issues list
    await repoPage.openIssuesPage();
    const issuesPageAfterCreation = new IssuesListPage(page);

    // Verify the issue appears in the list
    const issueExistsInOpen = await issuesPageAfterCreation.hasIssueWithTitle(issueTitle);
    expect(issueExistsInOpen).toBeTruthy();

    // Open the issue again
    const reopenedIssuePage = await issuesPageAfterCreation.openIssueByTitle(issueTitle);

    // Close the issue
    await reopenedIssuePage.closeIssue();

    // Verify the issue is now closed
    const isClosed = await reopenedIssuePage.isIssueClosed();
    expect(isClosed).toBeTruthy();

    // Navigate back to the issues list
    const issuesPageAfterClosing = await reopenedIssuePage.goBackToIssuesList();

    // Verify the issue is not in the Open issues list
    await issuesPageAfterClosing.switchToOpenIssues();
    const issueExistsInOpenAfterClosing = await issuesPageAfterClosing.hasIssueWithTitle(issueTitle);
    expect(issueExistsInOpenAfterClosing).toBeFalsy();

    // Verify the issue is now in the Closed issues list
    await issuesPageAfterClosing.switchToClosedIssues();
    const issueExistsInClosed = await issuesPageAfterClosing.hasIssueWithTitle(issueTitle);
    expect(issueExistsInClosed).toBeTruthy();
  });
});