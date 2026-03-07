import { Snippet, CreateSnippetDto, UpdateSnippetDto, GetSnippetsResponse } from "../types/snippet";

const BASE_URL = 'http://localhost:5000/api/snippets';


async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export function createSnippet(data: CreateSnippetDto) {
  return request<Snippet>("/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getAllSnippets(): Promise<GetSnippetsResponse> {
  return request<GetSnippetsResponse>("/");
}

export function getSnippet(id: string) {
  return request<Snippet>(`/${id}`);
}

export function updateSnippet(id: string, data: UpdateSnippetDto) {
  return request<Snippet>(`/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteSnippet(id: string) {
  return request<void>(`/${id}`, {
    method: "DELETE",
  });
}