import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";

// Token metadata derived from `src/app/tokens.css`
const tokens = [
  { name: "Primary", variable: "--color-primary", hex: "#145c46" },
  { name: "On Primary", variable: "--color-on-primary", hex: "#ffffff" },
  { name: "Secondary", variable: "--color-secondary", hex: "#e7f1cb" },
  { name: "On Secondary", variable: "--color-on-secondary", hex: "#29401c" },
  { name: "Surface", variable: "--color-surface", hex: "#ffffff" },
  {
    name: "Surface Variant",
    variable: "--color-surface-variant",
    hex: "#f0f3ef",
  },
  { name: "On Surface", variable: "--color-on-surface", hex: "#192e27" },
  {
    name: "On Surface Variant",
    variable: "--color-on-surface-variant",
    hex: "#53655d",
  },
  {
    name: "Background",
    variable: "--color-background",
    hex: "#f7f8f3",
  },
  {
    name: "On Background",
    variable: "--color-on-background",
    hex: "#192e27",
  },
  { name: "Outline", variable: "--color-outline", hex: "#7c8c83" },
  {
    name: "Outline Variant",
    variable: "--color-outline-variant",
    hex: "#dce3dc",
  },
  { name: "Error", variable: "--color-error", hex: "#b3261e" },
  { name: "On Error", variable: "--color-on-error", hex: "#ffffff" },
  {
    name: "Error Container",
    variable: "--color-error-container",
    hex: "#fff0ed",
  },
  { name: "Success", variable: "--color-success", hex: "#206440" },
  {
    name: "On Success",
    variable: "--color-on-success",
    hex: "#ffffff",
  },
  {
    name: "Success Container",
    variable: "--color-success-container",
    hex: "#eaf4eb",
  },
  { name: "Warning", variable: "--color-warning", hex: "#735100" },
  {
    name: "On Warning",
    variable: "--color-on-warning",
    hex: "#ffffff",
  },
  {
    name: "Warning Container",
    variable: "--color-warning-container",
    hex: "#fff3cf",
  },
  { name: "Scrim", variable: "--color-scrim", hex: "#192e277a" },
];

type ColorSwatchProps = {
  name: string;
  variable: string;
  hex: string;
};

function ColorSwatch({ name, variable, hex }: ColorSwatchProps) {
  return (
    <div className="border-gray-200 rounded-lg overflow-hidden border shadow">
      <div
        className="h-24 w-full"
        style={{ backgroundColor: `var(${variable})` }}
        data-testid={`swatch-${name.toLowerCase().replace(/\s+/g, "-")}`}
      />
      <div className="bg-white p-3">
        <p className="text-gray-900 text-sm font-medium">{name}</p>
        <p className="text-gray-500 text-xs font-mono">{variable}</p>
        <p className="text-gray-400 text-xs font-mono">{hex}</p>
      </div>
    </div>
  );
}

function ColorPalette() {
  return (
    <div>
      <h2 className="text-gray-900 text-2xl mb-2 font-bold">Color Tokens</h2>
      <p className="text-gray-600 mb-6">
        Design system color palette defined in{" "}
        <code className="bg-gray-100 text-sm rounded px-1 py-0.5 font-mono">tokens.css</code>
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {tokens.map((token) => (
          <ColorSwatch key={token.variable} {...token} />
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: ColorPalette,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ColorPalette>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
