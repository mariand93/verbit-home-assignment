/**
 * Data Transfer Object for creating a new issue
 */
export interface CreateIssueDto {
    /** Title of the issue (required by GitHub API) */
    title: string;
    
    /** Body content of the issue (optional) */
    body?: string;
    
    /** Assignees for the issue (optional) */
    assignees?: string[];
    
    /** Labels to apply to the issue (optional) */
    labels?: string[];
    
    /** Milestone to assign to the issue (optional) */
    milestone?: number;
  }