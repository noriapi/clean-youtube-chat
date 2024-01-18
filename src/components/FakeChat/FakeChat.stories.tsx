import type { Meta, StoryObj } from "storybook-solidjs";

import FakeChat from "./FakeChat";
import * as ticker from "./TickerRenderer.stories";
import * as text from "./TextMessageRenderer.stories";
import * as paid from "./PaidMessageRenderer.stories";
import * as sticker from "./PaidStickerRenderer.stories";
import * as membership from "./MembershipItemRenderer.stories";

const meta = {
  component: FakeChat,
} satisfies Meta<typeof FakeChat>;

export default meta;
type Story = StoryObj<typeof FakeChat>;

export const Default = {
  args: {
    tickerItems: ticker.Default.args.items,
    chatItems: [
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
    tickerItems: ticker.Clickable.args.items,
    chatItems: [
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
};
