import { NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

interface ReplayEntry {
  timeSec: number;
  count: number;
}

export async function POST(req: Request) {
  const { url } = await req.json();
  const tmpDir = os.tmpdir();

  return new Promise((resolve) => {
    exec(
      `yt-dlp --skip-download --sub-langs all --write-subs -o "${tmpDir}/%(id)s.%(ext)s" "${url}"`,
      { maxBuffer: 1024 * 1024 * 50 },
      (error) => {
        if (error) {
          resolve(NextResponse.json({ error: error.message }, { status: 500 }));
          return;
        }

        try {
          const files = fs.readdirSync(tmpDir).filter((f) => f.endsWith(".json"));
          if (files.length === 0) {
            resolve(NextResponse.json({ error: "Replay file not created" }, { status: 404 }));
            return;
          }

          const replayPath = path.join(tmpDir, files[0]);
          const replayText = fs.readFileSync(replayPath, "utf-8");
          fs.unlinkSync(replayPath);

          // NDJSON → array of objects
          const lines = replayText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

          const parsedObjects = lines.map((line) => JSON.parse(line));

          // Transform into ReplayEntry[]
          const data: ReplayEntry[] = parsedObjects.map((obj: any) => {
            const ts = Number(obj.replayChatItemAction?.actions?.[0]?.addChatItemAction?.item?.liveChatTextMessageRenderer?.timestampUsec ?? 0);
            return {
              timeSec: Math.floor(ts / 1_000_000), // convert microseconds → seconds
              count: 1, // each chat line counts as 1
            };
          });

          resolve(NextResponse.json({ data, smoothed: [], peaks: [] }));
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : String(e);
          resolve(NextResponse.json({ error: msg }, { status: 500 }));
        }
      }
    );
  });
}
