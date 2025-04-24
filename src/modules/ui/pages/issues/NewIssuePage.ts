import { BasePage } from '../BasePage';
import { IssuePage } from './IssuePage';
import { NewIssueElements } from '../../elements/issues/NewIssueElements';
/**
 * Page object for the GitHub new issue creation page
 */
export class NewIssuePage extends BasePage {
 
  /**
   * Fill in the issue title
   */
  async fillTitle(title: string): Promise<void> {
    console.log(`Fill in issue title: ${title}`);

    await this.page.fill(NewIssueElements.issueTitleInput, title);
  }

  /**
   * Fill in the issue description/body
   */
  async fillBody(body: string): Promise<void> {
    console.log(`Fill in issue description: ${body}`);

    await this.page.fill(NewIssueElements.issueDescriptionTextarea, body);
  }

  /**
   * Submit the new issue
   */
  async submitIssue(): Promise<void> {
    console.log('Click "Create issue" button to submit the issue');

    await this.page.click(NewIssueElements.createIssueBtn);
    await this.page.waitForLoadState('load');
  }

  /**
   * Check if we're on the new issue page
   */
  async isOnNewIssuePage(): Promise<boolean> {
    console.log('Checking if New issues page was opened');
    
    await this.page.waitForLoadState('load');

    const url = await this.page.url();
    console.log('Current URL:', url);
    
    return this.page.url().includes('/issues/new');
  }

  /**
   * Creates a new issue with the given title and description
   */
    async createIssue(title: string, description: string): Promise<IssuePage> {
      console.log(`Creating issue with title: ${title}`);
      
      await this.fillTitle(title);
      await this.fillBody(description);
      await this.submitIssue();

      // Take a screenshot before submitting
      await this.page.screenshot({ path: 'screenshots/before-submit-issue.png' });
    
      
      // Wait for the navigation to complete
      await this.waitForPageLoad();
      
      console.log('Issue created, navigated to issue page');
      
      // Return the issue page object
      return new IssuePage(this.page);
    }

  /**
   * Check if all required elements are present
   */
  async hasRequiredElements(): Promise<boolean> {
    const hasTitleField = await this.page.locator(NewIssueElements.issueTitleInput).isVisible();
    const hasBodyField = await this.page.locator(NewIssueElements.issueDescriptionTextarea).isVisible();
    const hasSubmitButton = await this.page.locator(NewIssueElements.createIssueBtn).isVisible();
    
    return hasTitleField && hasBodyField && hasSubmitButton;
  }
}