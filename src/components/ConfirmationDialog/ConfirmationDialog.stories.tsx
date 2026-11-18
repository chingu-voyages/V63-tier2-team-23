import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog";

const meta = {
  title: "Components/ConfirmationDialog",
  component: ConfirmationDialog,
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: "string",
    },
    message: {
      type: "string",
    },
    kind: {
      options: ["create", "edit", "delete"],
    },
    confirmLabel: {
      type: "string",
    },
    cancelLabel: {
      type: "string",
    },
  },
  args: {
    title: "",
    message: "",
  },
} satisfies Meta<typeof ConfirmationDialog>;

type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    title: "Discard unsaved changes?",
    message: "Your event has not been saved. Discard it and return to My events?",
    kind: "create",
    confirmLabel: "Discard changes",
    cancelLabel: "Keep editing",
  },
};

export const Edit: Story = {
  args: {
    title: "Discard unsaved changes?",
    message: "Your changes have not been saved. Discard them and return to the event?",
    kind: "edit",
    confirmLabel: "Discard changes",
    cancelLabel: "Keep editing",
  },
};

export const Delete: Story = {
  args: {
    title: "Delete this event?",
    message: "“Design & coffee” will be permanently deleted. This action cannot be undone.",
    kind: "delete",
    confirmLabel: "Delete event",
    cancelLabel: "Keep event",
  },
};

export default meta;
