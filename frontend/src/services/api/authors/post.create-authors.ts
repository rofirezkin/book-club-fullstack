import { apiRequest, T_ApiResponse, baseApi } from "@/services/base-api";
import { T_Authors } from "./authors.types";

export type Trq_CreateAuthors = {
  name: string;
  bio?: string;
};

export type Trs_CreateAuthors = T_Authors;

export async function createAuthors(payload: Trq_CreateAuthors) {
  return apiRequest<Trs_CreateAuthors>(
    baseApi.post<T_ApiResponse<Trs_CreateAuthors>>(`/authors`, payload)
  );
}

export type T_ApiCreateAuthorsResponse = Awaited<
  ReturnType<typeof createAuthors>
>;
