import { apiRequest, T_ApiResponse, baseApi } from "@/services/base-api";
import { T_Book } from "./books.types";

export type Trq_UpdateBook = {
  title: string;
  authorId: number;
  description: string;
  id?: number;
  publishedYear: number;
};

export type Trs_UpdateBook = T_Book;

export async function updateBook(payload: Trq_UpdateBook) {
  return apiRequest<Trs_UpdateBook>(
    baseApi.put<T_ApiResponse<Trs_UpdateBook>>(`/books/${payload.id}`, {
      title: payload.title,
      authorId: payload.authorId,
      description: payload.description,
      publishedYear: payload.publishedYear,
    })
  );
}

export type T_ApiUpdateBookResponse = Awaited<ReturnType<typeof updateBook>>;
