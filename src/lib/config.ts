import * as D from "io-ts/Decoder";
import * as Eq from "io-ts/Eq";
import * as S from "io-ts/Schema";
import { createStore, SetStoreFunction, unwrap } from "solid-js/store";
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

type helper<T, V> = {
  [k in keyof T]: T[k] extends string ? Record<T[k], V> : helper<T[k], V>;
};

type ConfigClassNameMap = helper<Config, ClassName | undefined>;

const ConfigClassNameMap = {
  message: {
    owner: {
      hide: "message-owner-none",
      nohighlight: "message-owner-nohighlight",
      show: undefined,
    },
    moderator: {
      hide: "message-owner-none",
      show: undefined,
    },
    others: {
      hide: "message-others-none",
      show: undefined,
    },
  },
  name: {
    owner: {
      hide: "name-owner-none",
      nohighlight: "name-owner-nohighlight",
      show: undefined,
    },
    moderator: {
      hide: "name-moderator-none",
      nohighlight: "name-moderator-nohighlight",
      show: undefined,
    },
    others: {
      hide: "name-others-none",
      show: undefined,
    },
  },
  icon: {
    owner: {
      hide: "icon-owner-none",
      show: undefined,
    },
    moderator: {
      hide: "icon-moderator-none",
      show: undefined,
    },
    others: {
      hide: "icon-others-none",
      show: undefined,
    },
  },
  badge: {
    moderator: {
      hide: "badge-moderator-none",
      show: undefined,
    },
  },
  superchat: {
    hide: "superchat-none",
    show: undefined,
  },
  sticker: {
    hide: "sticker-none",
    show: undefined,
  },
  superchatBar: {
    hide: "superchatBar-none",
    show: undefined,
  },
  memberChat: {
    hide: "memberChat-none",
    show: undefined,
  },
  engagement: {
    hide: "engagement-none",
    show: undefined,
  },
} as const satisfies ConfigClassNameMap;

interface DeepRecord {
  [k: string]: DeepRecord | string;
}

const traverse = (
  obj: DeepRecord,
  cb: (path: string[], value: string) => void,
  path: string[] = [],
) => {
  Object.entries(obj).forEach(([k, v]) => {
    if (typeof v === "string") {
      cb([...path, k], v);
    } else {
      traverse(v, cb, [...path, k]);
    }
  });
};

export const classNames = (config: Config) => {
  const results: ClassName[] = [];

  traverse(config, (path, v) => {
    const mayClassName = path.reduce(
      (inner, p) => inner[p as keyof typeof inner] as DeepRecord,
      ConfigClassNameMap as unknown as DeepRecord,
    )[v] as ClassName | undefined;

    if (mayClassName != null) {
      results.push(mayClassName);
    }
  });

  return results;
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
    const value = unwrap(config);
    void saveConfig(value);
  };

  return [config, setConfig] as const;
};
