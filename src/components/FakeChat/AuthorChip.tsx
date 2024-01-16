import { combineProps } from "@solid-primitives/props";
import { Component, ComponentProps, Show, splitProps } from "solid-js";

import AuthorBadgeRenderer, { AuthorType } from "./AuthorBadgeRenderer";
import styles from "./AuthorChip.module.css";

const AuthorChip: Component<
  {
    "author-type": AuthorType;
    "author-name": string;
    verified?: boolean;
    "is-highlighted"?: boolean;
    "disable-highlighting"?: boolean;
    onClickName?: () => void;
  } & ComponentProps<"div">
> = (props) => {
  const [local, div] = splitProps(props, [
    "author-type",
    "author-name",
    "verified",
  ]);

  return (
    <div {...combineProps({ class: styles.ytLiveChatAuthorChip }, div)}>
      <span id="prepend-chat-badges" />
      <span
        id="author-name"
        class={styles.authorName}
        classList={{
          [styles.member]: local["author-type"] === "member",
          [styles.moderator]: local["author-type"] === "moderator",
          [styles.owner]: local["author-type"] === "owner",
        }}
      >
        <span classList={{ [styles.selectable]: props.onClickName != null }}>
          {local["author-name"]}
        </span>
        <span id="chip-badges" class={styles.chipBadges}>
          <Show when={local["verified"]}>
            <AuthorBadgeRenderer
              class={styles.ytLiveChatAuthorBadgeRenderer}
              data-type="verified"
            />
          </Show>
        </span>
      </span>
      <span id="chat-badges" class={styles.chatBadges}>
        <AuthorBadgeRenderer data-type={local["author-type"]} />
      </span>
    </div>
  );
};

export default AuthorChip;
