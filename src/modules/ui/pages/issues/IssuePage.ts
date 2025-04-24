    import { Page } from 'playwright';
    import { BasePage } from '../BasePage';
    import { IssuesListPage } from './IssuesListPage';
    import { IssueElements } from '../../elements/issues/IssueElements';


export class IssuePage extends BasePage {

    /**
     * Verifies if the issue was successfully created
     * @returns {Promise<boolean>} True if the issue exists and is in the open state
     */
    async verifyIssueCreated(): Promise<boolean> {
      // Wait for the issue page to load completely
      await this.page.waitForSelector(IssueElements.issueTitle, { state: 'visible' });
      
      // Verify that we have an open issue
      const stateText = await this.page.locator(IssueElements.issueState).textContent();
      const isTitleVisible = await this.page.locator(IssueElements.issueTitle).isVisible();
      const isBodyVisible = await this.page.locator(IssueElements.issueBody).isVisible();
      
      // Take a verification screenshot
      await this.page.screenshot({ path: 'screenshots/issue-created.png' });
      
      return isTitleVisible && isBodyVisible && stateText?.includes('Open') === true;
    }
    
    /**
     * Gets the issue title
     * @returns {Promise<string>} The issue title
     */
    async getIssueTitle(): Promise<string> {
      return (await this.page.locator(IssueElements.issueTitle).textContent()) ?? '';
    }
    
    /**
     * Gets the issue body/description
     * @returns {Promise<string>} The issue description
     */
    async getIssueBody(): Promise<string> {
      return (await this.page.locator(IssueElements.issueBody).textContent()) ?? '';
    }

/**
   * Closes the current issue
   * @returns {Promise<IssuePage>} The updated issue page
   */
async closeIssue(): Promise<IssuePage> {
    console.log('Closing the current issue');
    
    // Find and click the Close Issue button
    await this.page.waitForSelector(IssueElements.closeIssueButton, {
      state: 'visible',
      timeout: 10000
    });
    await this.page.click(IssueElements.closeIssueButton);
    
    // If there's a confirmation dialog, handle it
    const hasConfirmDialog = await this.page.isVisible(IssueElements.confirmCloseButton, { timeout: 5000 }).catch(() => false);
    if (hasConfirmDialog) {
      await this.page.click(IssueElements.confirmCloseButton);
    }
    
    // Wait for the issue state to change to "Closed"
    await this.page.waitForSelector(IssueElements.closedStateLabel, {
      state: 'visible',
      timeout: 10000
    });
    
    console.log('Issue has been closed');
    return this;
  }

  /**
   * Verify if the issue is closed
   * @returns {Promise<boolean>} True if the issue is closed
   */
  async isIssueClosed(): Promise<boolean> {
    const stateText = await this.page.locator(IssueElements.issueState).textContent();
    return stateText?.includes('Closed') === true;
  }

  /**
   * Navigate back to issues list
   * @returns {Promise<IssuesPage>} The issues list page
   */
  async goBackToIssuesList(): Promise<IssuesListPage> {
    const issuesUrl = this.page.url().split('/issues/')[0] + '/issues';
    await this.page.goto(issuesUrl);
    await this.page.waitForLoadState('networkidle');
    
    return new IssuesListPage(this.page);
  }
  }
  