"use client";

import { useState } from "react";

interface Props {
  onVideoId: (id: string | null) => void;
}

export default function YouTubeLinkInput({ onVideoId }: Props) {
  const [link, setLink] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!link.trim()) {
      onVideoId(null);
      return;
    }
    // Extract videoId from link (basic regex for v= or youtu.be)
    const match = link.match(
      /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/
    );
    onVideoId(match ? match[1] : null);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Optional YouTube link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
      />
      <button
        type="submit"
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Load
      </button>
    </form>
  );
}
