"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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

function StepHeader({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="eyebrow mb-4">{label}</div>
      <h2 className="display-lg text-scent-noir mb-3">{title}</h2>
      <p className="text-scent-darkOud mb-8 leading-relaxed">{sub}</p>
    </motion.div>
  );
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
      name: name.trim(), email, gender, ageRange, platform, initials,
      tier: "Scenthooders", lis: 0,
      joinDate: new Date().toISOString(),
      referralCode: generateReferralCode(name),
      recentActivity: [] as { action: string; points: number; date: string }[],
      votingQuality: 0, contentOutput: 0, peerEndorsement: 0, sessionAttendance: 0,
    };
    try { localStorage.setItem("scenthood_user", JSON.stringify(profile)); } catch {}
    setStep("done");
  };

  // ── DONE STATE ──
  if (step === "done") {
    return (
      <main className="min-h-screen bg-scent-noir text-scent-parchment flex items-center justify-center px-5 relative overflow-hidden grain">
        <div className="absolute inset-0 opacity-25">
          <Image src="/assets/home-hero.jpg" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-scent-noir/60" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-lg w-full text-center py-16">
          <div className="eyebrow text-scent-gold mb-6">Welcome to SCENTHOOD</div>
          <h2 className="display-hero text-scent-parchment leading-none mb-8">You&apos;re in.</h2>
          <p className="text-scent-parchment/85 mb-12 max-w-md mx-auto leading-relaxed">
            Your membership is active. Discover your scent identity and join the community shaping the future of fragrance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quiz" className="pill pill-gold text-[12px] px-6 py-3">
              Discover My Scent Identity →
            </Link>
            <Link href="/home" className="pill pill-parchment text-[12px] px-6 py-3">
              Explore Community
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-scent-parchment grid md:grid-cols-2">
      {/* === LEFT: Editorial image panel (desktop only) === */}
      <aside className="hidden md:block relative bg-scent-noir overflow-hidden grain">
        <Image src="/assets/home-hero.jpg" alt="" fill className="object-cover" sizes="50vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-scent-noir/30 via-scent-noir/20 to-scent-noir/80" />
        <div className="relative z-10 h-full flex flex-col justify-between p-10">
          <div className="flex items-center gap-3">
            <div className="logo-mark">S<span className="text-scent-gold">·</span>H</div>
            <span className="eyebrow text-scent-gold">Brandstorm 2026</span>
          </div>
          <div>
            <div className="eyebrow text-scent-gold mb-3">Join the community</div>
            <h1 className="display-xl text-scent-parchment leading-none">A fragrance,<br/>in your words.</h1>
            <p className="mt-5 text-scent-parchment/80 max-w-sm leading-relaxed">
              For people who take fragrance seriously — discover, share, and grow through the scents that define you.
            </p>
          </div>
        </div>
      </aside>

      {/* === RIGHT: Form panel === */}
      <section className="flex flex-col min-h-screen">
        {/* Mobile header */}
        <div className="md:hidden border-b-2 border-scent-noir px-5 py-4 flex items-center gap-3">
          <Link href="/" className="logo-mark">S<span className="text-scent-gold">·</span>H</Link>
          <span className="eyebrow">Create Account</span>
        </div>

        {/* Step progress */}
        <div className="px-5 md:px-12 pt-6 md:pt-10">
          <div className="max-w-lg mx-auto flex gap-2">
            {(["method", "social", "details"] as Step[]).map((s, i) => (
              <div key={s}
                className={`flex-1 h-1 transition-all ${["method", "social", "details"].indexOf(step) >= i ? "bg-scent-noir" : "bg-scent-noir/15"}`} />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center py-10 px-5 md:px-12">
          <div className="max-w-lg mx-auto w-full">

            {step === "method" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <StepHeader label="Join SCENTHOOD" title="Create your account."
                  sub="Connect with your existing social accounts for a seamless experience — or sign up with email." />

                <div className="space-y-3 mb-6">
                  <button onClick={() => { setPlatform("instagram"); setStep("social"); }}
                    className="w-full flex items-center gap-4 py-4 px-5 border-2 border-scent-noir bg-scent-parchment hover:bg-scent-alabaster transition-all text-left">
                    <span className="text-[#E1306C]"><MetaIcon platform="instagram" /></span>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-scent-noir">Continue with Instagram</div>
                      <div className="text-[11px] text-loreal-muted">Share your reviews to your Stories</div>
                    </div>
                    <span className="text-scent-noir">→</span>
                  </button>

                  <button onClick={() => { setPlatform("facebook"); setStep("social"); }}
                    className="w-full flex items-center gap-4 py-4 px-5 border-2 border-scent-noir bg-scent-parchment hover:bg-scent-alabaster transition-all text-left">
                    <span className="text-[#1877F2]"><MetaIcon platform="facebook" /></span>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-scent-noir">Continue with Facebook</div>
                      <div className="text-[11px] text-loreal-muted">Sync your social graph with the community</div>
                    </div>
                    <span className="text-scent-noir">→</span>
                  </button>

                  <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-scent-noir/15" />
                    <span className="text-[10px] text-loreal-muted uppercase tracking-[0.2em] font-bold">or</span>
                    <div className="flex-1 h-px bg-scent-noir/15" />
                  </div>

                  <button onClick={() => { setPlatform("email"); setStep("social"); }}
                    className="w-full flex items-center gap-4 py-4 px-5 border-2 border-scent-noir bg-scent-parchment hover:bg-scent-alabaster transition-all text-left">
                    <span className="text-scent-noir text-lg">✉</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-scent-noir">Sign up with Email</div>
                      <div className="text-[11px] text-loreal-muted">Classic email and password</div>
                    </div>
                    <span className="text-scent-noir">→</span>
                  </button>
                </div>

                <p className="text-[10px] text-loreal-muted text-center leading-relaxed">
                  By joining, you agree to our Terms of Use and Privacy Policy. We will never post without your permission.
                </p>

                <div className="mt-5 text-center">
                  <span className="text-[11px] text-loreal-muted">Already a member? </span>
                  <Link href="/home" className="text-[11px] text-scent-gold hover:text-scent-noir font-bold">Sign in →</Link>
                </div>
              </motion.div>
            )}

            {step === "social" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <StepHeader
                  label={`${platform === "instagram" ? "Instagram" : platform === "facebook" ? "Facebook" : "Email"} · Step 2 of 3`}
                  title={platform === "email" ? "Your email address." : `Connect ${platform === "instagram" ? "Instagram" : "Facebook"}.`}
                  sub={platform === "email"
                    ? "We'll send you a verification link."
                    : `Connecting ${platform} lets you share reviews and earn LIS directly from your ${platform} posts. We never post without your permission.`} />

                {platform !== "email" && (
                  <div className="border-2 border-scent-noir bg-scent-noir text-scent-parchment p-5 mb-6">
                    <div className="eyebrow text-scent-gold mb-3">What we&apos;ll access via Meta API</div>
                    <ul className="space-y-1.5 text-[12px]">
                      {[
                        "✓  Your display name and profile photo",
                        "✓  Follower count (to calibrate your LIS reach bonus)",
                        "✓  Ability to publish posts you explicitly approve",
                      ].map((item) => (<li key={item}>{item}</li>))}
                      <li className="text-scent-parchment/60 pt-2">✗  We will never access your DMs or post without your approval.</li>
                    </ul>
                  </div>
                )}

                <div className="mb-8">
                  <label className="eyebrow block mb-2">
                    {platform === "email" ? "Email address" : "Email address (for notifications)"}
                  </label>
                  <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-scent-noir px-4 py-3 text-base text-scent-noir bg-scent-parchment focus:outline-none focus:bg-scent-alabaster font-medium placeholder:text-scent-noir/40" />
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("method")} className="pill pill-parchment text-[12px] px-6 py-2.5 flex-shrink-0">Back</button>
                  <button onClick={() => setStep("details")} disabled={!email.includes("@")}
                    className={`pill pill-gold text-[12px] flex-1 py-2.5 ${!email.includes("@") ? "opacity-30 cursor-not-allowed" : ""}`}>
                    {platform !== "email" ? `Connect ${platform === "instagram" ? "Instagram" : "Facebook"} →` : "Continue →"}
                  </button>
                </div>
              </motion.div>
            )}

            {step === "details" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <StepHeader label="Your Profile · Step 3 of 3" title="A little about you."
                  sub="Your gender and age help us recommend fragrances created for you — and ensure our community analytics reflect real diversity." />

                <div className="mb-5">
                  <label className="eyebrow block mb-2">Display Name</label>
                  <input type="text" placeholder="How you'll appear in the community" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-scent-noir px-4 py-3 text-base text-scent-noir bg-scent-parchment focus:outline-none focus:bg-scent-alabaster font-medium placeholder:text-scent-noir/40" />
                </div>

                <div className="mb-5">
                  <label className="eyebrow block mb-3">I identify as</label>
                  <div className="grid grid-cols-2 gap-2">
                    {GENDER_OPTIONS.map((g) => (
                      <button key={g} onClick={() => setGender(g)}
                        className={`py-3 px-4 text-sm border-2 border-scent-noir text-left transition-all font-bold ${gender === g ? "bg-scent-gold text-scent-noir" : "bg-scent-parchment text-scent-noir hover:bg-scent-alabaster"}`}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="eyebrow block mb-3">Age Range</label>
                  <div className="grid grid-cols-3 gap-2">
                    {AGE_RANGES.map((a) => (
                      <button key={a} onClick={() => setAgeRange(a)}
                        className={`py-3 text-sm border-2 border-scent-noir text-center transition-all font-bold ${ageRange === a ? "bg-scent-gold text-scent-noir" : "bg-scent-parchment text-scent-noir hover:bg-scent-alabaster"}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-loreal-muted mt-2">Used only to personalise your fragrance recommendations and community analytics.</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("social")} className="pill pill-parchment text-[12px] px-6 py-2.5 flex-shrink-0">Back</button>
                  <button onClick={handleJoin} disabled={!canContinueDetails}
                    className={`pill pill-gold text-[12px] flex-1 py-2.5 ${!canContinueDetails ? "opacity-30 cursor-not-allowed" : ""}`}>
                    Join SCENTHOOD →
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>
    </main>
  );
}
