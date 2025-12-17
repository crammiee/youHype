import { exec } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

export async function runYtDlp(url: string): Promise<string[]> {
  const tmpDir = os.tmpdir();

  return new Promise((resolve, reject) => {
    exec(
      `yt-dlp --skip-download --sub-langs all --write-subs -o "${tmpDir}/%(id)s.%(ext)s" "${url}"`,
      { maxBuffer: 1024 * 1024 * 50 },
      (error) => {
        if (error) {
          reject(error);
          return;
        }

        const files = fs.readdirSync(tmpDir).filter((f) => f.endsWith(".json"));
        if (files.length === 0) {
          reject(new Error("Replay file not created"));
          return;
        }

        const replayPath = path.join(tmpDir, files[0]);
        const replayText = fs.readFileSync(replayPath, "utf-8");
        fs.unlinkSync(replayPath);

        const lines = replayText
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        resolve(lines);
      }
    );
  });
}
