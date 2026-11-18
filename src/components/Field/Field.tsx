import { HTMLAttributes } from "react";
import Text from "@/components/Text/Text";

type FieldOwnProps = {
  id?: string;
  type?: "text" | "password" | "textarea" | "select" | "date" | "time";
  label: string;
  value?: string;
  placeholder?: string;
  error?: boolean;
  required?: boolean;
  options?: string[];
};

type FieldProps = FieldOwnProps & HTMLAttributes<HTMLElement>;

export default function Field({
  id,
  type = "text",
  placeholder,
  label,
  value,
  className,
  error = false,
  required = true,
  options,
  ...props
}: FieldProps) {
  return (
    <div className={`inline-flex flex-col items-stretch gap-2 ${className}`}>
      <label htmlFor={id ?? ""}>
        <Text className="text-on-surface" type="label">
          {label} {required ? "*" : "optional"}
        </Text>
      </label>
      {type === "textarea" ? (
        <textarea
          className={`${error ? "border-error" : "border-outline"} w-full resize-none rounded-small border p-3 text-body text-on-surface outline-outline placeholder:text-on-surface-variant`}
          placeholder={placeholder}
          value={value}
          {...props}
        />
      ) : type === "select" ? (
        <div
          className={`w-full rounded-small border border-outline p-3 outline-outline placeholder:text-on-surface-variant`}
        >
          <select className="text-body text-on-surface" {...props}>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <input
          className={`${error ? "border-error" : "border-outline"} rounded-small border p-3 text-body text-on-surface outline-outline placeholder:text-on-surface-variant`}
          id={id ?? ""}
          type={type}
          placeholder={placeholder}
          value={value}
          {...props}
        />
      )}
    </div>
  );
}
