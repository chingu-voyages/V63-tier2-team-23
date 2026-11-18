import type { StorybookConfig } from "@storybook/nextjs-vite";
import { storybookNextJsPlugin } from "@storybook/nextjs-vite/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    {
      name: "addon-storybook-sync",
      options: {
        port: Number(process.env.WEBSTORM_ADDON_STORYBOOK_SYNC_PORT) || undefined,
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), storybookNextJsPlugin(), tailwindcss()];
    return config;
  },
};
export default config;
