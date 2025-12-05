import { ChatEntry } from "../types/ChatEntry";
import { YouTubeRawEntrySchema } from "@/types/YouTubeSchemas";

export function parseChatEntry(raw: unknown): ChatEntry | null {
  const parsed = YouTubeRawEntrySchema.safeParse(raw);
  if (!parsed.success) {
    console.warn("Invalid entry skipped:", parsed.error.format());
    return null;
  }

  const renderer =
    parsed.data.replayChatItemAction.actions[0].addChatItemAction.item
      .liveChatTextMessageRenderer;

  const text = renderer.message.runs.map((r) => r.text).join(" ");

  const timestampUsec = Number(renderer.timestampUsec);
  const timestampMs = Number.isFinite(timestampUsec)
    ? Math.floor(timestampUsec / 1000)
    : 0;

  const videoOffsetTimeMsec = Number(
    parsed.data.replayChatItemAction.videoOffsetTimeMsec ?? NaN
  );
  const videoOffsetMs = Number.isFinite(videoOffsetTimeMsec)
    ? videoOffsetTimeMsec
    : undefined;

  return {
    id: renderer.id,
    text,
    author: {
      name: renderer.authorName.simpleText,
      photoUrl: renderer.authorPhoto.thumbnails[0]?.url ?? "",
      channelId: renderer.authorExternalChannelId,
      badgeTooltip:
        renderer.authorBadges?.[0]?.liveChatAuthorBadgeRenderer?.tooltip,
    },
    timestampMs,
    videoOffsetMs,
  };
}
