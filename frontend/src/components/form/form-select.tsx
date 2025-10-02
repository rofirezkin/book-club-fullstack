import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type T_Option = {
  value: string | number;
  label: string;
};

type T_FormSelectProps = {
  label: string;
  id: string;
  disabled?: boolean;
  options: T_Option[];
  error?: FieldError;
  register: UseFormRegisterReturn;
};

export function FormSelect({
  label,
  id,
  disabled = false,
  options,
  error,
  register,
}: T_FormSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        disabled={disabled}
        {...register}
        className={`w-full border rounded px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }${disabled ? " cursor-not-allowed" : ""}`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm">{error.message}</p>}
    </div>
  );
}
