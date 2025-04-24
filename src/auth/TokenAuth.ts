// src/auth/TokenAuth.ts
import { Page } from 'playwright';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Authentication service for handling GitHub token authentication
 * Can be used by both UI and API tests
 */
export class TokenAuth {
  private token: string;

  constructor() {
    // Get token from environment variable
    this.token = process.env.GITHUB_TOKEN || '';
    
    if (!this.token) {
      throw new Error('GITHUB_TOKEN environment variable is not set. Please create a GitHub Personal Access Token and set it in the .env file.');
    }
  }

  /**
   * Get the token value
   */
  getToken(): string {
    return this.token;
  }

  /**
   * Get authorization header for API requests
   */
  getAuthHeader(): { Authorization: string } {
    return {
      Authorization: `token ${this.token}`
    };
  }

  /**
   * Authenticate a Playwright page using token
   * This will navigate to GitHub and set up the authentication
   */
  async authenticatePage(page: Page): Promise<void> {
    // First authenticate by visiting GitHub with token in URL
    await page.goto(`https://x-access-token:${this.token}@github.com`);
    await page.waitForLoadState('networkidle');
  }

  /**
   * Navigate directly to a repository using token authentication
   */
  async navigateToRepo(page: Page, owner: string, repo: string): Promise<void> {
    await page.goto(`https://x-access-token:${this.token}@github.com/${owner}/${repo}`);
    await page.waitForLoadState('networkidle');
  }
}