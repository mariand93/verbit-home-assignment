import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Environment configuration with validation
 */
export const Environment = {
  // GitHub configuration
  github: {
    token: process.env.GITHUB_TOKEN || 'test',
    owner: process.env.GITHUB_OWNER || 'test',
    repo: process.env.GITHUB_REPO || 'test',
  }
};