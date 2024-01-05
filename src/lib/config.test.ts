import { fc, it } from "@fast-check/vitest";
import { describe, expect } from "vitest";

import { getClassNames } from "~/entrypoints/content";

import { classNames, Config } from "./config";

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
