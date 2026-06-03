"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import TierBadge from "@/components/TierBadge";
import { feedPosts as seedFeedPosts, ccsEarning, FeedPost, lorealLuxeBrands, brandPerfumeCatalog } from "@/lib/data";
import { imageFor } from "@/lib/brandImages";

const FILTERS = ["All", "Video", "Photo", "Text"];
const STORAGE_KEY = "scenthood_user_posts";

interface UserPost extends FeedPost {
  imageDataUrl?: string;
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function FeedCard({ post, idx, isUser }: { post: UserPost; idx: number; isUser?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const aspect = post.aspectRatio === "tall" ? "aspect-[3/4]"
                : post.aspectRatio === "wide" ? "aspect-[4/3]"
                : "aspect-square";
  const usingUpload = !!post.imageDataUrl;
  const img = post.imageDataUrl ?? imageFor(post.fragranceName, post.brand, idx);

  return (
    <FadeUp delay={(idx % 6) * 0.04}>
      <div className="break-inside-avoid mb-5 group">
        <div className={`relative ${aspect} overflow-hidden bg-scent-darkOud`}>
          {usingUpload ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={post.fragranceName} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <Image src={img} alt={post.fragranceName} fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
          )}
          {post.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-scent-parchment/15 backdrop-blur-md border border-scent-parchment/40 flex items-center justify-center">
                <div className="w-0 h-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-scent-parchment ml-1" />
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="pill pill-parchment text-[9px] px-2.5 py-0.5">
              {post.type === "video" ? "▶ Video" : post.type === "photo" ? "◉ Photo" : "✏ Review"}
            </span>
            {isUser && <span className="pill pill-rose text-[9px] px-2.5 py-0.5">New</span>}
          </div>
          <div className="absolute top-3 right-3">
            <span className="pill pill-gold text-[9px] px-2.5 py-0.5">+{post.ccsEarned} LIS</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-scent-noir via-scent-noir/60 to-transparent p-4">
            <div className="text-scent-gold text-[9px] tracking-[0.2em] uppercase font-bold">{post.brand}</div>
            <div className="text-scent-parchment font-display text-sm mt-0.5 leading-tight">{post.fragranceName}</div>
          </div>
        </div>

        <div className="border-x border-b border-scent-noir/10 bg-scent-parchment px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-scent-noir flex items-center justify-center text-[10px] font-display text-scent-gold flex-shrink-0">
              {post.userAvatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-bold text-scent-noir leading-tight">{post.userName}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <TierBadge tier={post.userTier} />
                <span className="text-[9px] text-loreal-muted">{post.userLocation}</span>
              </div>
            </div>
            <span className="text-[10px] text-loreal-muted flex-shrink-0">{post.timestamp}</span>
          </div>

          <p className="font-serif italic text-[13px] text-scent-darkOud leading-snug line-clamp-3">
            &ldquo;{post.caption}&rdquo;
          </p>

          <div className="mt-3 flex items-center gap-4 text-[11px] font-medium">
            {/* Like */}
            <button onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 transition-colors ${liked ? "text-scent-oudRose" : "text-loreal-muted hover:text-scent-noir"}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>
            {/* Comment */}
            <button className="flex items-center gap-1.5 text-loreal-muted hover:text-scent-noir transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>{post.comments}</span>
            </button>
            {/* Save */}
            <button onClick={() => setSaved(!saved)}
              className={`flex items-center gap-1.5 transition-colors ${saved ? "text-scent-gold" : "text-loreal-muted hover:text-scent-noir"}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span>{post.saves + (saved ? 1 : 0)}</span>
            </button>
            {/* Repost */}
            <button className="ml-auto text-loreal-muted hover:text-scent-noir transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

// ── CREATE MODAL ──
function CreateModal({ open, onClose, onPost }: {
  open: boolean; onClose: () => void;
  onPost: (p: UserPost) => void;
}) {
  const [type, setType] = useState<"photo" | "video" | "text">("photo");
  const [brand, setBrand] = useState("YSL Beauté");
  const [fragranceName, setFragranceName] = useState("YSL Libre");
  const [caption, setCaption] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  // Build fragrance options from catalog for the chosen brand
  const brandKey = brand;
  const fragranceOptions = brandPerfumeCatalog[brandKey]
    ? [
        ...brandPerfumeCatalog[brandKey].f,
        ...brandPerfumeCatalog[brandKey].m,
        ...brandPerfumeCatalog[brandKey].n,
      ].map((p) => p.fullName)
    : [];

  useEffect(() => {
    if (fragranceOptions.length > 0 && !fragranceOptions.includes(fragranceName)) {
      setFragranceName(fragranceOptions[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  const handleFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!caption.trim()) return;
    if (type === "photo" && !imageDataUrl) return;
    setSubmitting(true);
    const ccs = type === "video" ? ccsEarning.videoReview
             : type === "photo" ? ccsEarning.photoReview
             : ccsEarning.textReview;
    const post: UserPost = {
      id: `up-${Date.now()}`,
      userId: "me",
      userName: "You",
      userAvatar: "ME",
      userLocation: "Just now",
      userTier: "Scenthooders",
      type,
      fragranceName,
      brand,
      thumbnailColor: "from-stone-700 to-stone-900",
      caption: caption.trim(),
      likes: 0, saves: 0, comments: 0,
      ccsEarned: ccs,
      timestamp: "now",
      tags: [brand.replace(/\s+/g, ""), fragranceName.replace(/\s+/g, "")],
      aspectRatio: "tall",
      imageDataUrl,
    };
    onPost(post);
    // reset
    setTimeout(() => {
      setCaption(""); setImageDataUrl(undefined); setSubmitting(false); onClose();
    }, 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-scent-noir/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-[70] p-4 pointer-events-none">
            <div className="bg-scent-parchment border-2 border-scent-noir w-full md:max-w-xl mx-auto max-h-[90vh] overflow-y-auto shadow-[0_8px_0_var(--noir)] pointer-events-auto">
              <div className="p-6 md:p-8 border-b border-scent-noir/10 flex items-center justify-between">
                <div>
                  <div className="eyebrow mb-1">Create</div>
                  <h3 className="display-md text-scent-noir">Share & Earn LIS</h3>
                </div>
                <button onClick={onClose} className="text-scent-noir text-2xl leading-none">×</button>
              </div>

              <div className="p-6 md:p-8 space-y-5">
                {/* Type selector */}
                <div>
                  <div className="eyebrow mb-2">Post type</div>
                  <div className="flex gap-2">
                    {(["photo", "video", "text"] as const).map((t) => (
                      <button key={t} onClick={() => setType(t)}
                        className={`pill text-[11px] px-4 py-1.5 ${type === t ? "pill-noir" : "pill-parchment opacity-70"}`}>
                        {t === "photo" ? "◉ Photo" : t === "video" ? "▶ Video" : "✏ Text"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="eyebrow mb-2 block">Brand</label>
                  <select value={brand} onChange={(e) => setBrand(e.target.value)}
                    className="w-full border-2 border-scent-noir bg-scent-parchment px-4 py-3 text-sm font-medium focus:outline-none focus:bg-scent-alabaster">
                    {lorealLuxeBrands.map((b) => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Fragrance */}
                <div>
                  <label className="eyebrow mb-2 block">Fragrance</label>
                  {fragranceOptions.length > 0 ? (
                    <select value={fragranceName} onChange={(e) => setFragranceName(e.target.value)}
                      className="w-full border-2 border-scent-noir bg-scent-parchment px-4 py-3 text-sm font-medium focus:outline-none focus:bg-scent-alabaster">
                      {fragranceOptions.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  ) : (
                    <input value={fragranceName} onChange={(e) => setFragranceName(e.target.value)}
                      className="w-full border-2 border-scent-noir bg-scent-parchment px-4 py-3 text-sm font-medium focus:outline-none focus:bg-scent-alabaster"
                      placeholder="Fragrance name" />
                  )}
                </div>

                {/* Image upload (photo/video) */}
                {(type === "photo" || type === "video") && (
                  <div>
                    <label className="eyebrow mb-2 block">Upload image</label>
                    <label className="cursor-pointer block">
                      <input type="file" accept="image/*"
                        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                        className="hidden" />
                      <div className="border-2 border-dashed border-scent-noir bg-scent-alabaster/40 aspect-[4/3] flex items-center justify-center text-center text-scent-noir/60 hover:bg-scent-alabaster/70 transition-colors relative overflow-hidden">
                        {imageDataUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={imageDataUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                          <div>
                            <div className="text-4xl mb-2">+</div>
                            <div className="text-[11px] uppercase tracking-[0.2em] font-bold">Tap to upload</div>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                )}

                {/* Caption */}
                <div>
                  <label className="eyebrow mb-2 block">Your review</label>
                  <textarea value={caption} onChange={(e) => setCaption(e.target.value)}
                    rows={4} placeholder="What does it smell like? When do you wear it? Make us feel it."
                    className="w-full border-2 border-scent-noir bg-scent-parchment px-4 py-3 text-sm focus:outline-none focus:bg-scent-alabaster font-serif italic" />
                </div>

                {/* LIS badge */}
                <div className="flex items-center justify-between bg-scent-noir text-scent-parchment px-5 py-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] font-bold">You&apos;ll earn</div>
                  <div className="font-display text-xl text-scent-gold">
                    +{type === "video" ? ccsEarning.videoReview : type === "photo" ? ccsEarning.photoReview : ccsEarning.textReview} LIS
                  </div>
                </div>

                <button onClick={handleSubmit}
                  disabled={submitting || !caption.trim() || ((type === "photo" || type === "video") && !imageDataUrl)}
                  className="w-full pill pill-gold text-[12px] py-3 disabled:opacity-40 disabled:cursor-not-allowed">
                  {submitting ? "Posting…" : "Post to feed →"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function LISBanner() {
  return (
    <div className="mb-8 bg-scent-noir text-scent-parchment p-6 md:p-8 relative overflow-hidden grain">
      <div className="relative z-10">
        <div className="eyebrow text-scent-gold mb-3">Earn LIS through content</div>
        <h3 className="display-md text-scent-parchment mb-5">Every post raises your Influence Score.</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { type: "Video Review",   ccs: ccsEarning.videoReview, note: "Highest impact" },
            { type: "Photo Review",   ccs: ccsEarning.photoReview, note: "Quick & visual" },
            { type: "Written Review", ccs: ccsEarning.textReview,  note: "Thoughtful depth" },
          ].map((it) => (
            <div key={it.type} className="border border-scent-parchment/20 px-3 py-3 text-center">
              <div className="text-[10px] uppercase tracking-[0.18em] text-scent-parchment/70">{it.type}</div>
              <div className="display-md text-scent-gold mt-1">+{it.ccs}</div>
              <div className="text-[10px] text-scent-parchment/60 mt-0.5">{it.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [showEarning, setShowEarning] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);

  // Load user posts from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUserPosts(JSON.parse(raw));
    } catch {}
  }, []);

  const handleNewPost = (p: UserPost) => {
    const next = [p, ...userPosts];
    setUserPosts(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  // Combine user posts (newest first) + seed posts
  const allPosts: UserPost[] = [...userPosts, ...seedFeedPosts];
  const filtered = allPosts.filter((p) =>
    typeFilter === "All" ? true : p.type === typeFilter.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-scent-parchment pb-16">
      <BottomNav />

      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-scent-noir grain">
        <Image src="/assets/fragrance-journal.jpg" alt="" fill priority
          className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-scent-noir/40 via-scent-noir/20 to-scent-noir/85" />

        <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-12 pb-12 md:pb-16 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="eyebrow text-scent-gold mb-4">Community · The Feed</div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="display-hero text-scent-parchment">
            Fragrance,<br />in their words.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-5 max-w-xl text-scent-parchment/85 text-base md:text-lg leading-relaxed">
            Reviews, films, and memories — published by members, scored by peers. The signal that shapes the next brief.
          </motion.p>
        </div>
      </section>

      <section className="sticky top-0 z-30 bg-scent-parchment/95 backdrop-blur-md border-b border-scent-noir/10">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setTypeFilter(f)}
                className={`pill text-[11px] px-4 py-1.5 ${typeFilter === f ? "pill-noir" : "pill-parchment opacity-70 hover:opacity-100"}`}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={() => setCreateOpen(true)}
            className="pill pill-gold text-[11px] px-4 py-1.5">
            + Create &amp; Earn LIS
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-12 py-10 md:py-14">
        <AnimatePresence>
          {showEarning && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <LISBanner />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {filtered.map((post, i) => (
            <FeedCard key={post.id} post={post} idx={i} isUser={post.id.startsWith("up-")} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="display-md text-scent-noir/40">No posts yet</div>
            <div className="text-sm text-loreal-muted mt-2">Be the first in this category.</div>
          </div>
        )}
      </section>

      <CreateModal open={createOpen} onClose={() => setCreateOpen(false)} onPost={handleNewPost} />
    </main>
  );
}
