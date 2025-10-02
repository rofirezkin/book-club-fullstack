"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { T_AxiosBaseError } from "@/services/base-api";
import {
  T_ApiGetBooksResponse,
  getBooks,
} from "@/services/api/books/get.books";

export type UseGetBooksOptions = Partial<
  UseQueryOptions<T_ApiGetBooksResponse, T_AxiosBaseError>
>;

export const GET_BOOKS = "getBooks";

export function useGetBooks(options?: UseGetBooksOptions) {
  const query = useQuery<Awaited<T_ApiGetBooksResponse>, T_AxiosBaseError>({
    refetchOnWindowFocus: false,
    queryKey: [GET_BOOKS],
    queryFn: () => getBooks(),
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
