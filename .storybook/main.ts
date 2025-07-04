import type { StorybookConfig } from '@storybook/preact-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/preact-vite",
    "options": {}
  },
  "typescript": {
    "check": false
  },
  "viteFinal": async (config) => {
    // Set base path for GitHub Pages deployment
    if (process.env.GITHUB_PAGES) {
      config.base = '/nanolux/storybook/';
    }
    return config;
  }
};
export default config;