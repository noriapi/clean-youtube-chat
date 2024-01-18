import "./colors.css";

import { Component, ComponentProps, For, Match, Switch } from "solid-js";

import styles from "./FakeChat.module.css";
import MembershipItemRenderer from "./MembershipItemRenderer";
import PaidMessageRenderer from "./PaidMessageRenderer";
import PaidStickerRenderer from "./PaidStickerRenderer";
import TextMessageRenderer from "./TextMessageRenderer";
import TickerRenderer, { TickerItemProps } from "./TickerRenderer";

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

const FakeChat: Component<{
  tickerItems?: TickerItemProps[];
  chatItems?: ChatItemProps[];
}> = (props) => {
  return (
    <div>
      <div id="ticker">
        <TickerRenderer items={props.tickerItems ?? []} />
      </div>
      <div class={styles.separator} />
      <div id="chat">
        <div id="items">
          <For each={props.chatItems}>
            {(item) => <ChatItemRenderer {...item} />}
          </For>
        </div>
      </div>
    </div>
  );
};

export default FakeChat;
