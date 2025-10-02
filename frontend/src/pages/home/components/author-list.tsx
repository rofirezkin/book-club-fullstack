import { Link } from "react-router-dom";
import { useGetAuthors } from "@/services/query/query/use-get-authors";
import { useDeleteAuthor } from "@/services/query/mutation/use-delete-author";
import { useQueryClient } from "@tanstack/react-query";
import { GET_BOOKS } from "@/services/query/query/use-get-books";

export default function AuthorList() {
  const queryClient = useQueryClient();
  const { data: authors, refetch, isLoading, error, isError } = useGetAuthors();

  const { mutate } = useDeleteAuthor({
    options: {
      onSuccess: () => {
        refetch();
        queryClient.invalidateQueries({ queryKey: [GET_BOOKS] });
        alert("✅ Author and related books deleted successfully");
      },
      onError: (error) => {
        alert(
          `❌ Failed to delete author.\n\n${
            error?.response?.data?.message || error.message || "Unknown error"
          }`
        );
      },
    },
  });

  const handleDelete = async (id: number, name: string) => {
    const confirmed = confirm(
      `Are you sure you want to delete this author "${name}"?\n\n⚠️ This action will also delete all books related to this author.`
    );
    if (!confirmed) return;
    mutate({ id });
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Authors</h2>

      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-red-600">
          ❌ Failed to load authors: {error?.message || "Unknown error"}
        </p>
      )}
      <ul className="space-y-2">
        {authors?.map((author) => (
          <li
            key={author.id}
            className="bg-white p-4 rounded shadow flex justify-between items-start gap-2"
          >
            <Link
              to={"/authors/detail-author/" + author.id}
              className="flex-grow flex justify-between items-start gap-2"
            >
              <div>
                <p className="font- medium">{author.name}</p>
                {author.bio && (
                  <p className="text-sm text-gray-600">{author.bio}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(author.id, author.name);
                  }}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </Link>
          </li>
        ))}
        {(authors?.length === 0 || authors === null) &&
          !isLoading &&
          !isError && <p>No authors found.</p>}
      </ul>
    </section>
  );
}
