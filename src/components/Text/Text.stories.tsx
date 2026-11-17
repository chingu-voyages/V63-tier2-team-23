import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Text, { TextVariant, textVariants } from "./Text";

const meta = {
  title: "components/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    children: "Event Planner",
  },
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

export const Control: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {textVariants.map((variant) => (
        <Text key={variant} variant={variant}>
          {variant[0].toUpperCase() + variant.slice(1)}: Event Planner
        </Text>
      ))}
    </div>
  ),
};

export default meta;
