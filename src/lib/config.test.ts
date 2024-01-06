import { fc, it } from "@fast-check/vitest";
import { beforeEach, describe, expect, vi } from "vitest";
import { fakeBrowser } from "wxt/testing";

import { getClassNames } from "~/entrypoints/content";

import {
  AREA_NAME,
  classNames,
  Config,
  CONFIG_SHOW_ALL,
  eqConfig,
  loadConfig,
  onChangeHandler,
  saveConfig,
} from "./config";

const arbConfig = fc.record({
  message: fc.record({
    owner: fc.constantFrom("hide", "nohighlight", "show"),
    moderator: fc.constantFrom("hide", "show"),
    others: fc.constantFrom("hide", "show"),
  }),
  name: fc.record({
    owner: fc.constantFrom("hide", "nohighlight", "show"),
    moderator: fc.constantFrom("hide", "nohighlight", "show"),
    others: fc.constantFrom("hide", "show"),
  }),
  icon: fc.record({
    owner: fc.constantFrom("hide", "show"),
    moderator: fc.constantFrom("hide", "show"),
    others: fc.constantFrom("hide", "show"),
  }),
  badge: fc.record({
    moderator: fc.constantFrom("hide", "show"),
  }),
  superchat: fc.constantFrom("hide", "show"),
  sticker: fc.constantFrom("hide", "show"),
  superchatBar: fc.constantFrom("hide", "show"),
  memberChat: fc.constantFrom("hide", "show"),
  engagement: fc.constantFrom("hide", "show"),
}) satisfies fc.Arbitrary<Config>;

describe("classNames", () => {
  it.prop([arbConfig])("should always return valid classNames", (config) => {
    classNames(config).forEach((cn) => {
      expect(getClassNames()).toContain(cn);
    });
  });
});

describe("saveConfig, loadConfig", () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it.prop([arbConfig])(
    "should always save and load the same config",
    async (config) => {
      await saveConfig(config);
      await expect(loadConfig(CONFIG_SHOW_ALL)).resolves.toStrictEqual(config);
    },
  );
});

describe("onChangeHandler", () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it.prop([arbConfig])(
    "should always handle changes that creating new config",
    async (config) => {
      const cb = vi.fn();

      fakeBrowser.storage.onChanged.addListener(onChangeHandler(cb));

      await saveConfig(config);

      expect(cb).toHaveBeenCalledWith(config);
    },
  );

  it.prop([
    fc.uniqueArray(arbConfig, {
      minLength: 2,
      maxLength: 2,
      comparator: eqConfig.equals,
    }),
  ])(
    "should always handle changes that replacing old config",
    async ([oldConfig, newConfig]) => {
      const cb = vi.fn();

      await saveConfig(oldConfig);

      fakeBrowser.storage.onChanged.addListener(onChangeHandler(cb));

      await saveConfig(newConfig);

      expect(cb).toHaveBeenCalledWith(newConfig);
    },
  );

  it.prop([arbConfig])(
    "should not always handle changes that don't actually change",
    async (config) => {
      const cb = vi.fn();

      await saveConfig(config);

      fakeBrowser.storage.onChanged.addListener(onChangeHandler(cb));

      await saveConfig(config);

      expect(cb).not.toHaveBeenCalled();
    },
  );

  it("should not handle storage changes if the config is not changed", async () => {
    const cb = vi.fn();

    fakeBrowser.storage.onChanged.addListener(onChangeHandler(cb));

    await fakeBrowser.storage[AREA_NAME].set({ abc: "def" });

    expect(cb).not.toHaveBeenCalled();
  });

  it("should not handle storage changes if the config is invalid", async () => {
    const cb = vi.fn();

    fakeBrowser.storage.onChanged.addListener(onChangeHandler(cb));

    await fakeBrowser.storage[AREA_NAME].set({ config: "invalid" });

    expect(cb).not.toHaveBeenCalled();
  });
});
