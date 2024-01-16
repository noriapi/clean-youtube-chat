import type { Meta, StoryObj } from "storybook-solidjs";

import FakeChat from "./FakeChat";

const meta = {
  component: FakeChat,
} satisfies Meta<typeof FakeChat>;

export default meta;
type Story = StoryObj<typeof FakeChat>;

export const Default: Story = {
  args: {
    chatItems: [
      {
        type: "text",
        props: {
          "author-type": "",
          "author-name": "Normal User",
          message: "Hello!",
        },
      },
      {
        type: "text",
        props: {
          "author-type": "",
          "author-name": "Verified User",
          verified: true,
          message: "Hello!",
          "is-highlighted": true,
        },
      },
      {
        type: "text",
        props: {
          "author-type": "member",
          "author-name": "Member",
          message: "Hi there!",
        },
      },
      {
        type: "text",
        props: {
          "author-type": "moderator",
          "author-name": "Moderator",
          message: "Howdy!",
        },
      },
      {
        type: "text",
        props: {
          "author-type": "owner",
          "author-name": "Channel Owner",
          message: "Hey, guys!",
          "is-highlighted": true,
        },
      },
      {
        type: "paid",
        props: {
          "author-type": "",
          "author-name": "Normal User",
          message: "This is a paid message!",
          "purchase-amount": "$5.00",
          "disable-highlighting": true,
        },
      },
      {
        type: "sticker",
        props: {
          "author-type": "",
          "author-name": "Normal User",
          "purchase-amount": "$1.00",
          "disable-highlighting": true,
        },
      },
      {
        type: "membership",
        props: {
          "author-type": "member",
          "author-name": "Member",
          "header-primary-text": "Member for 7 months",
          "header-subtext": "Step 1",
          message: "This is a member milestone chat!",
        },
      },
    ],
  },
};
