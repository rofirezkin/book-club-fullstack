import { Link } from "react-router-dom";
import { useGetBooks } from "@/services/query/query/use-get-books";
import { useDeleteBook } from "@/services/query/mutation/use-delete-books";

export default function BookList() {
  const { data: books, isLoading, isError, error, refetch } = useGetBooks();

  const { mutate } = useDeleteBook({
    options: {
      onSuccess: () => {
        refetch();
        alert("✅ Book deleted successfully.");
      },
      onError: (err) => {
        alert(
          `❌ Failed to delete book.\n\n${
            err?.response?.data?.message || err.message || "Unknown error"
          }`
        );
      },
    },
  });

  const handleDelete = async (id: number, title: string) => {
    const confirmed = confirm(
      `Are you sure you want to delete the book "${title}"?`
    );
    if (!confirmed) return;
    mutate({ id });
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Books</h2>

      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-red-600">
          ❌ Failed to load books: {error?.message || "Unknown error"}
        </p>
      )}

      <ul className="space-y-2">
        {books?.map((book) => (
          <li key={book.id}>
            <Link
              className="bg-white p-4 rounded shadow flex justify-between items-start gap-2"
              to={`/books/detail-book/${book.id}`}
            >
              <div className="flex-1">
                <p className="font-medium">{book.title}</p>
                <p className="text-sm text-gray-600">by {book.author.name}</p>
                {book.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {book.description}
                  </p>
                )}
                {book.publishedYear && (
                  <p className="text-sm text-gray-500 mt-1">
                    Published: {book.publishedYear}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(book.id, book.title);
                  }}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </Link>
          </li>
        ))}

        {(books?.length === 0 || books === null) && !isLoading && !isError && (
          <p>No books found.</p>
        )}
      </ul>
    </section>
  );
}
