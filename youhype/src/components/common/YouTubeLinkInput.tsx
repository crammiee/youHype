import React, { useState } from "react";

interface YouTubeLinkInputProps {
  onVideoId: (id: string | null) => void;
  className?: string;
  placeholder?: string;
}

export default function YouTubeLinkInput({
  onVideoId,
  className = "",
  placeholder = "Paste YouTube link...",
}: YouTubeLinkInputProps) {
  const [link, setLink] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setLink(value);

    // Extract videoId from YouTube URL
    const match = value.match(
      /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/
    );
    onVideoId(match ? match[1] : null);
  }

  return (
    <input
      type="text"
      value={link}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg 
                  bg-surfaceLight/80 border border-gray-600 
                  text-textPrimary placeholder-textSecondary
                  focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent
                  transition duration-200 ${className}`}
    />
  );
}
