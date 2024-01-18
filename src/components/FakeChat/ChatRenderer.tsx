import { Component, ComponentProps, For, Match, Switch } from "solid-js";

import EngagementMessageRenderer from "./EngagementMessageRenderer";
import MembershipItemRenderer from "./MembershipItemRenderer";
import PaidMessageRenderer from "./PaidMessageRenderer";
import PaidStickerRenderer from "./PaidStickerRenderer";
import TextMessageRenderer from "./TextMessageRenderer";

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

const ChatRenderer: Component<{ items?: ChatItemProps[] }> = (props) => {
  return (
    <div id="items">
      <For each={props.items}>{(item) => <ChatItemRenderer {...item} />}</For>
    </div>
  );
};

export type ChatRendererProps = ComponentProps<typeof ChatRenderer>;

export default ChatRenderer;
