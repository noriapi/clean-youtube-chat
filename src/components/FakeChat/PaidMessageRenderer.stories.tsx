import type { Meta, StoryObj } from "storybook-solidjs";
import { action } from "@storybook/addon-actions";

import PaidMessageRenderer from "./PaidMessageRenderer";

const meta = {
  component: PaidMessageRenderer,
} satisfies Meta<typeof PaidMessageRenderer>;

export default meta;
type Story = StoryObj<typeof PaidMessageRenderer>;

export const Default = {
  args: {
    "author-type": "",
    "author-name": "Normal User",
    message: "This is a paid message!",
    "purchase-amount": "$5.00",
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
