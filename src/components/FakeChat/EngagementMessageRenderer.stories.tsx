import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "storybook-solidjs";

import EngagementMessageRenderer from "./EngagementMessageRenderer";

const meta = {
  component: EngagementMessageRenderer,
} satisfies Meta<typeof EngagementMessageRenderer>;

export default meta;
type Story = StoryObj<typeof EngagementMessageRenderer>;

export const Default = {
  args: {
    message: "This is an engagement message!",
    hide: false,
  },
} satisfies Story;

export const Clickable = {
  args: {
    ...Default.args,
    onClick: action("on-click"),
  },
} satisfies Story;
