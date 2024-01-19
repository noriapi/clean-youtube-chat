import { Component, ComponentProps } from "solid-js";
import { SetStoreFunction, Store } from "solid-js/store";

import { Config } from "~/lib/config";

import FakeChat from "./FakeChat";
import { ChatItemProps } from "./FakeChat/ChatRenderer";

const toggleSH = (s: "show" | "hide") => (s === "show" ? "hide" : "show");
const toggleSNH = (s: "show" | "nohighlight" | "hide") => {
  switch (s) {
    case "show":
      return "nohighlight";
    case "nohighlight":
      return "hide";
    case "hide":
      return "show";
  }
};

// TODO: Ticker is not implemented yet
//
// const createTickerProps = (
//   config: Store<Config>,
//   setConfig: SetStoreFunction<Config>,
// ) =>
//   ({
//     items: [
//       { "author-name": "Alice" },
//       { "author-name": "Bob" },
//       { "author-name": "Chris" },
//     ],
//     get hide() {
//       return false;
//     },
//     onClick: undefined,
//   }) satisfies TickerRendererProps;

const createChatItemEngagement = (
  config: Store<Config>,
  setConfig: SetStoreFunction<Config>,
) =>
  ({
    type: "engagement",
    props: {
      message: "This is an engagement message!",

      get hide() {
        return config.engagement === "hide";
      },

      onClick: () => setConfig("engagement", toggleSH),
    },
  }) satisfies ChatItemProps;

const createChatItemNormalUser = (
  config: Store<Config>,
  setConfig: SetStoreFunction<Config>,
) =>
  ({
    type: "text",
    props: {
      "author-type": "",
      "author-name": "Normal User",
      message: "Hello!",

      get hideIcon() {
        return config.icon.others === "hide";
      },
      get hideName() {
        return config.name.others === "hide";
      },
      hideChipBadge: false,
      hideChatBadge: false,
      hideMessage: false,

      onClickIcon: () => setConfig("icon", "others", toggleSH),
      onClickName: () => setConfig("name", "others", toggleSH),
      onClickChipBadge: undefined,
      onClickChatBadge: undefined,
      onClickMessage: undefined,
    },
  }) satisfies ChatItemProps;

// TODO: Verified User is not implemented yet
//
// const createChatItemVerifiedUser = (
//   config: Store<Config>,
//   setConfig: SetStoreFunction<Config>,
// ) =>
//   ({
//     type: "text",
//     props: {
//       "author-type": "",
//       "author-name": "Verified User",
//       verified: true,
//       message: "Hello!",
//       "is-highlighted": true,
//
//       hideIcon: false,
//       hideName: false,
//       hideChipBadge: false,
//       hideChatBadge: false,
//       hideMessage: false,
//
//       onClickIcon: undefined,
//       onClickName: undefined,
//       onClickChipBadge: undefined,
//       onClickChatBadge: undefined,
//       onClickMessage: undefined,
//     },
//   }) satisfies ChatItemProps;

// TODO: Member is not implemented yet
//
// const createChatItemMember = (
//   config: Store<Config>,
//   setConfig: SetStoreFunction<Config>,
// ) =>
//   ({
//     type: "text",
//     props: {
//       "author-type": "member",
//       "author-name": "Member",
//       message: "Hi there!",
//
//       hideIcon: false,
//       hideName: false,
//       hideChipBadge: false,
//       hideChatBadge: false,
//       hideMessage: false,
//
//       onClickIcon: undefined,
//       onClickName: undefined,
//       onClickChipBadge: undefined,
//       onClickChatBadge: undefined,
//       onClickMessage: undefined,
//     },
//   }) satisfies ChatItemProps;

const createChatItemModerator = (
  config: Store<Config>,
  setConfig: SetStoreFunction<Config>,
) =>
  ({
    type: "text",
    props: {
      "author-type": "moderator",
      "author-name": "Moderator",
      message: "Howdy!",

      get hideIcon() {
        return config.icon.moderator === "hide";
      },
      get hideName() {
        return config.name.moderator === "hide";
      },
      get hideChatBadge() {
        return config.badge.moderator === "hide";
      },
      get noModeratorColor() {
        return config.name.moderator === "nohighlight";
      },
      hideChipBadge: false,
      hideMessage: false,

      onClickIcon: () => setConfig("icon", "moderator", toggleSH),
      onClickName: () => setConfig("name", "moderator", toggleSNH),
      onClickChipBadge: undefined,
      onClickChatBadge: () => setConfig("badge", "moderator", toggleSH),
      onClickMessage: undefined,
    },
  }) satisfies ChatItemProps;

const createChatItemOwner = (
  config: Store<Config>,
  setConfig: SetStoreFunction<Config>,
) =>
  ({
    type: "text",
    props: {
      "author-type": "owner",
      "author-name": "Channel Owner",
      message: "Hey, guys!",

      get "is-highlighted"() {
        return config.name.owner === "show" ? true : undefined;
      },
      get hideIcon() {
        return config.icon.owner === "hide";
      },
      get hideName() {
        return config.name.owner === "hide";
      },
      hideChipBadge: false,
      hideChatBadge: false,
      hideMessage: false,

      onClickIcon: () => setConfig("icon", "owner", toggleSH),
      onClickName: () => setConfig("name", "owner", toggleSNH),
      onClickChipBadge: undefined,
      onClickChatBadge: undefined,
      onClickMessage: undefined,
    },
  }) satisfies ChatItemProps;

const createChatItemPaid = (
  config: Store<Config>,
  setConfig: SetStoreFunction<Config>,
) =>
  ({
    type: "paid",
    props: {
      "author-type": "",
      "author-name": "Normal User",
      message: "This is a paid message!",
      "purchase-amount": "$5.00",
      "disable-highlighting": true,
      get hide() {
        return config.superchat === "hide";
      },
      onClick: () => setConfig("superchat", toggleSH),
    },
  }) satisfies ChatItemProps;

const createChatItemSticker = (
  config: Store<Config>,
  setConfig: SetStoreFunction<Config>,
) =>
  ({
    type: "sticker",
    props: {
      "author-type": "",
      "author-name": "Normal User",
      "purchase-amount": "$1.00",
      "disable-highlighting": true,
      get hide() {
        return config.sticker === "hide";
      },
      onClick: () => setConfig("sticker", toggleSH),
    },
  }) satisfies ChatItemProps;

const createChatItemMembership = (
  config: Store<Config>,
  setConfig: SetStoreFunction<Config>,
) =>
  ({
    type: "membership",
    props: {
      "author-type": "member",
      "author-name": "Member",
      "header-primary-text": "Member for 7 months",
      "header-subtext": "Step 1",
      message: "This is a member milestone chat!",
      get hide() {
        return config.memberChat === "hide";
      },
      onClick: () => setConfig("memberChat", toggleSH),
    },
  }) satisfies ChatItemProps;

const createFakeChatProps = (
  config: Store<Config>,
  setConfig: SetStoreFunction<Config>,
) =>
  ({
    // tickerProps: createTickerProps(config, setConfig),
    chatProps: {
      items: [
        createChatItemEngagement(config, setConfig),
        createChatItemNormalUser(config, setConfig),
        createChatItemModerator(config, setConfig),
        createChatItemOwner(config, setConfig),
        createChatItemPaid(config, setConfig),
        createChatItemSticker(config, setConfig),
        createChatItemMembership(config, setConfig),
      ],
    },
  }) satisfies ComponentProps<typeof FakeChat>;

const WysiwygConfigInput: Component<{
  value: Store<Config>;
  setValue: SetStoreFunction<Config>;
}> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const fakeChatProps = createFakeChatProps(props.value, props.setValue);

  return <FakeChat {...fakeChatProps} />;
};

export default WysiwygConfigInput;
