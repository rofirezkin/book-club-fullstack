import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type T_FormDateProps = {
  label: string;
  id: string;
  disabled?: boolean;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

export function FormDate({
  label,
  id,
  disabled = false,
  error,
  register,
}: T_FormDateProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        type="date"
        id={id}
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
