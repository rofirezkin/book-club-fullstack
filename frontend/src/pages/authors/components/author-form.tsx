"use client";

import { UseFormReturn } from "react-hook-form";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";

import { Trq_UpdateAuthors } from "@/services/api/authors/put.update-authors";
import { Trq_CreateAuthors } from "@/services/api/authors/post.create-authors";

type T_AuthorFormProps = {
  form: UseFormReturn<Trq_CreateAuthors | Trq_UpdateAuthors>;
  isEditing?: boolean;
  isPending?: boolean;
  onCancel?: () => void;
  mode?: "create" | "edit";
  submitLabel: string;
  onClickEdit?: () => void;
  onSubmit: ReturnType<
    UseFormReturn<Trq_CreateAuthors | Trq_UpdateAuthors>["handleSubmit"]
  >;
};

export function AuthorForm({
  form,
  isEditing = true,
  isPending = false,
  onCancel,
  submitLabel,
  mode,
  onClickEdit,
  onSubmit,
}: T_AuthorFormProps) {
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
        id="name"
        label="Name"
        disabled={!isEditing}
        register={register("name", { required: "Name is required" })}
        error={errors.name}
      />

      <FormTextarea
        id="bio"
        label="Bio"
        disabled={!isEditing}
        register={register("bio")}
        error={errors.bio}
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
