
import { BasePage } from '../BasePage';
import { NewIssuePage } from './NewIssuePage';
import { IssuePage } from './IssuePage';
import { IssuesListElements } from '../../elements/issues/IssuesListElements';

/**
 * Page object for the GitHub repository issues page
 */
export class IssuesListPage extends BasePage {

  /**
 * Click the New Issue button and return the new issue page
 * @returns {Promise<NewIssuePage>} The new issue page object
 */

  async openNewIssuePage(): Promise<NewIssuePage> {

    console.log('Click on New Issue button');
    const newIssueButton = this.page.locator(IssuesListElements.newIssueButton);

    await newIssueButton.waitFor({ state: 'visible', timeout: 10000 });

    await this.page.waitForSelector(IssuesListElements.newIssueButton, {
      state: 'visible',
      timeout: 10000
    });

    await newIssueButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(3000);
    await newIssueButton.click();

    // Wait for navigation or next page element
    await this.waitForPageLoad();
    console.log('Clicked New Issue button and waited for navigation');

    // Return the new page object
    return new NewIssuePage(this.page);
  }


  /**
   * Check if the New Issue button is present
   */
  async hasNewIssueButton(): Promise<boolean> {
    return await this.page.locator(IssuesListElements.newIssueButton).isVisible();
  }

  /**
   * Get the count of issues
   */
  async getIssuesCount(): Promise<number> {
    const countText = await this.page.locator(IssuesListElements.issuesCount).textContent();
    if (countText) {
      const match = countText.match(/\d+/);
      if (match) {
        return parseInt(match[0], 10);
      }
    }
    return 0;
  }

  /**
 * Check if we're on the issues page with better verification
 */
  async isOnIssuesPage(): Promise<boolean> {
    console.log('Checking if on issues page');

    const url = await this.page.url();
    console.log('Current URL:', url);

    // Check URL
    const urlHasIssues = url.includes('/issues');

    const issuesHeaderVisible = await this.page.locator('h2:has-text("Issues"), h1:has-text("Issues")').isVisible().catch(() => false);
    const newIssueButtonVisible = await this.page.locator('a:has-text("New issue"), button:has-text("New issue")').isVisible().catch(() => false);
    const issuesListVisible = await this.page.locator('.js-issue-row, [data-testid="issue-row"]').isVisible().catch(() => false);

    // Take a verification screenshot
    await this.page.screenshot({ path: 'issues-page-verification2.png' });

    // If URL has /issues and at least one issues element is present
    return urlHasIssues && (issuesHeaderVisible || newIssueButtonVisible || issuesListVisible);
  }

  /**
   * Switch to Open issues tab
   */
  async switchToOpenIssues(): Promise<void> {
    await this.page.click(IssuesListElements.openTab);
    await this.waitForPageLoad;
  }

  /**
   * Switch to Closed issues tab
   */
  async switchToClosedIssues(): Promise<void> {
    await this.page.click(IssuesListElements.closedTab);
    await this.waitForPageLoad;
  }

  /**
   * Checks if an issue with the given title exists in the list
   * @param {string} title - The title of the issue to check for
   * @returns {Promise<boolean>} - True if the issue exists, false otherwise
   */
  async hasIssueWithTitle(title: string): Promise<boolean> {
    console.log(`Checking if issue with title "${title}" exists`);
    
    // Wait for issues list to be visible
    await this.page.waitForSelector(IssuesListElements.issuesList, {
      state: 'visible',
      timeout: 10000
    });
    
    // Look for the issue title in the list
    const issueElement = this.page.locator(`${IssuesListElements.issuesList} a:has-text("${title}")`);
    return await issueElement.isVisible();
  }

  /**
   * Opens an issue with the given title
   * @param {string} title - The title of the issue to open
   * @returns {Promise<IssuePage>} - The issue page object
   * @throws {Error} - If the issue is not found
   */
  async openIssueByTitle(title: string): Promise<IssuePage> {
    console.log(`Opening issue with title "${title}"`);
    
    // Wait for issues list to be visible
    await this.page.waitForSelector(IssuesListElements.issuesList, {
      state: 'visible',
      timeout: 10000
    });
    
    // Look for and click on the issue title
    const issueElement = this.page.locator(`${IssuesListElements.issuesList} a:has-text("${title}")`).first();
    
    if (await issueElement.isVisible()) {
      await issueElement.click();
      await this.page.waitForLoadState('networkidle');
      return new IssuePage(this.page);
    } else {
      throw new Error(`Issue with title "${title}" not found in the issues list`);
    }
  }

  /**
   * Wait for the issues page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForSelector(IssuesListElements.issuesList, {
      state: 'visible',
      timeout: 10000
    });
  }

  
}