import "./colors.css";

import { Component } from "solid-js";

import ChatRenderer, { ChatRendererProps } from "./ChatRenderer";
import styles from "./FakeChat.module.css";
import TickerRenderer, { TickerRendererProps } from "./TickerRenderer";

const FakeChat: Component<{
  tickerProps?: TickerRendererProps;
  chatProps?: ChatRendererProps;
}> = (props) => {
  return (
    <div>
      <div id="ticker">
        <TickerRenderer {...props.tickerProps} />
      </div>
      <div class={styles.separator} />
      <div id="chat">
        <ChatRenderer {...props.chatProps} />
      </div>
    </div>
  );
};

export default FakeChat;
