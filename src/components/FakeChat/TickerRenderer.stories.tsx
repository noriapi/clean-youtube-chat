import type { Meta, StoryObj } from "storybook-solidjs";
import TickerRenderer from "./TickerRenderer";
import { action } from "@storybook/addon-actions";

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
  },
} satisfies Story;

export const Clickable = {
  args: {
    items: Default.args.items,
    onClick: action("on-click"),
  },
} satisfies Story;
