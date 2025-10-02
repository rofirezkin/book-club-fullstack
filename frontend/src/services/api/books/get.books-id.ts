import { apiRequest, T_ApiResponse, baseApi } from "../../base-api";
import { T_Book } from "./books.types";

export type Trs_BookId = T_Book;
export type Trq_BookIdParams = { id: number };

export async function getBookId(params: Trq_BookIdParams) {
  return apiRequest<Trs_BookId>(
    baseApi.get<T_ApiResponse<Trs_BookId>>(`/books/${params.id}`)
  );
}

export type T_ApiGetBookIdResponse = Awaited<ReturnType<typeof getBookId>>;
