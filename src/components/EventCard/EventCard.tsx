import { ComponentPropsWithoutRef } from "react";
import Text from "@/components/Text/Text";
import Link from "next/link";
import Event from "./Event";

type EventCardOwnProps = Omit<Event, "capacity" | "description"> & {
  to: string;
};

type EventCardProps = EventCardOwnProps &
  Omit<ComponentPropsWithoutRef<"div">, keyof EventCardOwnProps>;

/**
 * Renders a card summarizing an event with a link to view details.
 *
 * **Props**
 *
 * | Prop | Type | Description |
 * |------|------|-------------|
 * | `type` | `"online"` \| `"in-person"` | The event format |
 * | `title` | `string` | The event title |
 * | `date` | `string` | The event date |
 * | `start` | `string` | The start time |
 * | `end` | `string` | The end time |
 * | `location` | `string` | The physical location (optional) |
 * | `link` | `string` | An external link (optional) |
 * | `to` | `string` | The route for the "View event" link |
 * | `className` | `string` | Optional extra CSS classes |
 *
 * Any valid HTML attribute (e.g. `id`, `data-*`, `aria-*`) is also supported.
 *
 * **Examples**
 *
 * ```tsx
 * <EventCard type="online" title="Design & coffee" date="Sat, 21 Nov 2026" start="10:00" end="12:00" link="https://meet.example.com" to="/events/1" />
 * <EventCard type="in-person" title="Workshop" date="Sat, 21 Nov 2026" start="14:00" end="16:00" location="Room 204" to="/events/2" />
 * ```
 */
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
      className={`inline-flex flex-col items-start gap-y-3 rounded-medium border border-outline-variant bg-surface p-6 shadow-card ${className}`}
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
