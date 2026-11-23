import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import Text from "@/components/Text/Text";

type InputType = "text" | "password" | "date" | "time" | "email";

type FieldOwnProps = {
  id?: string;
  label: string;
  error?: boolean;
  required?: boolean;
  className?: string; // Applied to the wrapper
};

type FieldProps =
  | (FieldOwnProps &
      Omit<InputHTMLAttributes<HTMLInputElement>, keyof FieldOwnProps | "type"> & {
        type?: InputType;
      })
  | (FieldOwnProps &
      Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof FieldOwnProps | "type"> & {
        type: "textarea";
      })
  | (FieldOwnProps &
      Omit<SelectHTMLAttributes<HTMLSelectElement>, keyof FieldOwnProps | "type"> & {
        type: "select";
        options: string[];
      });

export default function Field(props: FieldProps) {
  if (props.type === "textarea") {
    const { id, label, error = false, required = true, className, ...textareaProps } = props;

    return (
      <div className={`inline-flex flex-col items-stretch gap-2 ${className ?? ""}`}>
        <label htmlFor={id}>
          <Text className="text-on-surface" type="label">
            {label} {required ? "*" : "(optional)"}
          </Text>
        </label>
        <textarea
          {...textareaProps}
          id={id}
          required={required}
          className={`${error ? "border-error" : "border-outline"} w-full resize-none rounded-small border p-3 text-body text-on-surface outline-outline placeholder:text-on-surface-variant`}
        />
      </div>
    );
  }

  if (props.type === "select") {
    const { id, label, error = false, required = true, className, options, ...selectProps } = props;

    return (
      <div className={`inline-flex flex-col items-stretch gap-2 ${className ?? ""}`}>
        <label htmlFor={id}>
          <Text className="text-on-surface" type="label">
            {label} {required ? "*" : "(optional)"}
          </Text>
        </label>
        <div className="w-full rounded-small border border-outline p-3 outline-outline">
          <select
            {...selectProps}
            id={id}
            required={required}
            className="text-body text-on-surface"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  const {
    id,
    label,
    error = false,
    required = true,
    className,
    type = "text",
    ...inputProps
  } = props;

  return (
    <div className={`inline-flex flex-col items-stretch gap-2 ${className ?? ""}`}>
      <label htmlFor={id}>
        <Text className="text-on-surface" type="label">
          {label} {required ? "*" : "(optional)"}
        </Text>
      </label>
      <input
        {...inputProps}
        id={id}
        type={type}
        required={required}
        className={`${error ? "border-error" : "border-outline"} rounded-small border p-3 text-body text-on-surface outline-outline placeholder:text-on-surface-variant`}
      />
    </div>
  );
}
