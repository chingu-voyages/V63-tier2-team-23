import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import EventDetailItem from "./EventDetailItem";

const meta = {
  title: "Components/EventDetailItem",
  component: EventDetailItem,
  parameters: {
    controls: { disable: false },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["text", "link"],
    },
  },
  args: {
    label: "Label",
    value: "Value",
  },
} satisfies Meta<typeof EventDetailItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: "text",
  },
};

export const Link: Story = {
  args: {
    type: "link",
  },
};
