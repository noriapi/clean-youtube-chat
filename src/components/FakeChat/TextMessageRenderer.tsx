import { Component } from "solid-js";

import { AuthorType } from "./AuthorBadgeRenderer";
import AuthorChip from "./AuthorChip";
import Avatar from "./Avatar";
import ImageShadow from "./ImageShadow";
import styles from "./TextMessageRenderer.module.css";

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
      <ImageShadow class={styles.authorPhoto}>
        <Avatar name={props["author-name"]} size={24} />
      </ImageShadow>

      <div id="content" class={styles.content}>
        <AuthorChip class={styles.ytLiveChatAuthorChip} {...props} />

        <span id="message" class={styles.message}>
          {props["message"]}
        </span>
      </div>
    </div>
  );
};

export default TextMessageRenderer;
