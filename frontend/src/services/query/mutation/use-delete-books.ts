import {
  deleteBook,
  T_ApiDeleteBookResponse,
  Trq_DeleteBook,
} from "@/services/api/books/delete.book";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseDeleteBook = {
  options?: Partial<
    MutationOptions<T_ApiDeleteBookResponse, T_AxiosBaseError, Trq_DeleteBook>
  >;
};

export function useDeleteBook({ options }: T_UseDeleteBook = {}) {
  const mutation = useMutation({
    mutationFn: ({ id }) => deleteBook({ id }),
    ...options,
  });

  return mutation;
}
