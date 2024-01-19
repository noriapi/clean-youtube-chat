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
    hideName?: boolean;
    onClickChipBadge?: () => void;
    hideChipBadge?: boolean;
    onClickChatBadge?: () => void;
    hideChatBadge?: boolean;
    noModeratorColor?: boolean;
  } & ComponentProps<"div">
> = (props) => {
  const [local, div] = splitProps(props, [
    "author-type",
    "author-name",
    "verified",
    "is-highlighted",
    "disable-highlighting",
    "onClickName",
    "hideName",
    "onClickChipBadge",
    "hideChipBadge",
    "onClickChatBadge",
    "hideChatBadge",
    "noModeratorColor",
  ]);

  return (
    <div
      {...combineProps(
        {
          class: styles.ytLiveChatAuthorChip,
          "is-highlighted": local["is-highlighted"],
          "disable-highlighting": local["disable-highlighting"],
        },
        div,
      )}
    >
      <span id="prepend-chat-badges" />
      <span
        id="author-name"
        class={styles.authorName}
        classList={{
          [styles.member]: local["author-type"] === "member",
          [styles.moderator]: local["author-type"] === "moderator",
          [styles.owner]: local["author-type"] === "owner",
          [styles.noModeratorColor]: local.noModeratorColor,
        }}
      >
        <span
          classList={{
            [styles.selectable]: local.onClickName != null,
            [styles.hidden]: local.hideName,
          }}
          onClick={() => local.onClickName?.()}
        >
          {local["author-name"]}
        </span>
        <span id="chip-badges" class={styles.chipBadges}>
          <Show when={local["verified"]}>
            <AuthorBadgeRenderer
              class={styles.ytLiveChatAuthorBadgeRenderer}
              data-type="verified"
              onClick={local.onClickChipBadge}
              hide={local.hideChipBadge}
            />
          </Show>
        </span>
      </span>
      <span id="chat-badges" class={styles.chatBadges}>
        <AuthorBadgeRenderer
          data-type={local["author-type"]}
          onClick={local.onClickChatBadge}
          hide={local.hideChatBadge}
        />
      </span>
    </div>
  );
};

export default AuthorChip;
