import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "storybook-solidjs";

import TickerRenderer from "./TickerRenderer";

const meta = {
  component: TickerRenderer,
} satisfies Meta<typeof TickerRenderer>;

export default meta;
type Story = StoryObj<typeof TickerRenderer>;

export const Default = {
  args: {
    items: [
      { "author-name": "Alice" },
      { "author-name": "Bob" },
      { "author-name": "Chris" },
    ],
    hide: false,
  },
} satisfies Story;

export const Clickable = {
  args: {
    ...Default.args,
    onClick: action("on-click"),
  },
} satisfies Story;
