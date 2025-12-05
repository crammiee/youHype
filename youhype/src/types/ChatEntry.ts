// Canonical model for a single chat replay entry
export interface ChatEntry {
  id: string;
  text: string;
  author: {
    name: string;
    photoUrl: string;
    channelId: string;
    badgeTooltip?: string;
  };
  // Use milliseconds for easier handling; original is microseconds in YouTube data
  timestampMs: number;
  // Optional: offset within the VOD in milliseconds if provided
  videoOffsetMs?: number;
}
