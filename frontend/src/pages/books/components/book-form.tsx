"use client";

import { UseFormReturn } from "react-hook-form";
import { Trq_CreateBook } from "@/services/api/books/post.create-books";
import { FormInput } from "@/components/form/form-input";

import { FormTextarea } from "@/components/form/form-textarea";
import { Trq_UpdateBook } from "@/services/api/books/put.update-books";
import { FormSelect } from "@/components/form/form-select";

type T_BookFormProps = {
  form: UseFormReturn<Trq_CreateBook | Trq_UpdateBook>;
  authors: { id: number; name: string }[] | undefined;
  isEditing?: boolean;
  isPending?: boolean;
  onCancel?: () => void;
  mode?: "create" | "edit";
  submitLabel: string;
  onClickEdit?: () => void;
  onSubmit: ReturnType<
    UseFormReturn<Trq_CreateBook | Trq_UpdateBook>["handleSubmit"]
  >;
};

export function BookForm({
  form,
  authors,
  isEditing = true,
  isPending = false,
  onCancel,
  submitLabel,
  mode,
  onClickEdit,
  onSubmit,
}: T_BookFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 flex flex-col gap-4 bg-white p-4 rounded shadow"
    >
      <FormInput
        id="title"
        label="Title"
        disabled={!isEditing}
        register={register("title", { required: "Title is required" })}
        error={errors.title}
      />

      <FormSelect
        id="authorId"
        label="Author"
        disabled={!isEditing}
        options={authors?.map((a) => ({ value: a.id, label: a.name })) || []}
        register={register("authorId", { required: "Author is required" })}
        error={errors.authorId}
      />

      <FormTextarea
        id="description"
        label="Description"
        disabled={!isEditing}
        register={register("description")}
        error={errors.description}
      />

      <FormInput
        id="publishedYear"
        label="Published Year"
        type="number"
        disabled={!isEditing}
        register={register("publishedYear", {
          valueAsNumber: true,
          min: { value: 0, message: "Year must be >= 0" },
        })}
        error={errors.publishedYear}
      />

      {mode === "edit" && !isEditing ? (
        <div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onClickEdit && onClickEdit();
            }}
            className="px-4 py-2 bg-yellow-500 text-gray-800 rounded hover:bg-gray-400"
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submitLabel}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
