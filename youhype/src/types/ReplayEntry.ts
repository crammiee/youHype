/**
 * Represents a bucketized replay entry for charting hype moments.
 */
export interface ReplayEntry {
  timeSec: number; // seconds offset into the video
  count: number;   // number of chat messages in this bucket
}
