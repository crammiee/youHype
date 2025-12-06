"use client";

import { useSearchParams } from "next/navigation";
import { useReplayStore } from "@/store/replayStore";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import YouTubePlayer from "@/components/common/YouTubePlayer";
import HypeLineChart from "@/components/chart/HypeLineChart";
import ToastContainer from "@/components/common/ToastContainer";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("videoId");

  const { data, smoothed, peaks } = useReplayStore();
  const { setPlayer, seekTo } = useYouTubePlayer();

  return (
    <main className="min-h-screen bg-background text-textPrimary font-sans p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Stream Analysis Results
      </h1>

      {/* Player Section */}
      {videoId && (
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-4xl aspect-video rounded overflow-hidden shadow-lg">
            <YouTubePlayer videoId={videoId} onReady={setPlayer} />
          </div>
        </div>
      )}

      {/* Chart Section */}
      {data.length > 0 && (
        <div className="w-full max-w-4xl mx-auto bg-surface p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Hype Timeline</h2>
          <HypeLineChart
            data={data}
            smoothed={smoothed}
            peaks={peaks}
            onSeek={seekTo}
          />
        </div>
      )}

      <ToastContainer />
    </main>
  );
}
