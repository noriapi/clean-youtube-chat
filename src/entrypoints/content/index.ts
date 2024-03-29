import "./style.module.css";

import { browser } from "wxt/browser";
import { defineContentScript } from "wxt/sandbox";

import {
  classNames,
  Config,
  CONFIG_DEFAULT,
  loadConfig,
  onChangeHandler,
} from "~/lib/config";

import styles from "./style.module.css";

export type ClassName = keyof typeof styles;
export const getClassNames = () => Object.keys(styles) as ClassName[];

const setStyle = (className: ClassName, enabled: boolean) => {
  const body = document.getElementsByTagName("body")[0];

  if (enabled) {
    body.classList.add(styles[className]);
  } else {
    body.classList.remove(styles[className]);
  }
};

const setStylesByConfig = (config: Config) => {
  const classList = classNames(config);

  getClassNames().forEach((className) => {
    const enabled = classList.includes(className);
    setStyle(className, enabled);
  });
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
