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
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-textPrimary font-sans">
      {/* Hero Section */}
      <h1 className="text-4xl font-bold mb-4">YouTube Stream Hype Timeline</h1>
      <p className="text-textSecondary mb-8 text-center max-w-lg">
        Upload your replay file and optionally paste a YouTube link to analyze hype moments.
      </p>

      {/* Inputs */}
      <div className="w-full max-w-md space-y-4">
        <YouTubeLinkInput onVideoId={setVideoId} />
        <FilePicker onFileSelected={handleFile} />
        <button
          onClick={handleContinue}
          className="w-full py-2 bg-accent text-white rounded hover:bg-accent-hover transition"
        >
          Continue →
        </button>
      </div>
    </main>
  );
}
