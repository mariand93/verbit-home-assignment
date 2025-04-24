import { Page } from 'playwright';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Service to handle GitHub authentication using Personal Access Token
 */
export class AuthService {
  private token: string;

  constructor() {
    // Get token from environment variable
    this.token = process.env.GITHUB_TOKEN || '';
    
    if (!this.token) {
      throw new Error('GITHUB_TOKEN environment variable is not set. Please create a GitHub Personal Access Token and set it in the .env file.');
    }
  }

  /**
   * Authenticate GitHub using token
   */
  async authenticate(page: Page): Promise<void> {
    console.log('Setting up GitHub token authentication...');
    
    // Set the Authorization header for all requests
    await page.setExtraHTTPHeaders({
      Authorization: `token ${this.token}`
    });

    await page.goto('https://github.com');
    await page.waitForLoadState('networkidle');
    
    console.log('Authentication setup complete');
  }

  /**
   * Navigate directly to a repository with authentication
   */
  async navigateToRepo(page: Page, owner: string, repo: string): Promise<void> {
    console.log(`Navigating to ${owner}/${repo} with authentication...`);
    
    // Use token in URL for direct navigation
    await page.goto(`https://x-access-token:${this.token}@github.com/${owner}/${repo}`);
    await page.waitForLoadState('networkidle');
    
    console.log(`Successfully navigated to ${owner}/${repo}`);
  }

  /**
   * Check if the user is authenticated
   */
  async isAuthenticated(page: Page): Promise<boolean> {
    const userNavSelector = '[data-testid="user-dropdown-trigger"], header .avatar';
    
    try {
      await page.waitForSelector(userNavSelector, { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}