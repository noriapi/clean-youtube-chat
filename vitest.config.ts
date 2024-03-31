import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { configDefaults, defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";

export default defineConfig({
  // Configure test behavior however you like
  test: {
    mockReset: true,
    restoreMocks: true,
    exclude: [...configDefaults.exclude, "e2e/*"],
  },
  // This is the line that matters!
  plugins: [WxtVitest(), vanillaExtractPlugin()],
});
