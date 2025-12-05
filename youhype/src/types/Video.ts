import { YouTubePlayer } from "react-youtube";

export interface SeekablePlayer {
  player: YouTubePlayer | null;
  seekTo: (seconds: number) => void;
}
