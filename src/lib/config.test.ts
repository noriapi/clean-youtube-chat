import * as A from "@effect/schema/Arbitrary";
import { fc, it } from "@fast-check/vitest";
import { beforeEach, describe, expect, vi } from "vitest";
import { fakeBrowser } from "wxt/testing";

import {
  AREA_NAME,
  Config,
  CONFIG_HIDE_ALL,
  CONFIG_SHOW_ALL,
  createConfigStore,
  eqConfig,
  loadConfig,
  onChangeHandler,
  saveConfig,
} from "./config";

const arbConfig: fc.Arbitrary<Config> = A.make(Config())(fc);

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

  it.prop([arbConfig], { numRuns: 10 })(
    "should always handle changes that creating new config",
    async (config) => {
      const cb = vi.fn();

      fakeBrowser.storage.onChanged.addListener(onChangeHandler(cb));

      await saveConfig(config);

      expect(cb).toHaveBeenCalledWith(config);
    },
  );

  it.prop(
    [
      fc.uniqueArray(arbConfig, {
        minLength: 2,
        maxLength: 2,
        comparator: eqConfig(),
      }),
    ],
    { numRuns: 10 },
  )(
    "should always handle changes that replacing old config",
    async ([oldConfig, newConfig]) => {
      const cb = vi.fn();

      await saveConfig(oldConfig);

      fakeBrowser.storage.onChanged.addListener(onChangeHandler(cb));

      await saveConfig(newConfig);

      expect(cb).toHaveBeenCalledWith(newConfig);
    },
  );

  it.prop([arbConfig], { numRuns: 10 })(
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

describe("createConfigStore", () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it("should persist the config in storage", async () => {
    const defaultValue = CONFIG_SHOW_ALL;
    const expected = CONFIG_HIDE_ALL;

    const [, setConfig] = createConfigStore(defaultValue);

    setConfig(expected);

    await expect(loadConfig(defaultValue)).resolves.toStrictEqual(expected);
  });
});
