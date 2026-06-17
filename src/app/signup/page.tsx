"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createProfile, getProfileByReferralCode, recordReferral } from "@/lib/supabase";

type Step = "method" | "social" | "details" | "done";
type Platform = "meta" | "tiktok" | "email";

const GENDER_OPTIONS = ["Woman", "Man", "Non-binary / Other", "Prefer not to say"];
const AGE_RANGES = ["13–17", "18–24", "25–34", "35–44", "45–54", "55+"];

function SocialIcon({ platform }: { platform: "meta" | "tiktok" }) {
  if (platform === "meta") {
    return (
      <svg width="22" height="22" viewBox="0 0 287.5 191" fill="none" aria-label="Meta">
        <defs>
          <linearGradient id="meta-g1" x1="62.3" y1="139.5" x2="225.6" y2="121.7" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0064E1"/>
            <stop offset="0.4" stopColor="#0064E1"/>
            <stop offset="0.83" stopColor="#0073EE"/>
            <stop offset="1" stopColor="#0082FB"/>
          </linearGradient>
          <linearGradient id="meta-g2" x1="42.6" y1="155.2" x2="42.6" y2="94.7" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0082FB"/>
            <stop offset="1" stopColor="#0064E0"/>
          </linearGradient>
        </defs>
        <path d="M31.1 126.7c0 11 2.4 19.5 5.6 24.6 4.2 6.8 10.4 9.6 16.8 9.6 8.2 0 15.7-2 30.2-22 11.6-16.1 25.3-38.6 34.5-52.8l15.6-23.9c10.8-16.6 23.3-35 37.6-47.5C183.1 4.5 195.7 0 208.4 0c21.3 0 41.6 12.4 57.1 35.5C282.6 60.8 290.9 92.7 290.9 125.6c0 19.6-3.9 34-10.5 45.3-6.3 11-18.6 21.9-39.3 21.9V161.9c17.7 0 22.1-16.3 22.1-35 0-26.6-6.2-56.1-19.9-77.2-9.7-15-22.3-24.1-36.1-24.1-15 0-27.1 11.3-40.6 31.5-7.2 10.7-14.6 23.8-22.9 38.6L135 110.4c-22.6 40.3-28.3 49.5-39.6 64.5-19.8 26.3-36.7 36.2-58.9 36.2-21.5 0-35.1-9.3-43.5-23.4C-13.8 176.3-17.4 161.4-17.4 144.4l48.5-17.7z" fill="#0081FB"/>
        <path d="M20.8 39.1C35.2 16.9 56 1.4 79.9 1.4c13.8 0 27.5 4.1 41.8 15.8 15.6 12.8 32.3 33.9 53.1 68.7l7.5 12.5c18 30.1 28.3 45.6 34.3 52.9 7.7 9.3 13.1 12.1 20.1 12.1 17.7 0 22.1-16.3 22.1-35l42.7-1.3c0 19.6-3.9 34-10.5 45.3-6.3 11-18.6 21.9-39.3 21.9-12.9 0-24.3-2.8-36.9-14.7-9.7-9.1-21-25.3-29.7-39.8L160 100.8c-12.8-21.4-24.5-37.4-31.3-44.6-7.3-7.8-16.7-17.2-31.7-17.2-12.1 0-22.4 8.5-31 21.5L20.8 39.1z" fill="url(#meta-g1)"/>
        <path d="M79.9 39c-12.1 0-22.4 8.5-31 21.5C36.7 79 29.3 106.6 29.3 132.9c0 11 2.4 19.5 5.6 24.6L-7.8 184.7C-13.8 176.3-17.4 161.4-17.4 144.4c0-30.4 8.3-62 24.2-86.4C20.8 36.7 39.7 16.5 67.3 8.8c4.2-1.2 8.4-2 12.6-2v32.2z" fill="url(#meta-g2)"/>
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.49a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.92Z"/>
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

function generateOAuthUrl(platform: "meta" | "tiktok"): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? (typeof window !== "undefined" ? window.location.origin : "");
  if (platform === "meta") {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_META_APP_ID ?? "",
      redirect_uri: `${appUrl}/api/auth/meta/callback`,
      scope: "email,public_profile",
      response_type: "code",
    });
    return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
  } else {
    const params = new URLSearchParams({
      client_key: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY ?? "",
      redirect_uri: `${appUrl}/api/auth/tiktok/callback`,
      scope: "user.info.basic",
      response_type: "code",
    });
    return `https://www.tiktok.com/v2/auth/authorize?${params.toString()}`;
  }
}

function SignupPageInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("method");
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [authError, setAuthError] = useState("");

  // Handle OAuth callback — prefill from URL params
  useEffect(() => {
    const urlStep = searchParams.get("step");
    const urlPlatform = searchParams.get("platform") as Platform | null;
    const urlName = searchParams.get("name");
    const urlEmail = searchParams.get("email");
    const urlError = searchParams.get("auth_error");

    if (urlError) {
      setAuthError(urlError === "meta_denied" ? "Meta login was cancelled." : urlError === "tiktok_denied" ? "TikTok login was cancelled." : "Authentication failed. Please try again.");
    }
    if (urlStep === "details") {
      if (urlPlatform) setPlatform(urlPlatform);
      if (urlName) setName(urlName);
      if (urlEmail) setEmail(urlEmail);
      setStep("details");
    }
  }, [searchParams]);
  const [referralInput, setReferralInput] = useState("");
  const [referralStatus, setReferralStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [referralReferrerName, setReferralReferrerName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canContinueDetails = gender !== "" && ageRange !== "" && name.trim() !== "";

  const handleReferralCheck = async (code: string) => {
    const trimmed = code.trim().toUpperCase();
    setReferralInput(trimmed);
    if (!trimmed) { setReferralStatus("idle"); setReferralReferrerName(""); return; }
    const referrer = await getProfileByReferralCode(trimmed);
    if (referrer) {
      setReferralStatus("valid");
      setReferralReferrerName(referrer.name);
    } else {
      setReferralStatus("invalid");
      setReferralReferrerName("");
    }
  };

  const handleJoin = async () => {
    setSubmitting(true);
    const initials = name.trim().split(" ").map((w) => w[0]?.toUpperCase() ?? "").join("").slice(0, 2) || "SC";
    const referralCode = generateReferralCode(name);
    const validReferral = referralStatus === "valid" ? referralInput.trim().toUpperCase() : undefined;

    // Save to Supabase
    const dbProfile = await createProfile({
      name: name.trim(), email, initials, referral_code: referralCode,
      referred_by: validReferral,
      gender, age_range: ageRange, platform: platform ?? "email",
    });

    // Award LIS to referrer if a valid code was used
    if (validReferral) {
      await recordReferral(validReferral, name.trim(), email);
    }

    // Save to localStorage for local session
    const profile = {
      name: name.trim(), email, gender, ageRange, platform, initials,
      tier: "Scenthooders", lis: 0,
      joinDate: new Date().toISOString(),
      referralCode,
      referredBy: validReferral ?? null,
      supabaseId: dbProfile?.id ?? null,
      recentActivity: [] as { action: string; points: number; date: string }[],
      votingQuality: 0, contentOutput: 0, peerEndorsement: 0, sessionAttendance: 0,
    };
    try { localStorage.setItem("scenthood_user", JSON.stringify(profile)); } catch {}
    setSubmitting(false);
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
            <Link href="/home" className="logo-mark">S</Link>
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
          <Link href="/home" className="logo-mark">S</Link>
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

                {authError && (
                  <div className="mb-4 border border-red-300 bg-red-50 text-red-700 text-[12px] px-4 py-3">
                    {authError}
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <a href={generateOAuthUrl("meta")}
                    className="w-full flex items-center gap-4 py-4 px-5 border-2 border-scent-noir bg-scent-parchment hover:bg-scent-alabaster transition-all text-left">
                    <span className="text-[#0866FF]"><SocialIcon platform="meta" /></span>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-scent-noir">Continue with Meta</div>
                      <div className="text-[11px] text-loreal-muted">Connect Instagram, Facebook & Threads in one tap</div>
                    </div>
                    <span className="text-scent-noir">→</span>
                  </a>

                  <a href={generateOAuthUrl("tiktok")}
                    className="w-full flex items-center gap-4 py-4 px-5 border-2 border-scent-noir bg-scent-parchment hover:bg-scent-alabaster transition-all text-left">
                    <span className="text-scent-noir"><SocialIcon platform="tiktok" /></span>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-scent-noir">Continue with TikTok</div>
                      <div className="text-[11px] text-loreal-muted">Share your fragrance reviews to your feed</div>
                    </div>
                    <span className="text-scent-noir">→</span>
                  </a>

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
                  label={`${platform === "meta" ? "Meta" : platform === "tiktok" ? "TikTok" : "Email"} · Step 2 of 3`}
                  title={platform === "email" ? "Your email address." : `Connect ${platform === "meta" ? "Meta" : "TikTok"}.`}
                  sub={platform === "email"
                    ? "We'll send you a verification link."
                    : `Connecting ${platform === "meta" ? "Meta" : "TikTok"} lets you share reviews and earn LIS directly from your posts. We never post without your permission.`} />

                {platform !== "email" && (
                  <div className="border-2 border-scent-noir bg-scent-noir text-scent-parchment p-5 mb-6">
                    <div className="eyebrow text-scent-gold mb-3">What we&apos;ll access via {platform === "meta" ? "Meta" : "TikTok"} API</div>
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
                    {platform !== "email" ? `Connect ${platform === "meta" ? "Meta" : "TikTok"} →` : "Continue →"}
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

                {/* Referral Code — optional */}
                <div className="mb-8">
                  <label className="eyebrow block mb-2">Referral Code <span className="text-loreal-muted normal-case tracking-normal font-normal">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="e.g. SCENT-LA-4821"
                    value={referralInput}
                    onChange={(e) => handleReferralCheck(e.target.value)}
                    className={`w-full border-2 px-4 py-3 text-base bg-scent-parchment focus:outline-none font-medium placeholder:text-scent-noir/30 tracking-widest uppercase
                      ${referralStatus === "valid" ? "border-green-600 bg-green-50" : referralStatus === "invalid" ? "border-red-400 bg-red-50" : "border-scent-noir"}`}
                  />
                  {referralStatus === "valid" && (
                    <p className="text-[11px] text-green-700 mt-1.5 font-medium">✓ Valid code — referred by <span className="font-bold">{referralReferrerName}</span>. They&apos;ll earn +50 LIS when you join.</p>
                  )}
                  {referralStatus === "invalid" && (
                    <p className="text-[11px] text-red-500 mt-1.5">✗ Code not found. Check it and try again, or leave it blank.</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("social")} className="pill pill-parchment text-[12px] px-6 py-2.5 flex-shrink-0">Back</button>
                  <button onClick={handleJoin} disabled={!canContinueDetails || submitting}
                    className={`pill pill-gold text-[12px] flex-1 py-2.5 ${(!canContinueDetails || submitting) ? "opacity-30 cursor-not-allowed" : ""}`}>
                    {submitting ? "Joining…" : "Join SCENTHOOD →"}
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

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-scent-parchment" />}>
      <SignupPageInner />
    </Suspense>
  );
}
