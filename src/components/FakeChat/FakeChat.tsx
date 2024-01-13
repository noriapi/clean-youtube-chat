import { ImCheckmark, ImHappy, ImSphere, ImWrench } from "solid-icons/im";
import { Component, ComponentProps, For, Match, Show, Switch } from "solid-js";

import Avatar from "./Avatar";
import styles from "./FakeChat.module.css";

type AuthorType = "" | "member" | "moderator" | "owner";

const authorBadgeFromType = (type?: AuthorType | "verified") => {
  switch (type) {
    case "member":
      return ImSphere;
    case "moderator":
      return ImWrench;
    case "verified":
      return ImCheckmark;
    default:
      return;
  }
};

const AuthorBadgeRenderer: Component<{ type?: AuthorType | "verified" }> = (
  props,
) => {
  const Icon = () => authorBadgeFromType(props.type);

  return (
    <Show when={Icon()} keyed>
      {(Icon) => (
        <div
          class={styles.ytLiveChatAuthorBadgeRenderer}
          data-type={props.type}
        >
          <div id="image">
            <Icon size={16} />
          </div>
        </div>
      )}
    </Show>
  );
};

const AuthorChip: Component<{
  "author-type": AuthorType;
  "author-name": string;
  verified?: boolean;
  "is-highlighted"?: boolean;
  "disable-highlighting"?: boolean;
}> = (props) => {
  return (
    <div
      class={styles.ytLiveChatAuthorChip}
      is-highlighted={props["is-highlighted"]}
      disable-highlighting={props["disable-highlighting"]}
    >
      <span id="prepend-chat-badges" />
      <span
        id="author-name"
        class={styles.authorName}
        classList={{
          [styles.member]: props["author-type"] === "member",
          [styles.moderator]: props["author-type"] === "moderator",
          [styles.owner]: props["author-type"] === "owner",
        }}
      >
        {props["author-name"]}
        <span id="chip-badges" class={styles.chipBadges}>
          <Show when={props["verified"]}>
            <AuthorBadgeRenderer type="verified" />
          </Show>
        </span>
      </span>
      <span id="chat-badges" class={styles.chatBadges}>
        <AuthorBadgeRenderer type={props["author-type"]} />
      </span>
    </div>
  );
};

const TextMessageRenderer: Component<{
  "author-type": AuthorType;
  "author-name": string;
  verified?: boolean;
  message: string;
  "is-highlighted"?: boolean;
}> = (props) => {
  return (
    <div
      class={styles.ytLiveChatTextMessageRenderer}
      author-type={props["author-type"]}
    >
      <div class={styles.ytImageShadow} id="author-photo">
        <Avatar name={props["author-name"]} size={24} />
      </div>

      <div id="content" class={styles.content}>
        <AuthorChip {...props} />

        <span id="message" class={styles.message}>
          {props["message"]}
        </span>
      </div>
    </div>
  );
};

const PaidMessageRenderer: Component<{
  "author-type": AuthorType;
  "author-name": string;
  verified?: boolean;
  message: string;
  "purchase-amount": string;
  "disable-highlighting"?: boolean;
}> = (props) => {
  return (
    <div class={styles.ytLiveChatPaidMessageRenderer}>
      <div class={styles.card}>
        <div class={styles.header}>
          <div class={styles.ytImageShadow}>
            <Avatar name={props["author-name"]} size={32} />
          </div>
          <div class={styles.headerContent}>
            <div class={styles.headerContentPrimaryColumn}>
              <div class={styles.singleLine}>
                <div id="author-name-chip">
                  <AuthorChip disable-highlighting {...props} />
                </div>
                <div class={styles.purchaseAmountColumn}>
                  <div id="purchase-amount">
                    <span>{props["purchase-amount"]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class={styles.content}>
          <div class={styles.message}>{props.message}</div>
        </div>
      </div>
    </div>
  );
};

const PaidStickerRenderer: Component<{
  "author-type": AuthorType;
  "author-name": string;
  verified?: boolean;
  "purchase-amount": string;
  "disable-highlighting"?: boolean;
}> = (props) => {
  return (
    <div class={styles.ytLiveChatPaidStickerRenderer}>
      <div class={styles.card}>
        <div class={styles.authorInfo}>
          <div class={styles.ytImageShadow}>
            <Avatar name={props["author-name"]} size={32} />
          </div>
          <div class={styles.content}>
            <div class={styles.contentPrimaryColumn}>
              <div class={styles.authorNameChip}>
                <AuthorChip disable-highlighting {...props} />
              </div>
              <span class={styles.priceColumn}>
                <span class={styles.purchaseAmountChip}>
                  {props["purchase-amount"]}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class={styles.stickerContainer}>
          <div class={styles.ytImageShadow}>
            <ImHappy size={32} class={styles.svgIconSticker} />
          </div>
        </div>
      </div>
    </div>
  );
};

const MembershipItemRenderer: Component<{
  "author-type": AuthorType;
  "author-name": string;
  verified?: boolean;
  "disable-highlighting"?: boolean;
  "header-primary-text": string;
  "header-subtext": string;
  message: string;
}> = (props) => {
  return (
    <div
      class={styles.ytLiveChatMembershipItemRenderer}
      has-primary-header-text
    >
      <div class={styles.card}>
        <div class={styles.header}>
          <div
            classList={{
              [styles.authorPhoto]: true,
              [styles.ytImageShadow]: true,
            }}
          >
            <Avatar name={props["author-name"]} size={40} />
          </div>
          <div class={styles.headerContent}>
            <div class={styles.headerContentPrimaryColumn}>
              <div id="header-content-inner-column">
                <AuthorChip {...props} />
                <div class={styles.headerPrimaryText}>
                  {props["header-primary-text"]}
                </div>
              </div>
              <div class={styles.headerSubtext}>{props["header-subtext"]}</div>
            </div>
          </div>
        </div>
        <div class={styles.content}>
          <div class={styles.message}>{props["message"]}</div>
        </div>
      </div>
    </div>
  );
};

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

const TickerPaidMessageItemRenderer: Component<{ "author-name": string }> = (
  props,
) => {
  return (
    <div class={styles.ytLiveChatTickerPaidMessageItemRenderer}>
      <div class={styles.container}>
        <div class={styles.content}>
          <div
            classList={{
              [styles.authorPhoto]: true,
              [styles.ytImageShadow]: true,
            }}
          >
            <Avatar name={props["author-name"]} size={24} />
          </div>
          <div id="animation-container">
            <div class={styles.text}>
              <span>{props["author-name"]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type TickerItemProps = ComponentProps<typeof TickerPaidMessageItemRenderer>;

const TickerRenderer: Component<{
  items: TickerItemProps[];
}> = (props) => {
  return (
    <div class={styles.ytLiveChatTickerRenderer}>
      <div class={styles.items}>
        <For each={props.items}>
          {(item) => <TickerPaidMessageItemRenderer {...item} />}
        </For>
      </div>
    </div>
  );
};

const DEFAULT_TICKER_ITEMS = [
  { "author-name": "Alice" },
  { "author-name": "Bob" },
  { "author-name": "Chris" },
] satisfies TickerItemProps[];

const FakeChat: Component<{
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
