import * as D from "io-ts/Decoder";
import * as Eq from "io-ts/Eq";
import * as S from "io-ts/Schema";
import { untrack } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { Storage } from "webextension-polyfill";
import { browser } from "wxt/browser";

import type { ClassName } from "~/entrypoints/content";

export const AREA_NAME = "local";

export const Config = S.make((S) =>
  S.struct({
    message: S.struct({
      owner: S.literal("hide", "nohighlight", "show"),
      moderator: S.literal("hide", "show"),
      others: S.literal("hide", "show"),
    }),
    name: S.struct({
      owner: S.literal("hide", "nohighlight", "show"),
      moderator: S.literal("hide", "nohighlight", "show"),
      others: S.literal("hide", "show"),
    }),
    icon: S.struct({
      owner: S.literal("hide", "show"),
      moderator: S.literal("hide", "show"),
      others: S.literal("hide", "show"),
    }),
    badge: S.struct({
      moderator: S.literal("hide", "show"),
    }),
    superchat: S.literal("hide", "show"),
    sticker: S.literal("hide", "show"),
    superchatBar: S.literal("hide", "show"),
    memberChat: S.literal("hide", "show"),
    engagement: S.literal("hide", "show"),
  }),
);
export const decoderConfig = S.interpreter(D.Schemable)(Config);
export const eqConfig = S.interpreter(Eq.Schemable)(Config);

export type Config = S.TypeOf<typeof Config>;

export const CONFIG_DEFAULT = {
  message: {
    owner: "show",
    moderator: "show",
    others: "show",
  },
  name: {
    owner: "hide",
    moderator: "hide",
    others: "hide",
  },
  icon: {
    owner: "show",
    moderator: "show",
    others: "show",
  },
  badge: {
    moderator: "hide",
  },
  superchat: "show",
  sticker: "show",
  superchatBar: "show",
  memberChat: "show",
  engagement: "show",
} satisfies Config;

export const CONFIG_SHOW_ALL = {
  message: {
    owner: "show",
    moderator: "show",
    others: "show",
  },
  name: {
    owner: "show",
    moderator: "show",
    others: "show",
  },
  icon: {
    owner: "show",
    moderator: "show",
    others: "show",
  },
  badge: {
    moderator: "show",
  },
  superchat: "show",
  sticker: "show",
  superchatBar: "show",
  memberChat: "show",
  engagement: "show",
} satisfies Config;

export const CONFIG_HIDE_ALL = {
  message: {
    owner: "hide",
    moderator: "hide",
    others: "hide",
  },
  name: {
    owner: "hide",
    moderator: "hide",
    others: "hide",
  },
  icon: {
    owner: "hide",
    moderator: "hide",
    others: "hide",
  },
  badge: {
    moderator: "hide",
  },
  superchat: "hide",
  sticker: "hide",
  superchatBar: "hide",
  memberChat: "hide",
  engagement: "hide",
} satisfies Config;

const valueToClassName = (value: "hide" | "nohighlight" | "show") => {
  switch (value) {
    case "hide":
      return "none";
    case "nohighlight":
      return "nohighlight";
    case "show":
      return undefined;
  }
};

export const classNames = (config: Config) => {
  return Object.entries(config).flatMap(([target, v]) => {
    if (typeof v === "string") {
      const value = valueToClassName(v);
      return value ? [`${target}-${value}`] : [];
    } else {
      const inners = Object.entries(v).flatMap(([ty, op]) => {
        const value = valueToClassName(op);
        return value ? [`${ty}-${value}`] : [];
      });
      return inners.map((inner) => `${target}-${inner}`);
    }
  }) as ClassName[];
};

export const loadConfig = async (defaultConfig: Config) => {
  const storage = await browser.storage[AREA_NAME].get(["config"]);

  if (storage.config == null) {
    return defaultConfig;
  }

  const result = decoderConfig.decode(storage.config);
  return result._tag === "Right" ? result.right : defaultConfig;
};

export const saveConfig = async (config: Config) => {
  return browser.storage[AREA_NAME].set({ config });
};

export const onChangeHandler =
  (callback: (newValue: Config) => void) =>
  (changes: Record<string, Storage.StorageChange>, areaName: string) => {
    if (areaName === AREA_NAME && "config" in changes) {
      const newConfigResult = decoderConfig.decode(changes.config.newValue);
      if (newConfigResult._tag === "Left") return;
      const newConfig = newConfigResult.right;

      const oldConfigResult = decoderConfig.decode(changes.config.oldValue);
      const oldConfig =
        oldConfigResult._tag === "Right" ? oldConfigResult.right : undefined;

      if (oldConfig != null && eqConfig.equals(oldConfig, newConfig)) return;

      callback(newConfig);
    }
  };

export const createConfigStore = (initialValue: Config) => {
  const [config, setStoreConfig] = createStore<Config>(initialValue);

  const setConfig: SetStoreFunction<Config> = (...args: any[]) => {
    // @ts-expect-error: just passing arguments
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setStoreConfig(...args);
    const value = untrack(() => config);
    void saveConfig(value);
  };

  return [config, setConfig] as const;
};
