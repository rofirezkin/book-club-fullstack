import { apiRequest, T_ApiResponse, baseApi } from "../../base-api";
import { T_Book } from "./books.types";

export type Trs_Books = T_Book[];
export async function getBooks() {
  return apiRequest<Trs_Books>(baseApi.get<T_ApiResponse<Trs_Books>>(`/books`));
}

export type T_ApiGetBooksResponse = Awaited<ReturnType<typeof getBooks>>;
