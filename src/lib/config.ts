import * as Eq from "@effect/schema/Equivalence";
import * as S from "@effect/schema/Schema";
import { createStore, SetStoreFunction, unwrap } from "solid-js/store";
import { Storage } from "webextension-polyfill";
import { browser } from "wxt/browser";

import { Styles, styles } from "./style.css";

export const AREA_NAME = "local";

type NonEmptyArray<A> = [A, ...A[]];

type DeepStringRecord = string | { [key: string]: DeepStringRecord };

type MakeConfigSchema<T extends DeepStringRecord> =
  T extends Record<infer O extends string, string>
    ? S.literal<NonEmptyArray<O | "show">>
    : T extends { [key: string]: DeepStringRecord }
      ? S.mutable<S.struct<{ [P in keyof T]: MakeConfigSchema<T[P]> }>>
      : never;

const makeConfigSchema = <T extends DeepStringRecord>(
  record: T,
): MakeConfigSchema<T> => {
  if (Object.values(record).every((v) => typeof v === "string")) {
    return S.literal("show", ...Object.keys(record)) as MakeConfigSchema<T>;
  } else {
    return S.mutable(
      S.struct(
        Object.fromEntries(
          Object.entries(record).map(([p, v]) => [p, makeConfigSchema(v)]),
        ),
      ),
    ) as MakeConfigSchema<T>;
  }
};

export const Config = () => {
  return makeConfigSchema<Styles>(styles);
};

export const eqConfig = () => Eq.make(Config());

export type Config = S.Schema.Type<ReturnType<typeof Config>>;

export const CONFIG_DEFAULT = {
  chat: {
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
  superchat: { any: "show" },
  sticker: { any: "show" },
  superchatBar: { any: "show" },
  memberChat: { any: "show" },
  engagement: { any: "show" },
} satisfies Config;

export const CONFIG_SHOW_ALL = {
  chat: {
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
  superchat: { any: "show" },
  sticker: { any: "show" },
  superchatBar: { any: "show" },
  memberChat: { any: "show" },
  engagement: { any: "show" },
} satisfies Config;

export const CONFIG_HIDE_ALL = {
  chat: {
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
  superchat: { any: "hide" },
  sticker: { any: "hide" },
  superchatBar: { any: "hide" },
  memberChat: { any: "hide" },
  engagement: { any: "hide" },
} satisfies Config;

export const loadConfig = async (defaultConfig: Config) => {
  const storage = await browser.storage[AREA_NAME].get(["config"]);

  if (storage.config == null) {
    return defaultConfig;
  }

  const result = S.decodeUnknownOption(Config())(storage.config);
  return result._tag === "Some" ? result.value : defaultConfig;
};

export const saveConfig = async (config: Config) => {
  return browser.storage[AREA_NAME].set({ config });
};

export const onChangeHandler =
  (callback: (newValue: Config) => void) =>
  (changes: Record<string, Storage.StorageChange>, areaName: string) => {
    if (areaName === AREA_NAME && "config" in changes) {
      const newConfigResult = S.decodeUnknownOption(Config())(
        changes.config.newValue,
      );
      if (newConfigResult._tag === "None") return;
      const newConfig = newConfigResult.value;

      const oldConfigResult = S.decodeUnknownOption(Config())(
        changes.config.oldValue,
      );
      const oldConfig =
        oldConfigResult._tag === "Some" ? oldConfigResult.value : undefined;

      if (oldConfig != null && eqConfig()(oldConfig, newConfig)) return;

      callback(newConfig);
    }
  };

export const createConfigStore = (initialValue: Config) => {
  const [config, setStoreConfig] = createStore<Config>(initialValue);

  const setConfig: SetStoreFunction<Config> = (...args: any[]) => {
    // @ts-expect-error: just passing arguments
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setStoreConfig(...args);
    const value = unwrap(config);
    void saveConfig(value);
  };

  return [config, setConfig] as const;
};
