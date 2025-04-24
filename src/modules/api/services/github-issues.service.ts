import { APIRequestContext } from '@playwright/test';
import { BaseApiService } from './base-api.service';
import { ApiConfig } from '../config/api-config';
import { CreateIssueDto } from '../dto/requests/create-issue.dto';
import { UpdateIssueDto } from '../dto/requests/update-issue.dto';
import { IssueDto } from '../dto/responses/issue.dto';

import { Environment } from '../config/environment';

export class GithubIssuesService extends BaseApiService {
  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * Get a list of issues from a repository
   */
  async listIssues(owner = Environment.github.owner, repo = Environment.github.repo): Promise<IssueDto[]> {
    this.logger.info(`Fetching issues from ${owner}/${repo}`);
    
    const url = this.formatUrl(ApiConfig.endpoints.issues.list, { owner, repo });
    const response = await this.request.get(url, {
      headers: this.getHeaders()
    });
    
    if (!response.ok()) {
      throw new Error(`Failed to list issues: ${response.status()} ${response.statusText()}`);
    }
    
    return await response.json();
  }

  /**
   * Get a specific issue by number
   */
  async getIssue(issueNumber: number, owner = Environment.github.owner, repo = Environment.github.repo): Promise<IssueDto> {
    this.logger.info(`Fetching issue #${issueNumber} from ${owner}/${repo}`);
    
    const url = this.formatUrl(ApiConfig.endpoints.issues.get, { 
      owner, 
      repo, 
      issue_number: issueNumber 
    });
    
    const response = await this.request.get(url, {
      headers: this.getHeaders()
    });
    
    if (!response.ok()) {
      throw new Error(`Failed to get issue #${issueNumber}: ${response.status()} ${response.statusText()}`);
    }
    
    return await response.json();
  }

  /**
   * Create a new issue with status code response
   */
  async createIssue(
    issueData: CreateIssueDto | any,
    owner = Environment.github.owner, 
    repo = Environment.github.repo, 
    options = { failOnError: true }
  ): Promise<{ success: boolean; status: number; data?: IssueDto; error?: string }> {
    this.logger.info(`Creating new issue in ${owner}/${repo}`);
    
    const url = this.formatUrl(ApiConfig.endpoints.issues.create, { owner, repo });
    
    try {
      const response = await this.request.post(url, {
        headers: this.getHeaders(),
        data: issueData,
        failOnStatusCode: false
      });
      
      const status = response.status();
      
      if (status === 201) {
        const data = await response.json();
        return { success: true, status, data };
      }
      
      if (status === 422) {
        const errorData = await response.json();
        const errorMessage = this.formatValidationError(errorData);
        
        if (options.failOnError) {
          throw new Error(errorMessage);
        }
        
        return { success: false, status, error: errorMessage };
      }
      
      const errorMessage = `Failed to create issue: ${status} ${response.statusText()}`;
      
      if (options.failOnError) {
        throw new Error(errorMessage);
      }
      
      return { success: false, status, error: errorMessage };
    } catch (error: unknown) {
      if (options.failOnError) {
        throw error;
      }
      
      return { 
        success: false, 
        status: error instanceof Error && 'status' in error ? (error as any).status : 500, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  /**
   * Update an existing issue
   */
  async updateIssue(
    issueNumber: number, 
    updateData: UpdateIssueDto, 
    owner = Environment.github.owner, 
    repo = Environment.github.repo
  ): Promise<IssueDto> {
    this.logger.info(`Updating issue #${issueNumber} in ${owner}/${repo}`);
    
    const url = this.formatUrl(ApiConfig.endpoints.issues.update, { 
      owner, 
      repo, 
      issue_number: issueNumber 
    });
    
    const response = await this.request.patch(url, {
      headers: this.getHeaders(),
      data: updateData
    });
    
    if (!response.ok()) {
      throw new Error(`Failed to update issue #${issueNumber}: ${response.status()} ${response.statusText()}`);
    }
    
    return await response.json();
  }

  /**
   * Close an issue (convenience method)
   */
  async closeIssue(issueNumber: number, owner = Environment.github.owner, repo = Environment.github.repo): Promise<IssueDto> {
    return this.updateIssue(issueNumber, { state: 'closed' }, owner, repo);
  }

  /**
   * Helper method to format validation errors from GitHub
   */
  private formatValidationError(errorData: any): string {
    if (errorData?.errors && Array.isArray(errorData.errors)) {
      const fieldErrors = errorData.errors.map((err: any) => {
        return `${err.field || 'Unknown field'} ${err.code || 'error'}`;
      }).join(', ');
      
      return `Validation failed: ${fieldErrors}`;
    }
    
    return errorData?.message || 'Validation failed';
  }

  /**
   * Get GitHub API headers
   */
  protected getHeaders(): Record<string, string> {
    return {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${Environment.github.token}`
    };
  }
}