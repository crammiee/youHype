import { NextResponse } from "next/server";
import { runYtDlp } from "@/utils/ytDlpRunner";
import { parseNdjson } from "@/utils/ndjsonParser";
import { toChatEntries } from "@/utils/timestampExtractor";
import { bucketizeMessages } from "@/utils/bucketizeMessages";
import { movingAverage } from "@/utils/movingAverage";
import { detectPeaks } from "@/utils/peakDetector";
import { ReplayEntry } from "@/types/ReplayEntry";

export async function POST(req: Request) {
  const { url } = await req.json();

  try {
    const lines = await runYtDlp(url);
    const parsedObjects = parseNdjson(lines);
    const chatEntries = toChatEntries(parsedObjects);

    const data: ReplayEntry[] = bucketizeMessages(chatEntries, 10);
    const smoothed: ReplayEntry[] = movingAverage(data, 5);
    const peaks: ReplayEntry[] = detectPeaks(data, 2);

    return NextResponse.json({ data, smoothed, peaks });
  } catch (error: unknown) {
    return NextResponse.json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
