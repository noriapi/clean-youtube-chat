import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // all tests in all files to run in parallel
  fullyParallel: true,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: process.env.CI ? [["github"], ["html"]] : "html",

  use: {
    // Collect trace when retrying the failed test.
    trace: "on-first-retry",
  },

  // Configure projects for major browsers.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
