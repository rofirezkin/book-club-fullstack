"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { T_AxiosBaseError } from "@/services/base-api";
import {
  T_ApiGetAuthorsResponse,
  getAuthors,
} from "@/services/api/authors/get.authors";

export type UseGetAuthorsOptions = Partial<
  UseQueryOptions<T_ApiGetAuthorsResponse, T_AxiosBaseError>
>;

export const GET_AUTHORS = "getAuthors";

export function useGetAuthors(options?: UseGetAuthorsOptions) {
  const query = useQuery<Awaited<T_ApiGetAuthorsResponse>, T_AxiosBaseError>({
    refetchOnWindowFocus: false,
    queryKey: [GET_AUTHORS],
    queryFn: () => getAuthors(),
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
