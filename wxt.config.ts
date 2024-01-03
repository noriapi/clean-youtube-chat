import Solid from "vite-plugin-solid";
import { defineConfig } from "wxt";

const manifestBase = {
  name: "__MSG_extName__",
  description: "__MSG_extDescription__",
  default_locale: "en",
  permissions: ["storage"],
  author: "noriapi",
  // homepage_url: "https://github.com/noriapi/web-extension-template",
};

const manifestV2 = {
  ...manifestBase,
  browser_specific_settings: {
    gecko: {
      // id: "web-extension-template@noriapi.addon",
      strict_min_version: "57.0",
    },
  },
};

const manifestV3 = manifestBase;

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    build: {
      target: "esnext",
    },
    plugins: [Solid()],
  }),
  manifest: (env) => (env.manifestVersion === 2 ? manifestV2 : manifestV3),
  srcDir: "src",
  imports: false,
});
