import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "storybook-solidjs";

import TextMessageRenderer from "./TextMessageRenderer";

const meta = {
  component: TextMessageRenderer,
} satisfies Meta<typeof TextMessageRenderer>;

export default meta;
type Story = StoryObj<typeof TextMessageRenderer>;

export const Clickable = {
  args: {
    onClickIcon: action("on-click-icon"),
    onClickName: action("on-click-name"),
    onClickChipBadge: action("on-click-chip-badge"),
    onClickChatBadge: action("on-click-chat-badge"),
    onClickMessage: action("on-click-message"),
  },
} satisfies Story;

export const ShowAll = {
  args: {
    hideIcon: false,
    hideName: false,
    hideChipBadge: false,
    hideChatBadge: false,
    hideMessage: false,
  },
} satisfies Story;

export const NormalUser = {
  args: {
    ...ShowAll.args,
    "author-type": "",
    "author-name": "Normal User",
    message: "Hello!",
  },
} satisfies Story;

export const ClickableNormalUser = {
  args: { ...NormalUser.args, ...Clickable.args },
} satisfies Story;

export const VerifiedUser = {
  args: {
    ...ShowAll.args,
    "author-type": "",
    "author-name": "Verified User",
    verified: true,
    message: "Hello!",
    "is-highlighted": true,
  },
} satisfies Story;

export const ClickableVerifiedUser = {
  args: { ...VerifiedUser.args, ...Clickable.args },
} satisfies Story;

export const Member = {
  args: {
    ...ShowAll.args,
    "author-type": "member",
    "author-name": "Member",
    message: "Hi there!",
  },
} satisfies Story;

export const ClickableMember = {
  args: { ...Member.args, ...Clickable.args },
} satisfies Story;

export const Moderator = {
  args: {
    ...ShowAll.args,
    "author-type": "moderator",
    "author-name": "Moderator",
    message: "Howdy!",
    noModeratorColor: false,
  },
} satisfies Story;

export const ClickableModerator = {
  args: { ...Moderator.args, ...Clickable.args },
} satisfies Story;

export const Owner = {
  args: {
    ...ShowAll.args,
    "author-type": "owner",
    "author-name": "Channel Owner",
    message: "Hey, guys!",
    "is-highlighted": true,
  },
} satisfies Story;

export const ClickableOwner = {
  args: { ...Owner.args, ...Clickable.args },
} satisfies Story;
