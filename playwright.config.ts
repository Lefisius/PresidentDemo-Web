import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/app/modules/tests', //D:/Program File (x86)/E2E-frontend/PresidentDemo-Web/tests ,  ./src/app/modules
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: 'html',
  use: {
    headless: true,
    baseURL: 'http://localhost:4200', //url ตั้งต้น 
    // trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
