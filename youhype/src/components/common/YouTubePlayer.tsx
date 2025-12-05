"use client";

import YouTube from "react-youtube";
import { YouTubePlayer as YouTubePlayerType } from "react-youtube";

interface Props {
  videoId: string;
  onReady: (player: YouTubePlayerType) => void;
}

export default function YouTubePlayerWrapper({ videoId, onReady }: Props) {
  return (
    <YouTube
      videoId={videoId}
      onReady={(event) => onReady(event.target)}
    />
  );
}
