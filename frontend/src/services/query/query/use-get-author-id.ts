"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { T_AxiosBaseError } from "@/services/base-api";
import {
  T_ApiGetAuthorIdResponse,
  getAuthorId,
  Trq_AuthorIdParams,
} from "@/services/api/authors/get.author-id";

export type T_UseGetAuthorsOptions = Partial<
  UseQueryOptions<T_ApiGetAuthorIdResponse, T_AxiosBaseError>
>;

export type T_UseGetAuthorIdProps = {
  params: Trq_AuthorIdParams;
  options?: Partial<
    UseQueryOptions<T_ApiGetAuthorIdResponse, T_AxiosBaseError>
  >;
};
export const GET_AUTHOR_BYID = "getAuthorById";

export function useGetAuthorId({ options, params }: T_UseGetAuthorIdProps) {
  const query = useQuery<Awaited<T_ApiGetAuthorIdResponse>, T_AxiosBaseError>({
    refetchOnWindowFocus: false,
    queryKey: [GET_AUTHOR_BYID, params],
    queryFn: () => getAuthorId(params),
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
