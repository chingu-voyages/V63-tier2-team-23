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
