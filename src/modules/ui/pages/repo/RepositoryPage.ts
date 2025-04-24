import { Page } from 'playwright';
import { BasePage } from '../BasePage';
import { RepositoryElements } from '../../elements/repo/RepositoryElements';

export class RepositoryPage extends BasePage {


  /**
   * Navigate to the repository page
   * @param owner Repository owner (username or organization)
   * @param repo Repository name
   */
  async navigateTo(owner: string, repo: string): Promise<void> {
    console.log(`Navigated to repository: ${owner}/${repo}`);

    await this.page.goto(`https://github.com/${owner}/${repo}`);
    await this.page.waitForLoadState('load');
  }

  /**
   * Navigate to the issues tab
   */
  async openIssuesPage(): Promise<void> {
    console.log('Click on Issues tab');

    await this.page.waitForLoadState('load');
    await this.page.waitForSelector(RepositoryElements.issuesTab, { state: 'visible', timeout: 5000 });

    await this.page.click(RepositoryElements.issuesTab);
    await this.page.waitForLoadState('load');
  }

  /**
   * Get repository title
   */
  async getRepositoryTitle(): Promise<string | null> {
    const titleElement = this.page.locator(RepositoryElements.repoTitle);
    if (await titleElement.count() > 0) {
      return await titleElement.textContent();
    }
    return null;
  }

  /**
   * Check if we're on the correct repository
   */
  async isOnRepository(owner: string, repo: string): Promise<boolean> {
    const url = this.page.url();
    return url.includes(`/${owner}/${repo}`);
  }
}