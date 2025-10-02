import {
  T_ApiUpdateAuthorsResponse,
  Trq_UpdateAuthors,
  updateAuthors,
} from "@/services/api/authors/put.update-authors";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseUpdateAuthors = {
  options?: Partial<
    MutationOptions<
      T_ApiUpdateAuthorsResponse,
      T_AxiosBaseError,
      Trq_UpdateAuthors
    >
  >;
};

export function useUpdateAuthors({ options }: T_UseUpdateAuthors = {}) {
  const mutation = useMutation({
    mutationFn: ({ name, bio, id }) => updateAuthors({ name, bio, id }),
    ...options,
  });

  return mutation;
}
