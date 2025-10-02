import {
  T_ApiUpdateBookResponse,
  Trq_UpdateBook,
  updateBook,
} from "@/services/api/books/put.update-books";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseUpdateBooks = {
  options?: Partial<
    MutationOptions<T_ApiUpdateBookResponse, T_AxiosBaseError, Trq_UpdateBook>
  >;
};

export function useUpdateBooks({ options }: T_UseUpdateBooks = {}) {
  const mutation = useMutation({
    mutationFn: (payload) => updateBook(payload),
    ...options,
  });

  return mutation;
}
