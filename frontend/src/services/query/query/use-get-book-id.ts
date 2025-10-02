"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { T_AxiosBaseError } from "@/services/base-api";
import {
  getBookId,
  T_ApiGetBookIdResponse,
  Trq_BookIdParams,
} from "@/services/api/books/get.books-id";

export type T_UseGetBookIdProps = {
  params: Trq_BookIdParams;
  options?: Partial<UseQueryOptions<T_ApiGetBookIdResponse, T_AxiosBaseError>>;
};
export const GET_BOOK_BYID = "getBookById";

export function useGetBookId({ options, params }: T_UseGetBookIdProps) {
  const query = useQuery<Awaited<T_ApiGetBookIdResponse>, T_AxiosBaseError>({
    refetchOnWindowFocus: false,
    queryKey: [GET_BOOK_BYID, params],
    queryFn: () => getBookId(params),
    ...options,
  });

  const data = useMemo(() => query.data?.data ?? null, [query.data]);

  return useMemo(
    () => ({
      ...query,
      data,
    }),
    [query, data]
  );
}
