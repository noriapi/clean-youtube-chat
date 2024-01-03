import { browser } from "wxt/browser";
import { defineBackground } from "wxt/sandbox";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    console.log("Hello from background");
  });
});
