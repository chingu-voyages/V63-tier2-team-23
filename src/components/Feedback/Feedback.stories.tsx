import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Feedback, { feedbacktVariants } from "@/components/Feedback/Feedback";

const meta = {
  title: "Components/Feedback",
  component: Feedback,
  parameters: {
    controls: {
      disable: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: feedbacktVariants,
    },
    message: {
      control: "text",
    },
  },
  args: {
    message: "invalid email or password",
  },
} satisfies Meta<typeof Feedback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    type: "error",
  },
};

export const Success: Story = {
  args: {
    type: "success",
  },
};

export const Loading: Story = {
  args: {
    type: "loading",
  },
};
