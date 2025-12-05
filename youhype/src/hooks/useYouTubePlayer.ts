import { useState } from "react";
import { YouTubePlayer } from "react-youtube";

export function useYouTubePlayer() {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);

  function seekTo(seconds: number) {
    if (player) {
      player.seekTo(seconds, true);
    }
  }

  return { player, setPlayer, seekTo };
}
