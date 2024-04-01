import { globalStyle, GlobalStyleRule, style } from "@vanilla-extract/css";

const w = (style: string, selector: string, rule: GlobalStyleRule) => {
  globalStyle(`${style} ${selector}`, rule);
  return style;
};

const g = (selector: string, rule: GlobalStyleRule) => {
  return w(style({}), selector, rule);
};

interface IStylesAuthor {
  [option: string]: string;
}

interface IStylesElem {
  [author: string]: IStylesAuthor;
}

export interface IStyles {
  [elem: string]: IStylesElem;
}
export const styles = {
  icon: {
    owner: {
      /* hide author icon (owner) */
      hide: g(
        `yt-live-chat-text-message-renderer[author-type="owner"] #author-photo`,
        {
          display: "none !important",
        },
      ),
    },
    /* hide author icon (moderator) */
    moderator: {
      hide: g(
        `yt-live-chat-text-message-renderer[author-type="moderator"] #author-photo`,
        {
          display: "none !important",
        },
      ),
    },
    /* hide author icon (member) */
    member: {
      hide: g(
        `yt-live-chat-text-message-renderer[author-type="member"] #author-photo`,
        {
          display: "none !important",
        },
      ),
    },
    /* hide author icon (any other) */
    others: {
      hide: g(
        `yt-live-chat-text-message-renderer[author-type=""] #author-photo`,
        {
          display: "none !important",
        },
      ),
    },
  },

  name: {
    owner: {
      /* hide author name (owner) */
      hide: g(
        `yt-live-chat-text-message-renderer[author-type="owner"] yt-live-chat-author-chip`,
        {
          display: "none !important",
        },
      ),

      /* do not highlight owner name */
      nohighlight: w(
        g(
          `yt-live-chat-text-message-renderer[author-type="owner"] #author-name`,
          {
            backgroundColor: "unset",
            color: "unset",
          },
        ),
        `yt-live-chat-text-message-renderer[author-type="owner"] yt-live-chat-author-chip[is-highlighted] #author-name`,
        {
          padding: "unset",
          color: "unset",
          backgroundColor: "unset",
        },
      ),
    },
    moderator: {
      /* hide author name (moderator) */
      hide: g(
        `yt-live-chat-text-message-renderer[author-type="moderator"] yt-live-chat-author-chip`,
        {
          display: "none !important",
        },
      ),

      /* do not highlight moderator name */
      nohighlight: g(
        `yt-live-chat-text-message-renderer[author-type="moderator"] #author-name`,
        {
          color: "var(--yt-live-chat-secondary-text-color)",
        },
      ),
    },
    member: {
      /* hide author name (member) */
      hide: g(
        `yt-live-chat-text-message-renderer[author-type="member"] yt-live-chat-author-chip`,
        {
          display: "none !important",
        },
      ),
    },
    others: {
      /* hide author name (any other) */
      hide: g(
        `yt-live-chat-text-message-renderer[author-type=""] yt-live-chat-author-chip`,
        {
          display: "none !important",
        },
      ),
    },
  },

  /* do not show moderator badge (spanner) */
  badge: {
    moderator: {
      hide: g(`yt-live-chat-author-badge-renderer[type="moderator"]`, {
        display: "none !important",
      }),
    },
  },

  chat: {
    owner: {
      /* hide whole message (owner) */
      hide: g(`yt-live-chat-text-message-renderer[author-type="owner"]`, {
        display: "none !important",
      }),

      /* do not highlight owner message background */
      nohighlight: g(
        `yt-live-chat-text-message-renderer[author-type="owner"]`,
        {
          backgroundColor: "unset",
        },
      ),
    },
    moderator: {
      /* hide whole message (moderator) */
      hide: g(`yt-live-chat-text-message-renderer[author-type="moderator"]`, {
        display: "none !important",
      }),
    },
    member: {
      /* hide whole message (member) */
      hide: g(`yt-live-chat-text-message-renderer[author-type="member"]`, {
        display: "none !important",
      }),
    },
    others: {
      /* hide whole message (any other) */
      hide: g(`yt-live-chat-text-message-renderer[author-type=""]`, {
        display: "none !important",
      }),
    },
  },

  /* superchat */
  superchat: {
    any: {
      hide: g(`#card.yt-live-chat-paid-message-renderer`, {
        display: "none !important",
      }),
    },
  },

  /* superchat (sticker) */
  sticker: {
    any: {
      hide: g(`yt-live-chat-paid-sticker-renderer`, {
        display: "none !important",
      }),
    },
  },

  /* superchats bar */
  superchatBar: {
    any: {
      hide: g(`yt-live-chat-ticker-renderer`, {
        display: "none !important",
      }),
    },
  },

  /* member chat */
  memberChat: {
    any: {
      hide: g(`yt-live-chat-membership-item-renderer`, {
        display: "none !important",
      }),
    },
  },

  /* engagement (e.g. Subscribers-only mode) */
  engagement: {
    any: {
      hide: g(`yt-live-chat-viewer-engagement-message-renderer`, {
        display: "none !important",
      }),
    },
  },
} satisfies IStyles;

export type Styles = typeof styles;
