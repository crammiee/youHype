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

  console.log("Rendering ResultsPage with videoId:", videoId);

  const { data, smoothed, peaks } = useReplayStore();
  const { setPlayer, seekTo } = useYouTubePlayer();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Results</h1>

      {videoId && <YouTubePlayer videoId={videoId} onReady={setPlayer} />}

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
