import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Field from "@/components/Field/Field";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text", type: "string" },
    type: {
      control: "select",
      options: ["text", "password", "textarea", "select", "date", "time"],
    },
    label: {
      control: "text",
      type: "string",
    },
    placeholder: {
      control: "text",
      type: "string",
    },
    error: {
      control: "boolean",
      type: "boolean",
    },
    required: {
      control: "boolean",
      type: "boolean",
    },
    options: {
      control: "multi-select",
      options: ["Online", "In-Person"],
    },
  },
  args: {
    label: "Label",
    placeholder: "Enter Value",
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    type: "text",
    error: true,
    value: "Wrong Value",
  },
};

export const Required: Story = {
  args: {
    type: "text",
    required: true,
  },
};

export const Optional: Story = {
  args: {
    type: "text",
  },
};

export const TextInput: Story = {
  args: {
    type: "text",
    required: true,
  },
};

export const PasswordInput: Story = {
  args: {
    type: "password",
    required: true,
    value: "Password",
  },
};

export const DateInput: Story = {
  args: {
    type: "date",
    required: true,
  },
};

export const TimeInput: Story = {
  args: {
    type: "time",
    required: true,
  },
};

export const Textarea: Story = {
  args: {
    type: "textarea",
    placeholder: "Enter Value",
  },
};
