import {
  createBook,
  T_ApiCreateBookResponse,
  Trq_CreateBook,
} from "@/services/api/books/post.create-books";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseCreateBook = {
  options?: Partial<
    MutationOptions<T_ApiCreateBookResponse, T_AxiosBaseError, Trq_CreateBook>
  >;
};

export function useCreateBook({ options }: T_UseCreateBook = {}) {
  const mutation = useMutation<
    T_ApiCreateBookResponse,
    T_AxiosBaseError,
    Trq_CreateBook
  >({
    mutationFn: (payload) => createBook(payload),
    ...options,
  });
  return mutation;
}
