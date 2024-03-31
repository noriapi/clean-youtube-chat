import * as Eq from "@effect/schema/Equivalence";
import * as S from "@effect/schema/Schema";
import { createStore, SetStoreFunction, unwrap } from "solid-js/store";
import { merge } from "ts-deepmerge";
import { Simplify, StringKeyOf } from "type-fest";
import { Storage } from "webextension-polyfill";
import { browser } from "wxt/browser";

import {
  ClassInfo,
  ClassInfoFromProperties,
  classInfoFromProperties,
  classInfos,
} from "./style";

export const AREA_NAME = "local";

type NonEmptyArray<A> = [A, ...A[]];

type ConfigSchemaRecipeImpl<I extends ClassInfo> = I extends any
  ? {
      [T in I["target"]]: {
        [A in I["author"]]: [I["operation"]];
      };
    }
  : never;
const configSchemaRecipeImpl = <T extends ClassInfo>(i: T) =>
  ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    [i.target]: { [i.author]: [i.operation] },
  }) as ConfigSchemaRecipeImpl<T>;
const configSchemaRecipe = () => {
  const recipes = classInfos().map(configSchemaRecipeImpl);
  return merge(...recipes);
};

type IConfigSchemaRecipe =
  | NonEmptyArray<string>
  | { [key: string]: IConfigSchemaRecipe };

type MakeConfigSchema<T extends IConfigSchemaRecipe> = [T] extends [
  NonEmptyArray<string>,
]
  ? S.literal<NonEmptyArray<T[number] | "show">>
  : T extends { [key: string]: IConfigSchemaRecipe }
    ? S.mutable<S.struct<{ [P in keyof T]: MakeConfigSchema<T[P]> }>>
    : never;

const makeConfigSchema = <T extends IConfigSchemaRecipe>(
  recipe: T,
): MakeConfigSchema<T> => {
  if (Array.isArray(recipe)) {
    return S.literal("show", ...recipe) as MakeConfigSchema<T>;
  } else {
    return S.mutable(
      S.struct(
        Object.fromEntries(
          Object.entries(recipe).map(([p, v]) => [p, makeConfigSchema(v)]),
        ),
      ),
    ) as MakeConfigSchema<T>;
  }
};

export const Config = () => {
  const recipe = configSchemaRecipe();
  return makeConfigSchema(recipe);
};

export const eqConfig = () => Eq.make(Config());

export type Config = S.Schema.Type<ReturnType<typeof Config>>;

type IConfig = Record<string, Record<string, string>>;

type ConfigClassInfoImpl<I extends IConfig> = {
  [T in StringKeyOf<I>]: {
    [A in StringKeyOf<I[T]>]: ClassInfoFromProperties<T, A, I[T][A]>;
  }[StringKeyOf<I[T]>];
}[StringKeyOf<I>];

export type ConfigClassInfo = Simplify<ConfigClassInfoImpl<Config>>;

export const configClassInfos = (config: Config) => {
  return Object.entries(config).flatMap(([target, inner]) =>
    Object.entries(inner).map(([author, operation]) =>
      classInfoFromProperties(target, author, operation),
    ),
  ) as ConfigClassInfo[];
};

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
  message: {
    owner: "show",
  },
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
  message: {
    owner: "show",
  },
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
  message: {
    owner: "show",
  },
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
