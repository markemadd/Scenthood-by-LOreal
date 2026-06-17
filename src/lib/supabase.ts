import { createClient } from "@supabase/supabase-js";
import type { Tier } from "./data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";

export const supabase = createClient(url, anon, {
  auth: { persistSession: false },
});

export const POST_MEDIA_BUCKET = "post-media";
export const REFERRAL_LIS_REWARD = 50;

// ── Profiles ──────────────────────────────────────────────────────
export interface DbProfile {
  id: string;
  name: string;
  email: string;
  initials: string;
  tier: Tier;
  lis: number;
  referral_code: string;
  referred_by: string | null;
  gender: string | null;
  age_range: string | null;
  platform: string | null;
  created_at: string;
}

export async function createProfile(data: {
  name: string; email: string; initials: string;
  referral_code: string; referred_by?: string;
  gender?: string; age_range?: string; platform?: string;
}): Promise<DbProfile | null> {
  const { data: profile, error } = await supabase
    .from("profiles")
    .insert({ ...data, tier: "Scenthooders", lis: 0 })
    .select("*")
    .single();
  if (error) { console.error("createProfile:", error); return null; }
  return profile as DbProfile;
}

export async function getProfileByReferralCode(code: string): Promise<DbProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("referral_code", code)
    .single();
  if (error) return null;
  return data as DbProfile;
}

export async function getProfileByEmail(email: string): Promise<DbProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();
  if (error) return null;
  return data as DbProfile;
}

// ── Referrals ─────────────────────────────────────────────────────
export interface DbReferral {
  id: string;
  referrer_code: string;
  referred_name: string;
  referred_email: string;
  lis_awarded: number;
  created_at: string;
}

export async function recordReferral(referrerCode: string, referredName: string, referredEmail: string): Promise<void> {
  // Insert referral record
  const { error: refErr } = await supabase.from("referrals").insert({
    referrer_code: referrerCode,
    referred_name: referredName,
    referred_email: referredEmail,
    lis_awarded: REFERRAL_LIS_REWARD,
  });
  if (refErr) { console.error("recordReferral insert:", refErr); return; }

  // Award LIS to the referrer via RPC (increment)
  await supabase.rpc("increment_lis", { p_referral_code: referrerCode, p_amount: REFERRAL_LIS_REWARD });
}

export async function fetchReferrals(referrerCode: string): Promise<DbReferral[]> {
  const { data, error } = await supabase
    .from("referrals")
    .select("*")
    .eq("referrer_code", referrerCode)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as DbReferral[];
}

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
