import { Page } from 'playwright';
import { BasePage } from '../BasePage';
import { LoginElements } from '../../elements/login/LoginElements';
export class LoginPage extends BasePage {

  /**
   * Navigate to GitHub login page
   */
  async navigateToLogin(): Promise<void> {
    await this.navigate('https://github.com/login');
  }

  /**
   * Login with username and password
   */
  async login(username: string, password: string): Promise<void> {
    await this.page.fill(LoginElements.usernameField, username);
    await this.page.fill(LoginElements.passwordField, password);
    await this.page.click(LoginElements.signInButton);
    await this.waitForPageLoad();
  }

  /**
   * Check if error message is displayed
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.elementExists(LoginElements.errorMessage)) {
      return await this.page.locator(LoginElements.errorMessage).textContent();
    }
    return null;
  }
}