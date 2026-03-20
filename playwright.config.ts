import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://github.com',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'setup', testMatch: 'auth.setup.ts'},


    {
      // 🌐 Normal tests reuse logged-in state
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        browserName: 'chromium',
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],
});
