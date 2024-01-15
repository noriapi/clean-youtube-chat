import { Component } from "solid-js";

import { AuthorType } from "./AuthorBadgeRenderer";
import AuthorChip from "./AuthorChip";
import Avatar from "./Avatar";
import ImageShadow from "./ImageShadow";
import styles from "./PaidMessageRenderer.module.css";

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
          <ImageShadow class={styles.authorPhoto}>
            <Avatar name={props["author-name"]} size={32} />
          </ImageShadow>
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
          <div id="message">{props.message}</div>
        </div>
      </div>
    </div>
  );
};

export default PaidMessageRenderer;
