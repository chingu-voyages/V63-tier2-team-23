import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import EventCard from "./EventCard";

const meta = {
  title: "Components/EventCard",
  component: EventCard,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    type: {
      control: "select",
      options: ["online", "in-person"],
      date: {
        control: "string",
      },
      start: {
        control: "string",
      },
      end: {
        control: "string",
      },
      to: {
        control: "string",
      },
    },
  },
  args: {
    title: "Design & coffee",
    date: "Sat, 21 Nov 2026",
    start: "10:00",
    end: "12:00",
    to: "/",
  },
} satisfies Meta<typeof EventCard>;

type Story = StoryObj<typeof meta>;

export const Online: Story = {
  args: {
    type: "online",
  },
};

export const InPerson: Story = {
  args: {
    type: "in-person",
  },
};

export default meta;
