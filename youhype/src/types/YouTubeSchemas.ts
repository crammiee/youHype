// src/types/YouTubeSchemas.ts
import { z } from "zod";

export const YouTubeRunSchema = z.object({
  text: z.string(),
});

export const YouTubeMessageSchema = z.object({
  runs: z.array(YouTubeRunSchema),
});

export const YouTubeThumbnailSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export const YouTubeAuthorPhotoSchema = z.object({
  thumbnails: z.array(YouTubeThumbnailSchema),
});

export const YouTubeAuthorBadgeRendererSchema = z.object({
  tooltip: z.string(),
  customThumbnail: z
    .object({ thumbnails: z.array(YouTubeThumbnailSchema) })
    .optional(),
});

export const YouTubeAuthorBadgeSchema = z.object({
  liveChatAuthorBadgeRenderer: YouTubeAuthorBadgeRendererSchema,
});

export const YouTubeLiveChatTextMessageRendererSchema = z.object({
  id: z.string(),
  message: YouTubeMessageSchema,
  authorName: z.object({ simpleText: z.string() }),
  authorPhoto: YouTubeAuthorPhotoSchema,
  authorExternalChannelId: z.string(),
  authorBadges: z.array(YouTubeAuthorBadgeSchema).optional(),
  timestampUsec: z.string(),
});

export const YouTubeAddChatItemActionSchema = z.object({
  item: z.object({
    liveChatTextMessageRenderer: YouTubeLiveChatTextMessageRendererSchema,
  }),
});

export const YouTubeReplayChatItemActionSchema = z.object({
  actions: z.array(z.object({ addChatItemAction: YouTubeAddChatItemActionSchema })),
  videoOffsetTimeMsec: z.string().optional(),
});

export const YouTubeRawEntrySchema = z.object({
  replayChatItemAction: YouTubeReplayChatItemActionSchema,
});

// Type inference
export type YouTubeRawEntry = z.infer<typeof YouTubeRawEntrySchema>;
