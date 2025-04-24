import { UserDto } from './user.dto';

/**
 * GitHub API issue response
 */
export interface IssueDto {
  id: number;
  node_id: string;
  url: string;
  repository_url: string;
  number: number;
  title: string;
  body: string;
  user: UserDto;
  labels: Array<{
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description?: string;
  }>;
  state: 'open' | 'closed';
  locked: boolean;
  assignees: UserDto[];
  milestone?: {
    id: number;
    node_id: string;
    url: string;
    number: number;
    title: string;
    description: string;
    state: string;
  } | null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  pull_request?: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: string | null;
  };
}