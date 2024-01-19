import { Component } from "solid-js";

import { generateHSL, HSLRange, HSLtoString } from "~/lib/randomAvatar";

import styles from "./Avatar.module.css";

const Avatar: Component<{ name: string; size: number }> = (props) => {
  const range = {
    h: [0, 360],
    s: [0, 100],
    l: [35, 85],
  } satisfies HSLRange;

  const background = () => HSLtoString(generateHSL(props.name, range));

  return (
    <div
      class={styles.avatar}
      style={{
        background: background(),
        width: `${props.size}px`,
        height: `${props.size}px`,
        "line-height": `${props.size}px`,
      }}
    >
      {props.name.slice(0, 1)}
    </div>
  );
};

export default Avatar;
