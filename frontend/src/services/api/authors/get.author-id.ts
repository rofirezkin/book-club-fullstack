import { apiRequest, T_ApiResponse, baseApi } from "../../base-api";
import { T_Authors } from "./authors.types";

export type Trs_AuthorId = T_Authors;
export type Trq_AuthorIdParams = { id: number };

export async function getAuthorId(params: Trq_AuthorIdParams) {
  return apiRequest<Trs_AuthorId>(
    baseApi.get<T_ApiResponse<Trs_AuthorId>>(`/authors/${params.id}`)
  );
}

export type T_ApiGetAuthorIdResponse = Awaited<ReturnType<typeof getAuthorId>>;
