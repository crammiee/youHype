import { useState } from "react";
import { parseChatEntry } from "../utils/parseChatEntry";
import { bucketizeMessages } from "../utils/bucketizeMessages";
import { ChatEntry } from "../types/ChatEntry";
import { movingAverage } from "@/utils/movingAverage";
import { detectPeaks } from "@/utils/peakDetector";

export function useReplayFile(bucketSizeSec: number = 10) {
  const [data, setData] = useState<{ timeSec: number; count: number }[]>([]);
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [smoothed, setsmooth] = useState<{ timeSec: number; count: number }[]>([]);
  const [peaks, setPeaks] = useState<{ timeSec: number; count: number }[]>([]);

  async function handleFile(file: File) {
    const text = await file.text();
    const lines = text.split("\n").filter((line) => line.trim().length > 0);

    const parsedEntries: ChatEntry[] = lines
      .map((line) => {
        try {
          const raw = JSON.parse(line);
          return parseChatEntry(raw);
        } catch {
          console.warn("Invalid JSON line skipped:", line);
          return null;
        }
      })
      .filter((e): e is ChatEntry => e !== null);

    setEntries(parsedEntries);

    const buckets = bucketizeMessages(parsedEntries, bucketSizeSec);
    setData(buckets);

    const smooth = movingAverage(buckets);
    setsmooth(smooth);

    const detected = detectPeaks(smooth);
    setPeaks(detected);
  }

  return { data, entries, smoothed, peaks, handleFile };
}
