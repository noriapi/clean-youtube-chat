import type { ComponentProps } from "solid-js";
import { createStore } from "solid-js/store";
import type { Meta, StoryObj } from "storybook-solidjs";

import { type Config } from "~/lib/config";

import WysiwygConfigInput from "./WysiwygConfigInput";

type Props = ComponentProps<typeof WysiwygConfigInput> & {
  initialValue: Config;
};

const meta = {
  component: WysiwygConfigInput,
  render: (props) => {
    const [config, setConfig] = createStore<Config>(props.initialValue);

    return <WysiwygConfigInput value={config} setValue={setConfig} />;
  },
} satisfies Meta<Props>;

export default meta;
type Story = StoryObj<Props>;

export const Default = {
  args: {
    initialValue: {
      chat: {
        owner: "show",
        moderator: "show",
        others: "show",
      },
      name: {
        owner: "show",
        moderator: "show",
        others: "show",
      },
      icon: {
        owner: "show",
        moderator: "show",
        others: "show",
      },
      badge: {
        moderator: "show",
      },
      superchat: "show",
      sticker: "show",
      superchatBar: "show",
      memberChat: "show",
      engagement: "show",
    },
  },
} satisfies Story;
