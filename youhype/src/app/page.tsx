"use client";

import { useState } from "react";
import FilePicker from "../components/common/FilePicker";
import HypeLineChart from "../components/chart/HypeLineChart";
import { useReplayFile } from "../hooks/useReplayFile";
import ToastContainer from "../components/common/ToastContainer";
import YouTubePlayer from "@/components/common/YouTubePlayer";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import YouTubeLinkInput from "@/components/common/YouTubeLinkInput";

export default function Page() {
  const { data, smoothed, peaks, handleFile } = useReplayFile();
  const { setPlayer, seekTo } = useYouTubePlayer();
  const [videoId, setVideoId] = useState<string | null>(null);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">YouTube Stream Hype Timeline</h1>

      {/* Ask for optional link */}
      <YouTubeLinkInput onVideoId={setVideoId} />

      {/* Conditionally render player only if link provided */}
      {videoId && (
        <YouTubePlayer videoId={videoId} onReady={setPlayer} />
      )}

      <FilePicker onFileSelected={handleFile} />

      {data.length > 0 && (
        <HypeLineChart
          data={data}
          smoothed={smoothed}
          peaks={peaks}
          onSeek={seekTo}
        />
      )}

      <ToastContainer />
    </main>
  );
}
