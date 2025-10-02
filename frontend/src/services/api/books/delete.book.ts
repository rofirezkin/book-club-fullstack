import { apiRequest, T_ApiResponse, baseApi } from "@/services/base-api";

export type Trq_DeleteBook = {
  id: number;
};

export async function deleteBook(payload: Trq_DeleteBook) {
  return apiRequest(
    baseApi.delete<T_ApiResponse<null>>(`/books/${payload.id}`)
  );
}

export type T_ApiDeleteBookResponse = Awaited<ReturnType<typeof deleteBook>>;
