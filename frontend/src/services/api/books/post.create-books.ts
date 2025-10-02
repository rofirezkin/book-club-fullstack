import { apiRequest, T_ApiResponse, baseApi } from "@/services/base-api";
import { T_Book } from "./books.types";

export type Trq_CreateBook = {
  title: string;
  authorId: number;
  description: string;
  publishedYear: number;
};

export type Trs_CreateBook = T_Book;

export async function createBook(payload: Trq_CreateBook) {
  return apiRequest<Trs_CreateBook>(
    baseApi.post<T_ApiResponse<Trs_CreateBook>>(`/books`, payload)
  );
}

export type T_ApiCreateBookResponse = Awaited<ReturnType<typeof createBook>>;
