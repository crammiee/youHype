"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import YouTubeLinkInput from "@/components/common/YouTubeLinkInput";
import FilePicker from "@/components/common/FilePicker";
import { useReplayFile } from "@/hooks/useReplayFile";
import { useReplayStore } from "@/store/replayStore";

export default function LandingPage() {
  const router = useRouter();
  const { data, smoothed, peaks, handleFile } = useReplayFile();
  const { setReplay } = useReplayStore();
  const [videoId, setVideoId] = useState<string | null>(null);

  function handleContinue() {
    if (!data.length) {
      alert("Please upload a replay file first.");
      return;
    }
    setReplay({ data, smoothed, peaks });

    const params = new URLSearchParams();
    if (videoId) params.set("videoId", videoId);

    router.push(`/results?${params.toString()}`);
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">YouTube Stream Hype Timeline</h1>

      <YouTubeLinkInput onVideoId={setVideoId} />
      <FilePicker onFileSelected={handleFile} />

      <button
        onClick={handleContinue}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Continue →
      </button>
    </main>
  );
}
