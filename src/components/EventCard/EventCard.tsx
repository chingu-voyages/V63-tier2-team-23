import { ComponentPropsWithoutRef } from "react";
import Text from "@/components/Text/Text";
import Link from "next/link";
import Event from "./Event";

type EventCardOwnProps = Omit<Event, "capacity" | "description"> & {
  to: string;
};

type EventCardProps = EventCardOwnProps &
  Omit<ComponentPropsWithoutRef<"div">, keyof EventCardOwnProps>;

export default function EventCard({
  type,
  title,
  date,
  start,
  end,
  location,
  link,
  to,
  className,
  ...props
}: EventCardProps) {
  return (
    <div
      className={`inline-flex flex-col items-start gap-y-3 rounded-medium border border-outline-variant bg-surface p-6 ${className}`}
      {...props}
    >
      <Text type="caption" className="text-primary">
        {type === "online" ? "Online" : "In-person"}
      </Text>
      <Text type="headline" className="text-on-surface">
        {title}
      </Text>
      <div className="text-on-surface">
        <Text>{date}</Text>·
        <Text>
          {start} – {end}
        </Text>
      </div>
      <Text className="text-on-surface-variant">{location ? location : link!}</Text>
      <Link href={to} className="text-primary">
        <Text type="label">View event →</Text>
      </Link>
    </div>
  );
}
