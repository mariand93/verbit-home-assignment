/**
 * Data structure for updating an issue
 */
export interface UpdateIssueDto {
    title?: string;
    body?: string;
    state?: 'open' | 'closed';
    assignees?: string[];
    milestone?: number | null;
    labels?: string[];
  }