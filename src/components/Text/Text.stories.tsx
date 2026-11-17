import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Text, { TextVariant, textVariants } from "./Text";

const meta = {
  title: "Foundations/Typography/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    children: "Event Planner",
  },
  parameters: { controls: { disable: true } },
  argTypes: {
    variant: {
      control: "select",
      options: textVariants,
    },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "span", "div", "p", "label"],
    },
  },
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { controls: { disable: false } },
};

export const Display: Story = {
  args: {
    variant: "display",
  },
};

export const Title: Story = {
  args: {
    variant: "title",
  },
};

export const Headline: Story = {
  args: {
    variant: "headline",
  },
};

export const Subheadline: Story = {
  args: {
    variant: "subheadline",
  },
};

export const Body: Story = {
  args: {
    variant: "body",
  },
};

export const Label: Story = {
  args: {
    variant: "label",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
  },
};

export default meta;
