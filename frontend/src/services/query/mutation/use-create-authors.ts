import {
  createAuthors,
  T_ApiCreateAuthorsResponse,
  Trq_CreateAuthors,
} from "@/services/api/authors/post.create-authors";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseCreateAuthors = {
  options?: Partial<
    MutationOptions<
      T_ApiCreateAuthorsResponse,
      T_AxiosBaseError,
      Trq_CreateAuthors
    >
  >;
};

export function useCreateAuthors({ options }: T_UseCreateAuthors = {}) {
  const mutation = useMutation({
    mutationFn: ({ name, bio }) => createAuthors({ name, bio }),
    ...options,
  });

  return mutation;
}
