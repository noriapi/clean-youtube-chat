import { combineProps } from "@solid-primitives/props";
import { ComponentProps, ParentComponent } from "solid-js";

import styles from "./ImageShadow.module.css";

const ImageShadow: ParentComponent<ComponentProps<"div">> = (props) => {
  return <div {...combineProps({ class: styles.ytImgShadow }, props)} />;
};

export default ImageShadow;
