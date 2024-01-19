import type { Meta, StoryObj } from "storybook-solidjs";

import ChatRenderer from "./ChatRenderer";
import * as engagement from "./EngagementMessageRenderer.stories";
import * as membership from "./MembershipItemRenderer.stories";
import * as paid from "./PaidMessageRenderer.stories";
import * as sticker from "./PaidStickerRenderer.stories";
import * as text from "./TextMessageRenderer.stories";

const meta = {
  component: ChatRenderer,
} satisfies Meta<typeof ChatRenderer>;

export default meta;
type Story = StoryObj<typeof ChatRenderer>;

export const Default = {
  args: {
    items: [
      { type: "engagement", props: engagement.Default.args },
      { type: "text", props: text.NormalUser.args },
      { type: "text", props: text.VerifiedUser.args },
      { type: "text", props: text.Member.args },
      { type: "text", props: text.Moderator.args },
      { type: "text", props: text.Owner.args },
      { type: "paid", props: paid.Default.args },
      { type: "sticker", props: sticker.Default.args },
      { type: "membership", props: membership.Default.args },
    ],
  },
} satisfies Story;

export const Clickable = {
  args: {
    items: [
      { type: "engagement", props: engagement.Clickable.args },
      { type: "text", props: text.ClickableNormalUser.args },
      { type: "text", props: text.ClickableVerifiedUser.args },
      { type: "text", props: text.ClickableMember.args },
      { type: "text", props: text.ClickableModerator.args },
      { type: "text", props: text.ClickableOwner.args },
      { type: "paid", props: paid.Clickable.args },
      { type: "sticker", props: sticker.Clickable.args },
      { type: "membership", props: membership.Clickable.args },
    ],
  },
} satisfies Story;
