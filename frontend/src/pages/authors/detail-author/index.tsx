import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from "react";

import Back from "@/components/navigation/back";
import { AuthorForm } from "../components/author-form";
import { Trq_UpdateAuthors } from "@/services/api/authors/put.update-authors";
import { useUpdateAuthors } from "@/services/query/mutation/use-update-authors";
import { useGetAuthorId } from "@/services/query/query/use-get-author-id";

function DetailAuthor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = React.useState(false);

  const { data: authorDetail, isLoading } = useGetAuthorId({
    params: { id: Number(id) },
    options: { enabled: !!id, retry: false },
  });

  const { mutate: mutateUpdateAuthor, isPending } = useUpdateAuthors({
    options: {
      onSuccess: () => {
        alert("✅ Author updated successfully.");
        navigate("/", { replace: true });
      },
      onError: (error: any) => {
        alert(
          `❌ Failed to update author.\n\n${
            error?.response?.data?.message || error.message || "Unknown error"
          }`
        );
      },
    },
  });

  const form = useForm<Trq_UpdateAuthors>({
    defaultValues: {
      id: Number(id),
      name: authorDetail?.name || "",
      bio: authorDetail?.bio || "",
    },
    values: authorDetail
      ? {
          id: Number(id),
          name: authorDetail.name,
          bio: authorDetail.bio || "",
        }
      : undefined,
  });

  const onSubmit = form.handleSubmit((data: Trq_UpdateAuthors) =>
    mutateUpdateAuthor(data)
  );

  if (isLoading) return <p>Loading...</p>;
  if (!authorDetail) {
    return (
      <p className="text-center text-red-600 font-semibold py-8">
        Author not found.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Back />
      <AuthorForm
        onClickEdit={() => setIsEditing(true)}
        form={form}
        onSubmit={onSubmit}
        isEditing={isEditing}
        mode="edit"
        isPending={isPending}
        submitLabel="Update Author"
        onCancel={() => setIsEditing(false)}
      />
    </div>
  );
}

export default DetailAuthor;
