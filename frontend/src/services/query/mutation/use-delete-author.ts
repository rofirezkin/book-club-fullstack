import {
  deleteAuthor,
  T_ApiDeleteAuthorResponse,
  Trq_DeleteAuthor,
} from "@/services/api/authors/delete.author";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseDeleteAuthor = {
  options?: Partial<
    MutationOptions<
      T_ApiDeleteAuthorResponse,
      T_AxiosBaseError,
      Trq_DeleteAuthor
    >
  >;
};

export function useDeleteAuthor({ options }: T_UseDeleteAuthor = {}) {
  const mutation = useMutation({
    mutationFn: ({ id }) => deleteAuthor({ id }),
    ...options,
  });

  return mutation;
}
