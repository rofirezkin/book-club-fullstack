import { apiRequest, T_ApiResponse, baseApi } from "@/services/base-api";
import { T_Authors } from "./authors.types";

export type Trq_UpdateAuthors = {
  name: string;
  bio?: string;
  id?: number;
};

export type Trs_UpdateAuthors = T_Authors;

export async function updateAuthors(payload: Trq_UpdateAuthors) {
  return apiRequest<Trs_UpdateAuthors>(
    baseApi.put<T_ApiResponse<Trs_UpdateAuthors>>(`/authors/${payload.id}`, {
      name: payload.name,
      bio: payload.bio,
    })
  );
}

export type T_ApiUpdateAuthorsResponse = Awaited<
  ReturnType<typeof updateAuthors>
>;
