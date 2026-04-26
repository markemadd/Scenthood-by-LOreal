"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Step = "method" | "social" | "details" | "done";
type Platform = "instagram" | "facebook" | "email";

const GENDER_OPTIONS = ["Woman", "Man", "Non-binary / Other", "Prefer not to say"];
const AGE_RANGES = ["13–17", "18–24", "25–34", "35–44", "45–54", "55+"];

function MetaIcon({ platform }: { platform: "instagram" | "facebook" }) {
  if (platform === "instagram") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function generateReferralCode(displayName: string) {
  const initials = displayName.trim().split(" ").map((w) => w[0]?.toUpperCase() ?? "").join("").slice(0, 2) || "SC";
  const num = Math.floor(1000 + Math.random() * 9000);
  return `SCENT-${initials}-${num}`;
}

export default function SignupPage() {
  const [step, setStep] = useState<Step>("method");
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const canContinueDetails = gender !== "" && ageRange !== "" && name.trim() !== "";

  const handleJoin = () => {
    const initials = name.trim().split(" ").map((w) => w[0]?.toUpperCase() ?? "").join("").slice(0, 2) || "SC";
    const profile = {
      name: name.trim(),
      email,
      gender,
      ageRange,
      platform,
      initials,
      tier: "Scenthooders",
      lis: 0,
      joinDate: new Date().toISOString(),
      referralCode: generateReferralCode(name),
      recentActivity: [] as { action: string; points: number; date: string }[],
      votingQuality: 0,
      contentOutput: 0,
      peerEndorsement: 0,
      sessionAttendance: 0,
    };
    try { localStorage.setItem("scenthood_user", JSON.stringify(profile)); } catch {}
    setStep("done");
  };

  if (step === "done") {
    return (
      <main className="min-h-screen bg-loreal-cream flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white border border-loreal-border text-center p-10"
        >
          <div className="h-1 bg-champagne-gradient mb-8" style={{ marginTop: "-2.5rem", marginLeft: "-2.5rem", marginRight: "-2.5rem", width: "calc(100% + 5rem)" }} />
          <div className="w-14 h-14 mx-auto bg-loreal-sand flex items-center justify-center mb-5">
            <span className="font-serif text-2xl champagne-text">✦</span>
          </div>
          <h2 className="heading-md mb-3">Welcome to SCENTHOOD</h2>
          <p className="body-sm mb-8 max-w-xs mx-auto">
            Your membership is active. Discover your scent identity and join the community shaping the future of fragrance.
          </p>
          <Link href="/quiz" className="btn-primary text-sm block mb-3">Discover My Scent Identity →</Link>
          <Link href="/home" className="btn-outline text-sm block">Explore Community</Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-loreal-white flex flex-col">
      {/* Header */}
      <div className="border-b border-loreal-border px-5 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif text-loreal-charcoal text-base tracking-[0.2em]">SCENTHOOD</Link>
          <span className="body-sm text-[11px]">Create Account</span>
        </div>
        {/* Steps indicator */}
        <div className="max-w-lg mx-auto mt-4 flex gap-2">
          {(["method", "social", "details"] as Step[]).map((s, i) => (
            <div
              key={s}
              className={`flex-1 h-0.5 transition-all ${["method", "social", "details"].indexOf(step) >= i
                ? "bg-loreal-champagne"
                : "bg-loreal-border"
                }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 px-5">
        <div className="max-w-lg mx-auto w-full">

          {/* ── STEP 1: Choose method ── */}
          {step === "method" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <div className="eyebrow mb-4">Join SCENTHOOD</div>
              <h2 className="heading-md mb-1">Create your account</h2>
              <p className="body-sm mb-8">Connect with your existing social accounts for a seamless experience — or sign up with email.</p>

              <div className="space-y-3 mb-6">
                {/* Instagram */}
                <button
                  onClick={() => { setPlatform("instagram"); setStep("social"); }}
                  className="w-full flex items-center gap-4 py-3.5 px-5 border border-loreal-border bg-white hover:border-loreal-champagne/60 hover:bg-loreal-cream/20 transition-all text-left"
                >
                  <span className="text-[#E1306C]"><MetaIcon platform="instagram" /></span>
                  <div className="flex-1">
                    <div className="font-sans text-sm font-semibold text-loreal-charcoal">Continue with Instagram</div>
                    <div className="text-[10px] text-loreal-muted">Share your reviews directly to your Stories</div>
                  </div>
                  <span className="text-loreal-muted text-sm">→</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => { setPlatform("facebook"); setStep("social"); }}
                  className="w-full flex items-center gap-4 py-3.5 px-5 border border-loreal-border bg-white hover:border-loreal-champagne/60 hover:bg-loreal-cream/20 transition-all text-left"
                >
                  <span className="text-[#1877F2]"><MetaIcon platform="facebook" /></span>
                  <div className="flex-1">
                    <div className="font-sans text-sm font-semibold text-loreal-charcoal">Continue with Facebook</div>
                    <div className="text-[10px] text-loreal-muted">Sync your social graph with the community</div>
                  </div>
                  <span className="text-loreal-muted text-sm">→</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-loreal-border" />
                  <span className="text-[10px] text-loreal-muted uppercase tracking-wide">or</span>
                  <div className="flex-1 h-px bg-loreal-border" />
                </div>

                {/* Email */}
                <button
                  onClick={() => { setPlatform("email"); setStep("social"); }}
                  className="w-full flex items-center gap-4 py-3.5 px-5 border border-loreal-border bg-white hover:border-loreal-champagne/60 hover:bg-loreal-cream/20 transition-all text-left"
                >
                  <span className="text-loreal-muted text-lg">✉</span>
                  <div className="flex-1">
                    <div className="font-sans text-sm font-semibold text-loreal-charcoal">Sign up with Email</div>
                    <div className="text-[10px] text-loreal-muted">Classic email and password</div>
                  </div>
                  <span className="text-loreal-muted text-sm">→</span>
                </button>
              </div>

              <p className="text-[10px] text-loreal-muted text-center leading-relaxed">
                By joining, you agree to our Terms of Use and Privacy Policy. We will never post without your permission.
              </p>

              <div className="mt-5 text-center">
                <span className="body-sm text-[11px]">Already a member? </span>
                <Link href="/home" className="text-[11px] champagne-text hover:text-loreal-gold font-medium">Sign in →</Link>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Social auth / email capture ── */}
          {step === "social" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <div className="eyebrow mb-4">
                {platform === "instagram" ? "Instagram" : platform === "facebook" ? "Facebook" : "Email"} · Step 2 of 3
              </div>
              <h2 className="heading-md mb-1">
                {platform === "email" ? "Your email address" : `Connect your ${platform === "instagram" ? "Instagram" : "Facebook"}`}
              </h2>
              <p className="body-sm mb-8">
                {platform === "email"
                  ? "We'll send you a verification link."
                  : `Connecting ${platform} lets you share reviews and earn LIS directly from your ${platform} posts. We never post without your permission.`}
              </p>

              {platform !== "email" && (
                <div className="border border-loreal-champagne/30 bg-loreal-cream/30 p-4 mb-6">
                  <div className="eyebrow text-[9px] mb-2">What we&apos;ll access via Meta API</div>
                  <ul className="space-y-1.5">
                    {[
                      "✓  Your display name and profile photo",
                      "✓  Follower count (to calibrate your LIS reach bonus)",
                      "✓  Ability to publish posts you explicitly approve",
                    ].map((item) => (
                      <li key={item} className="text-[11px] text-loreal-slate">{item}</li>
                    ))}
                    <li className="text-[11px] text-loreal-muted mt-2">✗  We will never access your DMs or post without your approval.</li>
                  </ul>
                </div>
              )}

              <div className="mb-6">
                <label className="text-[11px] uppercase tracking-[0.12em] text-loreal-muted block mb-2">
                  {platform === "email" ? "Email address" : "Email address (for notifications)"}
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-loreal-border px-4 py-3 text-sm text-loreal-charcoal bg-white focus:outline-none focus:border-loreal-champagne font-sans placeholder:text-loreal-muted/60"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep("method")} className="btn-outline text-sm px-6 flex-shrink-0">Back</button>
                <button
                  onClick={() => setStep("details")}
                  disabled={!email.includes("@")}
                  className={`btn-primary text-sm flex-1 ${!email.includes("@") ? "opacity-30 cursor-not-allowed" : ""}`}
                >
                  {platform !== "email" ? `Connect ${platform === "instagram" ? "Instagram" : "Facebook"} →` : "Continue →"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Demographics ── */}
          {step === "details" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <div className="eyebrow mb-4">Your Profile · Step 3 of 3</div>
              <h2 className="heading-md mb-1">A little about you</h2>
              <p className="body-sm mb-8">
                Your gender and age help us recommend fragrances created for you — and ensure our community analytics reflect real diversity.
              </p>

              {/* Name */}
              <div className="mb-5">
                <label className="text-[11px] uppercase tracking-[0.12em] text-loreal-muted block mb-2">Display Name</label>
                <input
                  type="text"
                  placeholder="How you'll appear in the community"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-loreal-border px-4 py-3 text-sm text-loreal-charcoal bg-white focus:outline-none focus:border-loreal-champagne font-sans placeholder:text-loreal-muted/60"
                />
              </div>

              {/* Gender */}
              <div className="mb-5">
                <label className="text-[11px] uppercase tracking-[0.12em] text-loreal-muted block mb-2">I identify as</label>
                <div className="grid grid-cols-2 gap-2">
                  {GENDER_OPTIONS.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`py-2.5 px-4 text-sm border text-left transition-all ${gender === g
                        ? "border-loreal-champagne bg-loreal-cream/60 text-loreal-charcoal font-medium"
                        : "border-loreal-border bg-white text-loreal-muted hover:border-loreal-champagne/40"
                        }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Range */}
              <div className="mb-8">
                <label className="text-[11px] uppercase tracking-[0.12em] text-loreal-muted block mb-2">Age Range</label>
                <div className="grid grid-cols-3 gap-2">
                  {AGE_RANGES.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAgeRange(a)}
                      className={`py-2.5 text-sm border text-center transition-all ${ageRange === a
                        ? "border-loreal-champagne bg-loreal-cream/60 text-loreal-charcoal font-medium"
                        : "border-loreal-border bg-white text-loreal-muted hover:border-loreal-champagne/40"
                        }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-loreal-muted mt-2">Used only to personalise your fragrance recommendations and community analytics.</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep("social")} className="btn-outline text-sm px-6 flex-shrink-0">Back</button>
                <button
                  onClick={handleJoin}
                  disabled={!canContinueDetails}
                  className={`btn-primary text-sm flex-1 ${!canContinueDetails ? "opacity-30 cursor-not-allowed" : ""}`}
                >
                  Join SCENTHOOD →
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </main>
  );
}
