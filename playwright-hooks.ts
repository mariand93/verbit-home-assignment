import { test } from '@playwright/test';
import path from 'path';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    const screenshotName = `${testInfo.title.replace(/\s+/g, '-')}-failed`;
    const screenshotPath = path.join('test-results', 'failures', `${screenshotName}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }
});