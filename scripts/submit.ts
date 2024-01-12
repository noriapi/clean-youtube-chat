import { Command, Option } from "@commander-js/extra-typings";
import { publishExtension } from "publish-browser-extension";

const submitChrome = async (opts: { dryRun: boolean }) => {
  const result = await publishExtension({
    dryRun: opts.dryRun,
    chrome: {
      zip: `.output/clean-youtube-chat-${process.env.npm_package_version}-chrome.zip`,
      extensionId: "jopjhpjdcfhebbeinedfggddhighpjjo",
      clientId: process.env.CHROME_CLIENT_ID ?? "",
      clientSecret: process.env.CHROME_CLIENT_SECRET ?? "",
      refreshToken: process.env.CHROME_REFRESH_TOKEN ?? "",
      // publishTarget: "<default|trustedTesters>",
      // skipSubmitReview: false,
    },
  });
  return result.chrome!;
};

const submitFirefox = async (opts: { dryRun: boolean }) => {
  const result = await publishExtension({
    dryRun: opts.dryRun,
    firefox: {
      zip: `.output/clean-youtube-chat-${process.env.npm_package_version}-firefox.zip`,
      sourcesZip: `.output/clean-youtube-chat-${process.env.npm_package_version}-sources.zip`,
      extensionId: "clean-youtube-chat@noriapi.addon",
      jwtIssuer: process.env.FIREFOX_JWT_ISSUER ?? "",
      jwtSecret: process.env.FIREFOX_JWT_SECRET ?? "",
      // channel: '<listed|unlisted>',
    },
  });
  return result.firefox!;
};

const main = () => {
  const program = new Command()
    .addOption(new Option("-d --dry-run", "dry run").default(false))
    .addOption(
      new Option("-b --browser <browser>", "browser to submit to")
        .choices(["chrome", "firefox"] as const)
        .default("chrome" as const),
    )
    .action(async (opts) => {
      const result =
        opts.browser === "chrome"
          ? await submitChrome(opts)
          : await submitFirefox(opts);
      if (!result.success) {
        throw new Error(result.err);
      }
    });

  program.parse();
};

main();
