"use client";

import { useState } from "react";

interface Props {
  onVideoId: (id: string | null) => void;
}

export default function YouTubeLinkInput({ onVideoId }: Props) {
  const [link, setLink] = useState("");

  function extractVideoId(url: string): string | null {
    // Match watch?v=, youtu.be/, or embed/
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/);
    return match ? match[1] : null;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setLink(value);
    onVideoId(extractVideoId(value));
  }

  return (
    <input
      type="text"
      placeholder="Optional YouTube link"
      value={link}
      onChange={handleChange}
      className="border rounded px-2 py-1 w-full"
    />
  );
}
