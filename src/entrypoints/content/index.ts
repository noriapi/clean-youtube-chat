import "~/lib/style.module.css";

import { browser } from "wxt/browser";
import { defineContentScript } from "wxt/sandbox";

import {
  Config,
  CONFIG_DEFAULT,
  ConfigClassInfo,
  configClassInfos,
  loadConfig,
  onChangeHandler,
} from "~/lib/config";
import { classInfosOf, classInfoTag, className, isClassTag } from "~/lib/style";

const setStyle = (info: ConfigClassInfo) => {
  const body = document.getElementsByTagName("body")[0];

  // remove all related class names
  const sameTargetAuthorInfos = classInfosOf(info.target, info.author);
  sameTargetAuthorInfos.forEach((i) => {
    const tag = classInfoTag(i);
    if (isClassTag(tag)) {
      body.classList.remove(className(tag));
    }
  });

  // add an actual class name
  const tag = classInfoTag(info);
  if (isClassTag(tag)) {
    body.classList.add(className(tag));
  }
};

const setStylesByConfig = (config: Config) => {
  const infos = configClassInfos(config);

  infos.forEach(setStyle);
};

const initStyle = () => {
  loadConfig(CONFIG_DEFAULT)
    .then(setStylesByConfig)
    .catch((reason) =>
      // eslint-disable-next-line no-console
      console.error("[clean-youtube-chat]: Failed to get config", reason),
    );
};

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  runAt: "document_end",
  cssInjectionMode: "manifest",
  allFrames: true,
  main: () => {
    initStyle();
    browser.storage.onChanged.addListener(
      onChangeHandler((config) => {
        setStylesByConfig(config);
      }),
    );
  },
});
