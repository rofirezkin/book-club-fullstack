"use client";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useCreateAuthors } from "@/services/query/mutation/use-create-authors";
import { Trq_CreateAuthors } from "@/services/api/authors/post.create-authors";
import { AuthorForm } from "../components/author-form";
import Back from "@/components/navigation/back";

function CreateAuthor() {
  const navigate = useNavigate();

  const { mutate: mutateCreateAuthor, isPending } = useCreateAuthors({
    options: {
      onSuccess: () => {
        alert("✅ Author created successfully.");
        navigate("/", { replace: true });
      },
      onError: (error: any) => {
        alert(
          `❌ Failed to create author.\n\n${
            error?.response?.data?.message || error.message || "Unknown error"
          }`
        );
      },
    },
  });

  const form = useForm<Trq_CreateAuthors>({
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  const onSubmit = form.handleSubmit((data: Trq_CreateAuthors) =>
    mutateCreateAuthor(data)
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Back />
      <AuthorForm
        form={form}
        isEditing={true}
        isPending={isPending}
        submitLabel="Create Author"
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default CreateAuthor;
