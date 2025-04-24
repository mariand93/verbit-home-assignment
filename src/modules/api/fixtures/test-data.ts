/**
 * Generate test issue data with a unique timestamp
 */
export const TestData = {
  issues: {
    createTestIssue() {
      const timestamp = new Date().toISOString();
      return {
        title: `API Test Issue - ${timestamp}`,
        body: `This is an automated test issue created via API.\n\nTimestamp: ${timestamp}`,
      };
    }
  }
};

