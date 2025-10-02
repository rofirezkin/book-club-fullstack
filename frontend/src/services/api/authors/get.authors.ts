import { apiRequest, T_ApiResponse, baseApi } from "../../base-api";
import { T_Authors } from "./authors.types";

export type Trs_Authors = T_Authors[];
export async function getAuthors() {
  return apiRequest<Trs_Authors>(
    baseApi.get<T_ApiResponse<Trs_Authors>>(`/authors`)
  );
}

export type T_ApiGetAuthorsResponse = Awaited<ReturnType<typeof getAuthors>>;
