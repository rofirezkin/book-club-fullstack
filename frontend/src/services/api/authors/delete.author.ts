import { apiRequest, T_ApiResponse, baseApi } from "@/services/base-api";

export type Trq_DeleteAuthor = {
  id: number;
};

export async function deleteAuthor(payload: Trq_DeleteAuthor) {
  return apiRequest(
    baseApi.delete<T_ApiResponse<null>>(`/authors/${payload.id}`)
  );
}

export type T_ApiDeleteAuthorResponse = Awaited<
  ReturnType<typeof deleteAuthor>
>;
