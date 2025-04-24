import { PlaywrightTestConfig, devices } from '@playwright/test';
import { register } from 'tsconfig-paths';
import path from 'path';
import fs from 'fs';

// Register the path aliases from tsconfig.json
register();

// Create a directory for failure screenshots if it doesn't exist
const failurePath = path.join(__dirname, 'test-results', 'failures');
if (!fs.existsSync(failurePath)) {
  fs.mkdirSync(failurePath, { recursive: true });
}

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://github.com',
    trace: 'on-first-retry',
    // Configure screenshot behavior to only capture on failure
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    }
  ],
  outputDir: 'test-results/',
  preserveOutput: 'always',
};

export default config;