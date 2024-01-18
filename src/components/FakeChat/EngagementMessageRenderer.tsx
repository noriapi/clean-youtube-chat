import { ImYoutube } from "solid-icons/im";
import { Component } from "solid-js";

import styles from "./EngagementMessageRenderer.module.css";

const EngagementMessageRenderer: Component<{
  message?: string;
  onClick?: () => void;
  hide?: boolean;
}> = (props) => {
  return (
    <div
      class={styles.ytLiveChatViewerEngagementMessageRenderer}
      onClick={() => props.onClick?.()}
      classList={{
        [styles.selectable]: props.onClick != null,
        [styles.hidden]: props.hide,
      }}
    >
      <div class={styles.card}>
        <div class={styles.icon}>
          <ImYoutube size={24} />
        </div>
        <div class={styles.content}>
          <span class={styles.message}>{props.message}</span>
        </div>
      </div>
    </div>
  );
};

export default EngagementMessageRenderer;
