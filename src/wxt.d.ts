import message from "~/public/_locales/en/messages.json";

declare module "wxt/browser" {
  interface WxtI18n {
    getMessage(
      messageName: keyof typeof message,
      substitutions?: string[] | string,
    ): string;
  }
}
