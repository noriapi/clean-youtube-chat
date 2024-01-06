import { configDefaults, defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";

export default defineConfig({
  // Configure test behavior however you like
  test: {
    mockReset: true,
    restoreMocks: true,
    css: {
      include: /.*\.module\.css$/,
    },
    exclude: [...configDefaults.exclude, "e2e/*"],
  },
  // This is the line that matters!
  plugins: [WxtVitest()],
});
