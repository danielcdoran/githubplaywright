import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });   

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://github.com',
    trace: 'on-first-retry',
    // env_github_User: process.env.GITHUB_USER ,
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
