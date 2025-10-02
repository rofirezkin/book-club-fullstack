/**
 * Simple axios-based API client for the book club backend.
 * Base URL diambil dari VITE_API_URL, default ke http://localhost:3001.
 * Semua request bakal throw error kalau response bukan 2xx.
 */

import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper buat handle error & response
async function request<T>(promise: Promise<any>): Promise<T> {
  try {
    const res = await promise;
    return res.data as T;
  } catch (err) {
    const error = err as AxiosError<any>;
    throw new Error(error.response?.data?.error || error.message);
  }
}

// Authors
export async function getAuthors() {
  return request<any[]>(api.get("/authors"));
}

export async function getAuthor(id: number) {
  return request<any>(api.get(`/authors/${id}`));
}

export async function createAuthor(data: { name: string; bio?: string }) {
  return request<any>(api.post("/authors", data));
}

export async function updateAuthor(id: number, data: { name?: string; bio?: string }) {
  return request<any>(api.put(`/authors/${id}`, data));
}

export async function deleteAuthor(id: number) {
  return request<void>(api.delete(`/authors/${id}`));
}

// Books
export async function getBooks() {
  return request<any[]>(api.get("/books"));
}

export async function getBook(id: number) {
  return request<any>(api.get(`/books/${id}`));
}

export async function createBook(data: { title: string; authorId: number; description?: string; publishedYear?: number }) {
  return request<any>(api.post("/books", data));
}

export async function updateBook(id: number, data: { title?: string; authorId?: number; description?: string; publishedYear?: number }) {
  return request<any>(api.put(`/books/${id}`, data));
}

export async function deleteBook(id: number) {
  return request<void>(api.delete(`/books/${id}`));
}
