import { test as base } from '@playwright/test';
import { 
  GithubIssuesService
} from '../../../src/modules/api/services';

/**
 * Create custom test fixtures that provide API services
 */
type ApiServices = {
  issuesService: GithubIssuesService;
};

export const test = base.extend<ApiServices>({
  issuesService: async ({ request }, use) => {
    const service = new GithubIssuesService(request);
    await use(service);
  }
});

export { expect } from '@playwright/test';