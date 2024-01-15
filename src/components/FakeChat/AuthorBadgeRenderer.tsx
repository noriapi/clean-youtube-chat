import { combineProps } from "@solid-primitives/props";
import { ImCheckmark, ImSphere, ImWrench } from "solid-icons/im";
import { Component, Show } from "solid-js";

import styles from "./AuthorBadgeRenderer.module.css";

export type AuthorType = "" | "member" | "moderator" | "owner";

const authorBadgeFromType = (type?: AuthorType | "verified") => {
  switch (type) {
    case "member":
      return ImSphere;
    case "moderator":
      return ImWrench;
    case "verified":
      return ImCheckmark;
    default:
      return;
  }
};

const AuthorBadgeRenderer: Component<
  {
    ["data-type"]?: AuthorType | "verified";
  } & Omit<ComponentProps<"div">, "data-type">
> = (props) => {
  const Icon = () => authorBadgeFromType(props["data-type"]);

  return (
    <Show when={Icon()} keyed>
      {(Icon) => (
        <div
          {...combineProps(
            {
              class: styles.ytLiveChatAuthorBadgeRenderer,
            },
            props,
          )}
        >
          <div id="image">
            <Icon size={16} />
          </div>
        </div>
      )}
    </Show>
  );
};

export default AuthorBadgeRenderer;
