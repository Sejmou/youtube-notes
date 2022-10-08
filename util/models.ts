import { z } from 'zod';

export const YouTubeVideoDataValidator = z.object({
  videoId: z.string(),
  title: z.string(),
  description: z.string(),
  channelTitle: z.string(),
});

export type YouTubeVideoData = z.infer<typeof YouTubeVideoDataValidator>;

export const YouTubePlaylistVideoDataValidator =
  YouTubeVideoDataValidator.extend({
    videoOwnerChannelTitle: z.string(),
  });
export type YouTubePlaylistVideoData = z.infer<
  typeof YouTubePlaylistVideoDataValidator
>;

export const YouTubePlaylistDataValidator = z.array(
  YouTubePlaylistVideoDataValidator
);

export type PlaylistVideoItemsData = {
  videos: YouTubeVideoData[];
  initialIndex: number;
};
