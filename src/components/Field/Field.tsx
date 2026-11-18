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

/**
 * Renders a form field with a label and an input, textarea, select, date, time, or password field.
 *
 * **Props**
 *
 * | Prop | Type | Description |
 * |------|------|-------------|
 * | `id` | `string` | The field ID for label association |
 * | `type` | `"text"` \| `"password"` \| `"textarea"` \| `"select"` \| `"date"` \| `"time"` | The input type (default: `"text"`) |
 * | `label` | `string` | The field label |
 * | `value` | `string` | The field value |
 * | `placeholder` | `string` | Placeholder text |
 * | `error` | `boolean` | Whether to show error styling (default: `false`) |
 * | `required` | `boolean` | Whether the field is required (default: `true`) |
 * | `options` | `string[]` | Options for select type |
 * | `className` | `string` | Optional extra CSS classes |
 *
 * Any valid HTML attribute (e.g. `data-*`, `aria-*`, `onChange`) is also supported.
 *
 * **Examples**
 *
 * ```tsx
 * <Field type="text" label="Email" placeholder="Enter your email" required />
 * <Field type="textarea" label="Description" placeholder="Enter description" />
 * <Field type="select" label="Event type" options={["Online", "In-Person"]} />
 * <Field type="text" label="Password" error />
 * ```
 */
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
          {label} {required ? "*" : "(optional)"}
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
