
export type SnippetType = "note" | "command" | "link";

export interface Snippet {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSnippetDto {
  title: string;
  content: string;
  tags?: string[];
  type: SnippetType;
}

export interface GetSnippetsResponse {
  items: Snippet[];
  total: number;
  page: number;
  pages: number;
}