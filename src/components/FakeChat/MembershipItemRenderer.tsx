import { Component } from "solid-js";

import { AuthorType } from "./AuthorBadgeRenderer";
import AuthorChip from "./AuthorChip";
import Avatar from "./Avatar";
import ImageShadow from "./ImageShadow";
import styles from "./MembershipItemRenderer.module.css";

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
          <ImageShadow class={styles.authorPhoto}>
            <Avatar name={props["author-name"]} size={40} />
          </ImageShadow>
          <div class={styles.headerContent}>
            <div id="header-content-primary-column">
              <div id="header-content-inner-column">
                <AuthorChip class={styles.ytLiveChatAuthorChip} {...props} />
                <div class={styles.headerPrimaryText}>
                  {props["header-primary-text"]}
                </div>
              </div>
              <div class={styles.headerSubtext}>{props["header-subtext"]}</div>
            </div>
          </div>
        </div>
        <div class={styles.content}>
          <div id="message">{props["message"]}</div>
        </div>
      </div>
    </div>
  );
};

export default MembershipItemRenderer;
