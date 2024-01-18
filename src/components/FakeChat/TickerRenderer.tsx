import { Component, ComponentProps, For } from "solid-js";

import Avatar from "./Avatar";
import ImageShadow from "./ImageShadow";
import styles from "./TickerRenderer.module.css";

const TickerPaidMessageItemRenderer: Component<{ "author-name": string }> = (
  props,
) => {
  return (
    <div class={styles.ytLiveChatTickerPaidMessageItemRenderer}>
      <div class={styles.container}>
        <div class={styles.content}>
          <ImageShadow class={styles.ytImageShadow}>
            <Avatar name={props["author-name"]} size={24} />
          </ImageShadow>
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

export type TickerItemProps = ComponentProps<
  typeof TickerPaidMessageItemRenderer
>;

const TickerRenderer: Component<{
  items?: TickerItemProps[];
  onClick?: () => void;
  hide?: boolean;
}> = (props) => {
  return (
    <div
      class={styles.ytLiveChatTickerRenderer}
      classList={{
        [styles.selectable]: props.onClick != null,
        [styles.hidden]: props.hide,
      }}
      onClick={() => props.onClick?.()}
    >
      <div class={styles.items}>
        <For each={props.items}>
          {(item) => <TickerPaidMessageItemRenderer {...item} />}
        </For>
      </div>
    </div>
  );
};

export type TickerRendererProps = ComponentProps<typeof TickerRenderer>;
export default TickerRenderer;
