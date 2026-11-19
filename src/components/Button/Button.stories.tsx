import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    controls: {
      disable: true,
    },
  },
  argTypes: {
    type: {
      options: ["primary", "secondary", "danger", "text"],
    },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "primary",
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
  },
};

export const Danger: Story = {
  args: {
    type: "danger",
  },
};

export const Text: Story = {
  args: {
    type: "text",
  },
};
