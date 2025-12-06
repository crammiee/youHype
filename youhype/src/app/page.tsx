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
    <main className="min-h-screen flex flex-col items-center justify-center 
                     bg-gradient-to-b from-background via-surface to-surfaceLight 
                     text-textPrimary font-sans px-6">
      {/* Hero Section */}
      <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
        youHype
      </h1>
      <p className="text-textSecondary mb-10 text-center max-w-xl">
        Discover hype moments in your streams. Upload your replay file and optionally link your YouTube stream to analyze what excites your audience.
      </p>

      {/* Inputs */}
      <div className="w-full max-w-md space-y-4">
        <YouTubeLinkInput onVideoId={setVideoId} />
        <FilePicker onFileSelected={handleFile} />
        <button
          onClick={handleContinue}
          className="w-full py-3 rounded-lg font-medium 
                     bg-gradient-to-r from-accent to-purple-600 
                     hover:from-purple-600 hover:to-accent 
                     transition-all duration-300 shadow-lg"
        >
          Continue →
        </button>
      </div>
    </main>
  );
}
