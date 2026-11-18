import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Text, { textVariants } from "./Text";

const meta = {
  title: "Foundations/Typography/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    children: "Event Planner",
  },
  parameters: { controls: { disable: true } },
  argTypes: {
    type: {
      control: "select",
      options: textVariants,
    },
  },
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { controls: { disable: false } },
};

export const Display: Story = {
  args: {
    type: "display",
  },
};

export const Title: Story = {
  args: {
    type: "title",
  },
};

export const Headline: Story = {
  args: {
    type: "headline",
  },
};

export const Subheadline: Story = {
  args: {
    type: "subheadline",
  },
};

export const Body: Story = {
  args: {
    type: "body",
  },
};

export const Label: Story = {
  args: {
    type: "label",
  },
};

export const Caption: Story = {
  args: {
    type: "caption",
  },
};

export default meta;
