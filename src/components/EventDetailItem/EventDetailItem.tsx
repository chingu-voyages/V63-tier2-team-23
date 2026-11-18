import { HTMLAttributes, ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import Text from "@/components/Text/Text";

type EventDetailItemOwnProps = {
  type: "text" | "link";
  label: string;
  value: string;
};

type EventDetailItemProps = EventDetailItemOwnProps &
  Omit<ComponentPropsWithoutRef<"div">, keyof EventDetailItemOwnProps>;

/**
 * Renders a label-value pair, displaying the value as plain text or a clickable link.
 *
 * **Props**
 *
 * | Prop | Type | Description |
 * |------|------|-------------|
 * | `type` | `"text"` \| `"link"` | How to render the value |
 * | `label` | `string` | The label displayed above the value |
 * | `value` | `string` | The text content or URL |
 * Any valid HTML attribute (e.g. `id`, `data-*`, `aria-*`) is also supported.
 *
 * **Examples**
 *
 * ```tsx
 * <EventDetailItem type="text" label="Date" value="Nov 18, 2026" />
 * <EventDetailItem type="link" label="Website" value="https://example.com" />
 * ```
 */
export default function EventDetailItem({ type, label, value, className }: EventDetailItemProps) {
  return (
    <div className={`flex flex-col gap-y-2 ${className}`}>
      <Text variant="caption" className="text-on-surface-variant">
        {label}
      </Text>
      {type === "text" ? (
        <Text variant="body" className="text-on-surface">
          {value}
        </Text>
      ) : (
        <Link href={value}>
          <Text variant="body" className="text-primary">
            {value}
          </Text>
        </Link>
      )}
    </div>
  );
}
