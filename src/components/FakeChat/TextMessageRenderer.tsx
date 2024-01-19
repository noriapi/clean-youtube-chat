import { Component, createMemo, createSignal } from "solid-js";

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
  onClickIcon?: () => void;
  hideIcon?: boolean;
  onClickName?: () => void;
  hideName?: boolean;
  onClickChipBadge?: () => void;
  hideChipBadge?: boolean;
  onClickChatBadge?: () => void;
  hideChatBadge?: boolean;
  onClickMessage?: () => void;
  hideMessage?: boolean;
}> = (props) => {
  const [hoveringMessage, setHoveringMessage] = createSignal(false);
  const [hoveringRest, setHoveringRest] = createSignal(false);
  const hoveringMessageArea = createMemo(
    () => hoveringMessage() || hoveringRest(),
  );

  return (
    <div
      class={styles.ytLiveChatTextMessageRenderer}
      classList={{
        [styles.selectableHovering]: hoveringMessageArea(),
      }}
      author-type={props["author-type"]}
    >
      <ImageShadow
        class={styles.authorPhoto}
        classList={{
          [styles.selectable]: props.onClickIcon != null,
          [styles.hidden]: props.hideIcon,
        }}
        onClick={props.onClickIcon}
      >
        <Avatar name={props["author-name"]} size={24} />
      </ImageShadow>

      <div id="content" class={styles.content}>
        <AuthorChip class={styles.ytLiveChatAuthorChip} {...props} />

        <span
          id="message"
          class={styles.message}
          classList={{
            [styles.selectableNoHover]: props.onClickMessage != null,
            [styles.hidden]: props.hideMessage,
          }}
          onClick={() => props.onClickMessage?.()}
          onMouseEnter={() => setHoveringMessage(true)}
          onMouseLeave={() => setHoveringMessage(false)}
        >
          {props["message"]}
        </span>
      </div>

      <div
        class={styles.restArea}
        classList={{
          [styles.selectableNoHover]: props.onClickMessage != null,
        }}
        onClick={() => props.onClickMessage?.()}
        onMouseEnter={() => setHoveringRest(true)}
        onMouseLeave={() => setHoveringRest(false)}
      />
    </div>
  );
};

export default TextMessageRenderer;
