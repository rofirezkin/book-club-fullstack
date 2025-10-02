"use client";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useGetAuthors } from "@/services/query/query/use-get-authors";
import { Trq_CreateBook } from "@/services/api/books/post.create-books";

import { useCreateBook } from "@/services/query/mutation/use-create-books";
import { BookForm } from "../components/book-form";
import Back from "@/components/navigation/back";

function CreateBook() {
  const navigate = useNavigate();
  const { data: authors } = useGetAuthors();

  const { mutate: mutateCreateBook, isPending } = useCreateBook({
    options: {
      onSuccess: () => {
        alert("✅ Book created successfully.");
        navigate("/", { replace: true });
      },
      onError: (error: any) => {
        alert(
          `❌ Failed to create book.\n\n${
            error?.response?.data?.message || error.message || "Unknown error"
          }`
        );
      },
    },
  });

  const form = useForm<Trq_CreateBook>({
    defaultValues: {
      title: "",
      authorId: 0,
      description: "",
      publishedYear: new Date().getFullYear(),
    },
  });

  const onSubmit = form.handleSubmit((data: Trq_CreateBook) =>
    mutateCreateBook(data)
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Back />
      <BookForm
        form={form}
        authors={authors || []}
        isEditing={true}
        isPending={isPending}
        submitLabel="Create Book"
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default CreateBook;
