import { useQueries } from "@tanstack/react-query";
import { getBooks } from "@/services/api/books/get.books";
import { getAuthors } from "@/services/api/authors/get.authors";

export function useBooksAndAuthors() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["getBooks"],
        queryFn: getBooks,
      },
      {
        queryKey: ["getAuthors"],
        queryFn: getAuthors,
      },
    ],
  });

  const booksQuery = results[0];
  const authorsQuery = results[1];

  return {
    books: booksQuery.data?.data ?? null,
    authors: authorsQuery.data?.data ?? null,
    isLoading: booksQuery.isLoading || authorsQuery.isLoading,
    isError: booksQuery.isError || authorsQuery.isError,
    refetch: async () => {
      await Promise.all([booksQuery.refetch(), authorsQuery.refetch()]);
    },
  };
}
