import "./colors.css";

import { Component, ComponentProps, For, Match, Switch } from "solid-js";

import styles from "./FakeChat.module.css";
import MembershipItemRenderer from "./MembershipItemRenderer";
import PaidMessageRenderer from "./PaidMessageRenderer";
import PaidStickerRenderer from "./PaidStickerRenderer";
import TextMessageRenderer from "./TextMessageRenderer";
import TickerRenderer, {
  DEFAULT_TICKER_ITEMS,
  TickerItemProps,
} from "./TickerRenderer";

type ChatItemProps =
  | {
      type: "text";
      props: ComponentProps<typeof TextMessageRenderer>;
    }
  | {
      type: "paid";
      props: ComponentProps<typeof PaidMessageRenderer>;
    }
  | {
      type: "sticker";
      props: ComponentProps<typeof PaidStickerRenderer>;
    }
  | {
      type: "membership";
      props: ComponentProps<typeof MembershipItemRenderer>;
    };

const ChatItemRenderer: Component<ChatItemProps> = (props) => {
  return (
    <Switch>
      <Match when={props.type === "text" && props.props}>
        {(p) => <TextMessageRenderer {...p()} />}
      </Match>
      <Match when={props.type === "paid" && props.props}>
        {(p) => <PaidMessageRenderer {...p()} />}
      </Match>
      <Match when={props.type === "sticker" && props.props}>
        {(p) => <PaidStickerRenderer {...p()} />}
      </Match>
      <Match when={props.type === "membership" && props.props}>
        {(p) => <MembershipItemRenderer {...p()} />}
      </Match>
    </Switch>
  );
};

const DEFAULT_CHAT_ITEMS = [
  {
    type: "text",
    props: {
      "author-type": "",
      "author-name": "Normal User",
      message: "Hello!",
    },
  },
  {
    type: "text",
    props: {
      "author-type": "",
      "author-name": "Verified User",
      verified: true,
      message: "Hello!",
      "is-highlighted": true,
    },
  },
  {
    type: "text",
    props: {
      "author-type": "member",
      "author-name": "Member",
      message: "Hi there!",
    },
  },
  {
    type: "text",
    props: {
      "author-type": "moderator",
      "author-name": "Moderator",
      message: "Howdy!",
    },
  },
  {
    type: "text",
    props: {
      "author-type": "owner",
      "author-name": "Channel Owner",
      message: "Hey, guys!",
      "is-highlighted": true,
    },
  },
  {
    type: "paid",
    props: {
      "author-type": "",
      "author-name": "Normal User",
      message: "This is a paid message!",
      "purchase-amount": "$5.00",
      "disable-highlighting": true,
    },
  },
  {
    type: "sticker",
    props: {
      "author-type": "",
      "author-name": "Normal User",
      "purchase-amount": "$1.00",
      "disable-highlighting": true,
    },
  },
  {
    type: "membership",
    props: {
      "author-type": "member",
      "author-name": "Member",
      "header-primary-text": "Member for 7 months",
      "header-subtext": "Step 1",
      message: "This is a member milestone chat!",
    },
  },
] satisfies ChatItemProps[];

const FakeChat: Component<{
  onClickTicker?: () => void;
  tickerItems?: TickerItemProps[];
  chatItems?: ChatItemProps[];
}> = (props) => {
  return (
    <div class={styles.ytLiveChatRenderer}>
      <div id="ticker">
        <TickerRenderer items={props.tickerItems ?? DEFAULT_TICKER_ITEMS} />
      </div>
      <div class={styles.separator} />
      <div id="chat">
        <div id="items">
          <For each={props.chatItems ?? DEFAULT_CHAT_ITEMS}>
            {(item) => <ChatItemRenderer {...item} />}
          </For>
        </div>
      </div>
    </div>
  );
};

export default FakeChat;
