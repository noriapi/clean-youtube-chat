import { ImHappy } from "solid-icons/im";
import { Component } from "solid-js";

import { AuthorType } from "./AuthorBadgeRenderer";
import AuthorChip from "./AuthorChip";
import Avatar from "./Avatar";
import ImageShadow from "./ImageShadow";
import styles from "./PaidStickerRenderer.module.css";

const PaidStickerRenderer: Component<{
  "author-type": AuthorType;
  "author-name": string;
  verified?: boolean;
  "purchase-amount": string;
  "disable-highlighting"?: boolean;
  onClick?: () => void;
  hide?: boolean;
}> = (props) => {
  return (
    <div
      class={styles.ytLiveChatPaidStickerRenderer}
      classList={{
        [styles.selectable]: props.onClick != null,
        [styles.hidden]: props.hide,
      }}
      onClick={() => props.onClick?.()}
    >
      <div class={styles.card}>
        <div class={styles.authorInfo}>
          <ImageShadow class={styles.authorPhoto}>
            <Avatar name={props["author-name"]} size={32} />
          </ImageShadow>
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
          <ImageShadow>
            <ImHappy size={32} class={styles.svgIconSticker} />
          </ImageShadow>
        </div>
      </div>
    </div>
  );
};

export default PaidStickerRenderer;
