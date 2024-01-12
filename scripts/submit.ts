import { Command, Option } from "@commander-js/extra-typings";
import { publishExtension } from "publish-browser-extension";

const submitChrome = (opts: { dryRun: boolean }) => {
  return publishExtension({
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
};

const submitFirefox = (opts: { dryRun: boolean }) => {
  return publishExtension({
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
};

const main = () => {
  const program = new Command()
    .addOption(new Option("-d --dry-run", "dry run").default(false))
    .addOption(
      new Option("-b --browser <browser>", "browser to submit to")
        .choices(["chrome", "firefox"] as const)
        .default("chrome" as const),
    )
    .parse();

  const options = program.opts();

  options.browser === "chrome" ? submitChrome(options) : submitFirefox(options);
};

main();
