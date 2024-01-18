import type { Meta, StoryObj } from "storybook-solidjs";
import { action } from "@storybook/addon-actions";

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
  },
} satisfies Story;

export const Clickable = {
  args: {
    ...Default.args,
    onClick: action("on-click"),
  },
} satisfies Story;
