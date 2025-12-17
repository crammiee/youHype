/**
 * Raw NDJSON line structure from yt-dlp chat replay.
 * We only type the fields we care about for timestamp extraction.
 */
export interface RawReplayObject {
  videoOffsetTimeMsec?: string;

  replayChatItemAction?: {
    actions?: {
      addChatItemAction?: {
        item?: {
          liveChatTextMessageRenderer?: {
            timestampUsec?: string;
          };
          liveChatViewerEngagementMessageRenderer?: {
            timestampUsec?: string;
          };
        };
      };
    }[];
  };
}
