import { ChatEntry } from "@/types/ChatEntry";

export function bucketizeMessages(
  entries: ChatEntry[],
  bucketSizeSec: number = 10
): { timeSec: number; count: number }[] {
  const buckets: Record<number, number> = {};

  for (const e of entries) {
    const offsetMs = e.videoOffsetMs ?? e.timestampMs;
    if (offsetMs === undefined) continue; // skip invalid entries

    const timeSec = Math.floor(offsetMs / 1000);
    const bucket = Math.floor(timeSec / bucketSizeSec) * bucketSizeSec;
    buckets[bucket] = (buckets[bucket] ?? 0) + 1;
  }

  return Object.entries(buckets)
    .map(([timeSec, count]) => ({ timeSec: Number(timeSec), count }))
    .sort((a, b) => a.timeSec - b.timeSec);
}
