import { RawReplayObject } from "@/types/RawReplayObject";
import { ChatEntry } from "@/types/ChatEntry";

function extractTimestampUsec(obj: RawReplayObject): number | null {
  const actions = obj.replayChatItemAction?.actions;
  if (!actions || actions.length === 0) return null;

  const item = actions[0]?.addChatItemAction?.item;
  const tsText =
    item?.liveChatTextMessageRenderer?.timestampUsec ??
    item?.liveChatViewerEngagementMessageRenderer?.timestampUsec;

  if (!tsText) return null;
  const ts = Number(tsText);
  return Number.isFinite(ts) ? ts : null;
}

export function toChatEntries(parsedObjects: RawReplayObject[]): ChatEntry[] {
  const timestampsUsec: number[] = parsedObjects
    .map(extractTimestampUsec)
    .filter((ts): ts is number => ts !== null);

  if (timestampsUsec.length === 0) return [];

  const baseline = Math.min(...timestampsUsec);

  return parsedObjects.map((obj) => {
    const ts = extractTimestampUsec(obj);
    return {
      videoOffsetMs: ts !== null ? (ts - baseline) / 1000 : undefined,
      timestampMs: ts !== null ? ts / 1000 : undefined,
    };
  });
}
