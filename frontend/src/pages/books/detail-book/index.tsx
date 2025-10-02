import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUpdateBooks } from "@/services/query/mutation/use-update-books";
import { useGetAuthors } from "@/services/query/query/use-get-authors";
import { useGetBookId } from "@/services/query/query/use-get-book-id";
import { Trq_UpdateBook } from "@/services/api/books/put.update-books";
import { BookForm } from "../components/book-form";
import React from "react";
import Back from "@/components/navigation/back";

function DetailBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: authors } = useGetAuthors();
  const [isEditing, setIsEditing] = React.useState(false);

  const { data: bookDetail, isLoading } = useGetBookId({
    params: { id: Number(id) },
    options: { enabled: !!id, retry: false },
  });

  const { mutate: mutateUpdateBook, isPending } = useUpdateBooks({
    options: {
      onSuccess: () => {
        alert("✅ Book updated successfully.");
        navigate("/", { replace: true });
      },
      onError: (error) => {
        alert(
          `❌ Failed to update book.\n\n${
            error?.response?.data?.message || error.message || "Unknown error"
          }`
        );
      },
    },
  });

  const form = useForm<Trq_UpdateBook>({
    defaultValues: {
      id: Number(id),
      title: bookDetail?.title || "",
      authorId: bookDetail?.authorId || 0,
      description: bookDetail?.description || "",
      publishedYear: bookDetail?.publishedYear || 0,
    },
    values: bookDetail
      ? {
          id: Number(id),
          title: bookDetail.title,
          authorId: bookDetail.authorId,
          description: bookDetail.description,
          publishedYear: bookDetail.publishedYear,
        }
      : undefined,
  });

  const onSubmit = form.handleSubmit((data: Trq_UpdateBook) =>
    mutateUpdateBook(data)
  );

  if (isLoading) return <p>Loading...</p>;
  if (!bookDetail) return <p>Book not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Back />
      <BookForm
        onClickEdit={() => setIsEditing(true)}
        form={form}
        onSubmit={onSubmit}
        authors={authors || []}
        isEditing={isEditing}
        mode="edit"
        isPending={isPending}
        submitLabel="Update Book"
        onCancel={() => setIsEditing(false)}
      />
    </div>
  );
}

export default DetailBook;
