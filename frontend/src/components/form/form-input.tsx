import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type T_FormInputProps = {
  label: string;
  id: string;
  type?: string;
  disabled?: boolean;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

export function FormInput({
  label,
  id,
  type = "text",
  disabled = false,
  error,
  register,
}: T_FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register}
        className={`w-full border rounded px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }${disabled ? " cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-red-600 text-sm">{error.message}</p>}
    </div>
  );
}
