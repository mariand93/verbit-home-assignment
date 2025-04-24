/**
 * Configuration for GitHub API
 */
export const ApiConfig = {
    baseUrl: 'https://api.github.com',
    defaultHeaders: {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    endpoints: {
      issues: {
        list: '/repos/{owner}/{repo}/issues',
        get: '/repos/{owner}/{repo}/issues/{issue_number}',
        create: '/repos/{owner}/{repo}/issues',
        update: '/repos/{owner}/{repo}/issues/{issue_number}'
      },
      repositories: {
        get: '/repos/{owner}/{repo}'
      },
      users: {
        get: '/users/{username}'
      }
    }
  };