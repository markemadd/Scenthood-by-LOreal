"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import TierBadge from "@/components/TierBadge";
import { feedPosts, ccsEarning, FeedPost } from "@/lib/data";

const FILTERS = ["All", "Video", "Photo", "Text"];
const FAMILIES = ["All", "Woody", "Floral", "Citrus", "Amber", "Fresh", "Gourmand"];

function PlayIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
        <div className="w-0 h-0 border-y-[7px] border-l-[13px] border-y-transparent border-l-white ml-1" />
      </div>
    </div>
  );
}

function FeedCard({ post, priority }: { post: FeedPost; priority?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const heightClass = post.aspectRatio === "tall" ? "h-80" : post.aspectRatio === "wide" ? "h-44" : "h-60";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-loreal-border bg-white break-inside-avoid mb-3"
    >
      {/* Thumbnail */}
      <div className={`relative ${heightClass} bg-gradient-to-br ${post.thumbnailColor} overflow-hidden`}>
        {/* Simulated image overlay */}
        <div className="absolute inset-0 bg-black/10" />
        {post.type === "video" && <PlayIcon />}

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-[9px] font-medium tracking-[0.12em] uppercase px-2 py-1 border ${
            post.type === "video"
              ? "bg-loreal-charcoal text-white border-transparent"
              : post.type === "photo"
              ? "bg-white text-loreal-charcoal border-transparent"
              : "bg-loreal-cream/90 text-loreal-slate border-loreal-border"
          }`}>
            {post.type === "video" ? "▶ Video" : post.type === "photo" ? "◉ Photo" : "✏ Review"}
          </span>
        </div>

        {/* LIS badge */}
        <div className="absolute top-3 right-3">
          <span className="text-[9px] font-semibold bg-loreal-champagne/90 text-white px-2 py-1 tracking-wide">
            +{post.ccsEarned} LIS
          </span>
        </div>

        {/* Bottom gradient + fragrance name */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3">
          <div className="text-white/90 text-xs font-medium">{post.fragranceName}</div>
          <div className="text-white/60 text-[10px]">{post.brand}</div>
        </div>
      </div>

      {/* Author row */}
      <div className="px-3 py-2 flex items-center gap-2 border-b border-loreal-border">
        <div className="w-7 h-7 bg-loreal-sand flex items-center justify-center text-loreal-gold-dark text-[10px] font-bold font-serif flex-shrink-0">
          {post.userAvatar}
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-sans text-xs font-semibold text-loreal-charcoal">{post.userName}</span>
          <div className="flex items-center gap-1.5">
            <TierBadge tier={post.userTier} />
            <span className="body-sm text-[9px]">{post.userLocation}</span>
          </div>
        </div>
        <span className="body-sm text-[10px] flex-shrink-0">{post.timestamp}</span>
      </div>

      {/* Caption */}
      <div className="px-3 py-2.5">
        <p className="font-serif text-[12px] italic text-loreal-slate leading-relaxed line-clamp-3">
          &ldquo;{post.caption}&rdquo;
        </p>
      </div>

      {/* Tags */}
      <div className="px-3 pb-2 flex flex-wrap gap-1">
        {post.tags.map((tag) => (
          <span key={tag} className="text-[9px] text-loreal-champagne font-medium tracking-wide">#{tag}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="border-t border-loreal-border px-3 py-2 flex items-center gap-4">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1 text-[11px] font-medium transition-colors ${liked ? "champagne-text" : "text-loreal-muted hover:text-loreal-charcoal"}`}
        >
          <span className="text-sm">{liked ? "♥" : "♡"}</span>
          <span>{post.likes + (liked ? 1 : 0)}</span>
        </button>

        <button className="flex items-center gap-1 text-[11px] text-loreal-muted hover:text-loreal-charcoal transition-colors font-medium">
          <span className="text-sm">◌</span>
          <span>{post.comments}</span>
        </button>

        <button
          onClick={() => setSaved(!saved)}
          className={`flex items-center gap-1 text-[11px] font-medium transition-colors ${saved ? "text-loreal-charcoal" : "text-loreal-muted hover:text-loreal-charcoal"}`}
        >
          <span className="text-sm">{saved ? "◆" : "◇"}</span>
          <span>{post.saves + (saved ? 1 : 0)}</span>
        </button>

        <div className="ml-auto text-loreal-muted hover:text-loreal-charcoal transition-colors cursor-pointer text-[11px]">
          ↪ Share
        </div>
      </div>
    </motion.div>
  );
}

function LISEarningBanner() {
  return (
    <div className="border border-loreal-champagne/40 bg-loreal-cream/50 p-4 mb-4">
      <div className="flex items-start gap-3">
        <span className="champagne-text text-xl">✦</span>
        <div>
          <div className="font-sans text-sm font-semibold text-loreal-charcoal mb-1">How to earn LIS through content</div>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              { type: "▶ Video Review", ccs: ccsEarning.videoReview, note: "Highest impact" },
              { type: "◉ Photo Review", ccs: ccsEarning.photoReview, note: "Quick & visual" },
              { type: "✏ Written Review", ccs: ccsEarning.textReview, note: "Thoughtful" },
            ].map((item) => (
              <div key={item.type} className="text-center border border-loreal-border bg-white py-2 px-1">
                <div className="text-[10px] text-loreal-muted mb-1">{item.type}</div>
                <div className="font-serif text-lg champagne-text font-light">+{item.ccs}</div>
                <div className="text-[9px] text-loreal-muted">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [showEarning, setShowEarning] = useState(false);

  const filtered = feedPosts.filter((p) => {
    if (typeFilter === "All") return true;
    return p.type === typeFilter.toLowerCase();
  });

  return (
    <main className="min-h-screen bg-loreal-white pb-24 md:pb-0 pt-14">
      <BottomNav />

      {/* Header */}
      <div className="border-b border-loreal-border bg-white sticky top-14 z-40">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <div className="eyebrow mb-0.5">Community</div>
            <h1 className="font-serif text-xl font-light text-loreal-charcoal">Fragrance Feed</h1>
          </div>
          <button
            onClick={() => setShowEarning(!showEarning)}
            className="btn-outline-gold text-[10px] py-2 px-4"
          >
            + Create & Earn LIS
          </button>
        </div>

        {/* Type filters */}
        <div className="max-w-5xl mx-auto">
          <div className="flex overflow-x-auto no-scrollbar border-t border-loreal-border">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-5 py-2.5 text-[10px] font-medium tracking-[0.12em] uppercase flex-shrink-0 border-r border-loreal-border transition-all last:border-r-0 border-b-2 ${
                  typeFilter === f
                    ? "text-loreal-charcoal border-b-loreal-champagne bg-loreal-cream/30"
                    : "text-loreal-muted border-b-transparent hover:text-loreal-slate"
                }`}
              >
                {f === "Video" ? "▶ Video" : f === "Photo" ? "◉ Photo" : f === "Text" ? "✏ Written" : f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-5">
        {/* LIS Earning Banner */}
        <AnimatePresence>
          {showEarning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <LISEarningBanner />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pinterest-style masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
          {filtered.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-loreal-muted">
            <div className="font-serif text-xl mb-2">No posts yet</div>
            <div className="body-sm">Be the first to post in this category.</div>
          </div>
        )}
      </div>
    </main>
  );
}
