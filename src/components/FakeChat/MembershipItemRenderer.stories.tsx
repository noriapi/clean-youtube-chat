import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "storybook-solidjs";

import MembershipItemRenderer from "./MembershipItemRenderer";

const meta = {
  component: MembershipItemRenderer,
} satisfies Meta<typeof MembershipItemRenderer>;

export default meta;
type Story = StoryObj<typeof MembershipItemRenderer>;

export const Default = {
  args: {
    "author-type": "member",
    "author-name": "Member",
    "header-primary-text": "Member for 7 months",
    "header-subtext": "Step 1",
    message: "This is a member milestone chat!",
    hide: false,
  },
} satisfies Story;

export const Clickable = {
  args: {
    ...Default.args,
    onClick: action("on-click"),
  },
} satisfies Story;
