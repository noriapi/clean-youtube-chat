import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "storybook-solidjs";

import PaidStickerRenderer from "./PaidStickerRenderer";

const meta = {
  component: PaidStickerRenderer,
} satisfies Meta<typeof PaidStickerRenderer>;

export default meta;
type Story = StoryObj<typeof PaidStickerRenderer>;

export const Default = {
  args: {
    "author-type": "",
    "author-name": "Normal User",
    "purchase-amount": "$1.00",
    "disable-highlighting": true,
    hide: false,
  },
} satisfies Story;

export const Clickable = {
  args: {
    ...Default.args,
    onClick: action("on-click"),
  },
} satisfies Story;
