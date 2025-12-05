// src/types/YouTubeRaw.ts

export interface YouTubeRun {
  text: string;
}

export interface YouTubeMessage {
  runs: YouTubeRun[];
}

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeAuthorPhoto {
  thumbnails: YouTubeThumbnail[];
}

export interface YouTubeAuthorBadgeRenderer {
  customThumbnail?: { thumbnails: YouTubeThumbnail[] };
  tooltip: string;
}

export interface YouTubeAuthorBadge {
  liveChatAuthorBadgeRenderer: YouTubeAuthorBadgeRenderer;
}

export interface YouTubeLiveChatTextMessageRenderer {
  id: string;
  message: YouTubeMessage;
  authorName: { simpleText: string };
  authorPhoto: YouTubeAuthorPhoto;
  authorExternalChannelId: string;
  authorBadges?: YouTubeAuthorBadge[];
  timestampUsec: string;
}

export interface YouTubeAddChatItemAction {
  item: {
    liveChatTextMessageRenderer: YouTubeLiveChatTextMessageRenderer;
  };
}

export interface YouTubeReplayChatItemAction {
  actions: { addChatItemAction: YouTubeAddChatItemAction }[];
  videoOffsetTimeMsec?: string;
}

export interface YouTubeRawEntry {
  replayChatItemAction: YouTubeReplayChatItemAction;
}
