import "./colors.css";

import { Component, ComponentProps, For, Match, Switch } from "solid-js";

import EngagementMessageRenderer from "./EngagementMessageRenderer";
import styles from "./FakeChat.module.css";
import MembershipItemRenderer from "./MembershipItemRenderer";
import PaidMessageRenderer from "./PaidMessageRenderer";
import PaidStickerRenderer from "./PaidStickerRenderer";
import TextMessageRenderer from "./TextMessageRenderer";
import TickerRenderer, { TickerRendererProps } from "./TickerRenderer";

export type ChatItemProps =
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
    }
  | {
      type: "engagement";
      props: ComponentProps<typeof EngagementMessageRenderer>;
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
      <Match when={props.type === "engagement" && props.props}>
        {(p) => <EngagementMessageRenderer {...p()} />}
      </Match>
    </Switch>
  );
};

const FakeChat: Component<{
  tickerProps?: TickerRendererProps;
  chatItems?: ChatItemProps[];
}> = (props) => {
  return (
    <div>
      <div id="ticker">
        <TickerRenderer {...props.tickerProps} />
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
