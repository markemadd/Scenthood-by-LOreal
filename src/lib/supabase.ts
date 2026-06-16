import { createClient } from "@supabase/supabase-js";
import type { Tier } from "./data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon, {
  auth: { persistSession: false },
});

export const POST_MEDIA_BUCKET = "post-media";

export interface DbPost {
  id: string;
  user_name: string;
  user_avatar: string;
  user_tier: Tier;
  user_location: string | null;
  type: "video" | "photo" | "text";
  fragrance_name: string;
  brand: string;
  caption: string;
  media_url: string | null;
  aspect_ratio: "tall" | "wide" | "square";
  likes: number;
  saves: number;
  comments: number;
  ccs_earned: number;
  tags: string[];
  created_at: string;
}

import type { FeedPost } from "./data";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function dbPostToFeedPost(p: DbPost): FeedPost & { mediaUrl?: string } {
  return {
    id: p.id,
    userId: p.id,
    userName: p.user_name,
    userAvatar: p.user_avatar,
    userLocation: p.user_location ?? "",
    userTier: p.user_tier,
    type: p.type,
    fragranceName: p.fragrance_name,
    brand: p.brand,
    thumbnailColor: "from-stone-700 to-stone-900",
    caption: p.caption,
    likes: p.likes,
    saves: p.saves,
    comments: p.comments,
    ccsEarned: p.ccs_earned,
    timestamp: timeAgo(p.created_at),
    tags: p.tags ?? [],
    aspectRatio: p.aspect_ratio,
    mediaUrl: p.media_url ?? undefined,
  };
}
