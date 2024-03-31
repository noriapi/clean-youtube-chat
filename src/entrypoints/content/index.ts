import "~/lib/style.module.css";

import { browser } from "wxt/browser";
import { defineContentScript } from "wxt/sandbox";

import {
  Config,
  CONFIG_DEFAULT,
  loadConfig,
  onChangeHandler,
} from "~/lib/config";
import { getClassName, getOptionClassNames, Styles } from "~/lib/style.css";

const getBody = () => document.getElementsByTagName("body")[0];

const removeStyles =
  <E extends keyof Styles>(element: E) =>
  <A extends keyof Styles[E]>(author: A) => {
    const body = getBody();

    const optionClassNames = getOptionClassNames(element)(author);

    optionClassNames.forEach((className) => {
      body.classList.remove(className);
    });
  };

const setStyle =
  <E extends keyof Styles>(element: E) =>
  <A extends keyof Styles[E]>(author: A) =>
  <O extends keyof Styles[E][A]>(option?: O) => {
    removeStyles(element)(author);

    if (option !== undefined) {
      // add an actual class name
      const className = getClassName(element)(author)(option);
      const body = getBody();

      body.classList.add(className);
    }
  };

const setStylesByConfig = (config: Config) => {
  Object.entries(config).forEach(([element, authorObj]) => {
    Object.entries(authorObj).forEach(([author, option]) => {
      setStyle(element as keyof Styles)(author as keyof Styles[keyof Styles])(
        option,
      );
    });
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
