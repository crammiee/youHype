"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import YouTubeLinkInput from "@/components/common/YouTubeLinkInput";
import AccentButton from "@/components/common/AccentButton";
import { useReplayStore } from "@/store/replayStore";

export default function YouHypeLanding() {
  const router = useRouter();
  const { setReplay } = useReplayStore();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  async function handleContinue() {
    if (!videoUrl) {
      alert("Please paste a YouTube link first.");
      return;
    }

    const res = await fetch("/api/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl }),
    });

    const { data, smoothed, peaks, error } = await res.json();
    if (error) {
      alert("Failed to process replay: " + error);
      return;
    }

    // ✅ Store replay data in Zustand
    setReplay({ data, smoothed, peaks });

    const params = new URLSearchParams();
    params.set("videoId", videoUrl);
    router.push(`/results?${params.toString()}`);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-surface to-surfaceLight text-textPrimary font-sans px-6">
      <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
        youHype
      </h1>
      <p className="text-textSecondary mb-10 text-center max-w-xl">
        Discover hype moments in your streams. Paste your YouTube stream link to analyze what excites your audience.
      </p>

      <div className="w-full max-w-md space-y-4">
        <YouTubeLinkInput onVideoId={setVideoUrl} />
        <AccentButton onClick={handleContinue}>Continue →</AccentButton>
      </div>
    </main>
  );
}
