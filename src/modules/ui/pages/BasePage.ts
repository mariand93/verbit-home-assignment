import { Page, Locator } from 'playwright';

export class BasePage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async elementExists(selector: string): Promise<boolean> {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  async waitForElement(selector: string, timeout = 10000): Promise<Locator> {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    return element;
  }

  async takeScreenshot(fileName: string): Promise<void> {
    await this.page.screenshot({ path: `./screenshots/${fileName}.png` });
  }

  async savePageHtmlForDebuging(): Promise<void> {
    console.log('Saving page HTML for debugging...');
    const html = await this.page.content();
    const fs = require('fs');
    fs.writeFileSync('page-html.txt', html);
  }

}