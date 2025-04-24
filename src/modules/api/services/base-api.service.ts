import { APIRequestContext, APIResponse } from '@playwright/test';
import { Environment } from '../config/environment';
import { ApiConfig } from '../config/api-config';
import { Logger } from '../utils/logger';

/**
 * Base service for all GitHub API interactions
 */
export class BaseApiService {
  protected readonly baseUrl: string;
  protected readonly request: APIRequestContext;
  protected readonly logger: Logger;

  constructor(request: APIRequestContext) {
    this.baseUrl = ApiConfig.baseUrl;
    this.request = request;
    this.logger = new Logger('BaseApiService');
  }

  /**
   * Get default headers including authorization
   */
  protected getHeaders(): Record<string, string> {
    return {
      ...ApiConfig.defaultHeaders,
      'Authorization': `token ${Environment.github.token}`
    };
  }

  /**
   * Replace URL path parameters with actual values
   */
  protected formatUrl(path: string, params: Record<string, string | number> = {}): string {
    let formattedPath = path;
    
    // Replace all placeholders with actual values
    Object.entries(params).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      formattedPath = formattedPath.replace(placeholder, String(value));
    });
    
    return `${this.baseUrl}${formattedPath}`;
  }

  /**
   * Process API response and handle errors
   */
  protected async processResponse<T>(response: APIResponse): Promise<T> {
    if (!response.ok()) {
      const errorBody = await response.json();
      this.logger.error('API request failed', {
        status: response.status(),
        url: response.url(),
        body: errorBody
      });
      
      throw new Error(`API request failed: ${response.status()} - ${JSON.stringify(errorBody)}`);
    }
    
    return await response.json() as T;
  }
}