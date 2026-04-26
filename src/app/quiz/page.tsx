"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import {
  quizQuestions,
  scentIdentities,
  brandPerfumeCatalog,
  ScentProfile,
  BrandPerfume,
} from "@/lib/data";

type Gender = "f" | "m" | "n";
type AgeGroup = "young" | "mid" | "mature";

function getAgeGroup(age: number): AgeGroup {
  if (age < 30) return "young";
  if (age < 45) return "mid";
  return "mature";
}

// Family → visual identity
const familyPalettes: Record<string, { bg: string; accent: string; glow: string; symbol: string; label: string }> = {
  Floral:   { bg: "from-[#2A1520] to-[#1A1018]", accent: "#D4A5A5", glow: "rgba(212,165,165,0.18)", symbol: "✿", label: "Floral" },
  Woody:    { bg: "from-[#1E1812] to-[#141008]", accent: "#C9A96E", glow: "rgba(201,169,110,0.18)", symbol: "✦", label: "Woody" },
  Amber:    { bg: "from-[#231A0C] to-[#160F05]", accent: "#D4A060", glow: "rgba(212,160,96,0.2)",  symbol: "◈", label: "Amber" },
  Citrus:   { bg: "from-[#1A1E10] to-[#101408]", accent: "#B8C46A", glow: "rgba(184,196,106,0.16)", symbol: "◉", label: "Citrus" },
  Fresh:    { bg: "from-[#0E1A1E] to-[#080F14]", accent: "#7ABCCC", glow: "rgba(122,188,204,0.18)", symbol: "◇", label: "Fresh" },
  Gourmand: { bg: "from-[#1E1010] to-[#140808]", accent: "#C97060", glow: "rgba(201,112,96,0.18)",  symbol: "✧", label: "Gourmand" },
  Oriental: { bg: "from-[#18101E] to-[#100814]", accent: "#9070B8", glow: "rgba(144,112,184,0.18)", symbol: "◆", label: "Oriental" },
  Aquatic:  { bg: "from-[#0C1620] to-[#080E18]", accent: "#60A0C8", glow: "rgba(96,160,200,0.16)",  symbol: "∿", label: "Aquatic" },
  default:  { bg: "from-[#1A1A16] to-[#111110]", accent: "#A48B75", glow: "rgba(164,139,117,0.18)", symbol: "✦", label: "Fragrance" },
};

function getFamilyPalette(families: string[]) {
  for (const f of families) {
    if (familyPalettes[f]) return familyPalettes[f];
  }
  return familyPalettes.default;
}

function pickBrandPerfume(brandPerfs: BrandPerfume[], primaryFamily: string): BrandPerfume {
  const match = brandPerfs.find((p) => p.families.some((f) => f.toLowerCase() === primaryFamily));
  return match ?? brandPerfs[0];
}

function resolveIdentity(families: string[], gender: Gender, ageGroup: AgeGroup, brandPreference?: string): ScentProfile {
  const primaryFamily =
    families.includes("Floral") ? "floral" :
    families.includes("Amber") || families.includes("Woody") ? "amber" :
    families.includes("Citrus") || families.includes("Fresh") ? "citrus" : "default";

  const key1 = `${primaryFamily}_${gender}_${ageGroup}`;
  const key2 = `${primaryFamily}_n_${ageGroup}`;
  const key3 = `${primaryFamily}_${gender}_young`;
  const key4 = `default_${gender}`;
  const key5 = "default_n";

  const baseIdentity =
    scentIdentities[key1] ?? scentIdentities[key2] ?? scentIdentities[key3] ??
    scentIdentities[key4] ?? scentIdentities[key5]!;

  if (brandPreference && brandPerfumeCatalog[brandPreference]) {
    const catalog = brandPerfumeCatalog[brandPreference];
    const genderPool =
      gender === "n" ? [...(catalog.n ?? []), ...(catalog.f ?? []), ...(catalog.m ?? [])] :
      gender === "f" ? [...(catalog.f ?? []), ...(catalog.n ?? [])] :
      [...(catalog.m ?? []), ...(catalog.n ?? [])];

    if (genderPool.length > 0) {
      const pick = pickBrandPerfume(genderPool, primaryFamily);
      return { ...baseIdentity, recommendedFragrance: pick.fullName, perfumeImage: pick.image, perfumeNotes: pick.notes, favBrand: brandPreference };
    }
  }
  return baseIdentity;
}

// ── Profile Step ──
function ProfileStep({ gender, setGender, age, setAge, onNext }: {
  gender: Gender | null; setGender: (g: Gender) => void;
  age: string; setAge: (a: string) => void; onNext: () => void;
}) {
  const canContinue = gender !== null && Number(age) >= 13 && Number(age) <= 100;
  return (
    <div className="max-w-xl mx-auto w-full">
      <div className="eyebrow mb-4">About You</div>
      <h2 className="heading-md mb-1">A few quick details</h2>
      <p className="body-sm mb-8">Fragrance is deeply personal — your gender and age help us recommend scents created for you.</p>

      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-[0.12em] text-loreal-muted mb-3">I identify as</div>
        <div className="flex gap-2">
          {([{ val: "f" as Gender, label: "Woman" }, { val: "m" as Gender, label: "Man" }, { val: "n" as Gender, label: "Non-binary" }] as const).map((opt) => (
            <motion.button key={opt.val} whileTap={{ scale: 0.97 }} onClick={() => setGender(opt.val)}
              className={`flex-1 py-3 text-sm font-medium border transition-all ${gender === opt.val ? "border-loreal-champagne bg-loreal-cream text-loreal-charcoal" : "border-loreal-border bg-white text-loreal-muted hover:border-loreal-champagne/40"}`}>
              {opt.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-[11px] uppercase tracking-[0.12em] text-loreal-muted mb-3">My age</div>
        <input type="number" min={13} max={100} placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)}
          className="w-full border border-loreal-border px-4 py-3 text-sm text-loreal-charcoal bg-white focus:outline-none focus:border-loreal-champagne font-sans placeholder:text-loreal-muted/60" />
      </div>

      <motion.button onClick={onNext} disabled={!canContinue} whileTap={{ scale: 0.98 }}
        className={`btn-primary text-sm w-full ${!canContinue ? "opacity-30 cursor-not-allowed" : ""}`}>
        Continue →
      </motion.button>
    </div>
  );
}

// ── Elegant family-matched perfume visual ──
function PerfumePlaceholder({ families, name }: { families: string[]; name: string }) {
  const palette = getFamilyPalette(families);
  return (
    <div className={`w-full h-full bg-gradient-to-b ${palette.bg} flex flex-col items-center justify-center gap-3 relative overflow-hidden`}>
      {/* Ambient rings */}
      <motion.div
        className="absolute rounded-full border opacity-10"
        style={{ width: 120, height: 120, borderColor: palette.accent }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full border opacity-5"
        style={{ width: 180, height: 180, borderColor: palette.accent }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      {/* Symbol */}
      <motion.div
        className="font-serif text-5xl z-10"
        style={{ color: palette.accent }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {palette.symbol}
      </motion.div>
      {/* Family label */}
      <div className="text-[9px] uppercase tracking-[0.25em] z-10" style={{ color: palette.accent + "99" }}>
        {palette.label}
      </div>
    </div>
  );
}

export default function QuizPage() {
  const [stage, setStage] = useState<"profile" | "quiz" | "result">("profile");
  const [gender, setGender] = useState<Gender | null>(null);
  const [age, setAge] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  const currentQ = quizQuestions[step];
  const progress = ((step + 1) / quizQuestions.length) * 100;

  const toggleAnswer = (option: string) => {
    const current = answers[step] || [];
    if (currentQ.multi) {
      setAnswers({ ...answers, [step]: current.includes(option) ? current.filter((a) => a !== option) : [...current, option] });
    } else {
      setAnswers({ ...answers, [step]: [option] });
    }
  };

  const nextQuestion = () => {
    if (step < quizQuestions.length - 1) setStep(step + 1);
    else setStage("result");
  };

  const brandPref = answers[4]?.[0];
  const identity = stage === "result" ? resolveIdentity(answers[0] || [], gender!, getAgeGroup(Number(age)), brandPref) : null;

  // ── RESULT ──
  if (stage === "result" && identity) {
    const palette = getFamilyPalette(identity.families);

    return (
      <main className={`min-h-screen bg-gradient-to-b ${palette.bg} flex items-center justify-center px-5 py-12 relative overflow-hidden`}>
        {/* Ambient radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: `radial-gradient(circle, ${palette.glow}, transparent 70%)` }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="max-w-lg w-full relative z-10">

          {/* Top accent line */}
          <div className="h-px bg-champagne-gradient" />

          {/* Dark hero section */}
          <div className="px-8 pt-10 pb-8 text-center" style={{ background: "rgba(20,16,12,0.92)" }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="eyebrow mb-5" style={{ color: palette.accent }}>
              Your Scent Identity
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }}>
              <h1 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight mb-3">
                {identity.identityTitle}
              </h1>
            </motion.div>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
              className="w-10 h-px mx-auto mb-5" style={{ background: palette.accent }} />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
              className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">
              {identity.identityDescription}
            </motion.p>

            {/* Mood tags */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
              className="flex flex-wrap gap-2 justify-center mt-6">
              {identity.moods.map((mood, i) => (
                <motion.span key={mood} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.07 }}
                  className="text-[9px] uppercase tracking-[0.15em] px-3 py-1 border font-medium"
                  style={{ borderColor: palette.accent + "40", color: palette.accent + "CC", background: palette.accent + "10" }}>
                  {mood}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Perfume recommendation */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-loreal-cream border-t border-loreal-border/40">
            <div className="flex">
              {/* Visual panel */}
              <div className="w-36 h-48 flex-shrink-0 relative overflow-hidden">
                <PerfumePlaceholder families={identity.families} name={identity.recommendedFragrance} />
              </div>

              {/* Details */}
              <div className="flex-1 p-5 flex flex-col justify-center">
                <div className="eyebrow mb-2 text-[9px]">Your L&apos;Oréal Luxe Match</div>
                <div className="font-serif text-lg text-loreal-charcoal font-light leading-snug mb-2">
                  {identity.recommendedFragrance}
                </div>
                {brandPref && (
                  <div className="text-[10px] text-loreal-champagne uppercase tracking-[0.15em] font-medium mb-2">
                    {brandPref}
                  </div>
                )}
                {identity.perfumeNotes && (
                  <p className="text-[11px] text-loreal-muted leading-relaxed mb-3">{identity.perfumeNotes}</p>
                )}
                {/* Scent families */}
                <div className="flex flex-wrap gap-1.5">
                  {identity.families.map((f) => (
                    <span key={f} className="text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 bg-loreal-sand text-loreal-gold border border-loreal-champagne/30">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scent DNA bars */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="bg-loreal-white px-6 py-5 border-t border-loreal-border">
            <div className="eyebrow mb-3 text-[9px]">Scent DNA</div>
            <div className="space-y-2.5">
              {identity.families.slice(0, 3).map((family, i) => {
                const widths = [100, 65, 40];
                return (
                  <div key={family}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-loreal-slate font-medium">{family}</span>
                      <span className="text-loreal-champagne">{widths[i]}%</span>
                    </div>
                    <div className="h-1 bg-loreal-border overflow-hidden">
                      <motion.div className="h-full bg-loreal-champagne"
                        initial={{ width: 0 }}
                        animate={{ width: `${widths[i]}%` }}
                        transition={{ duration: 1, delay: 1.0 + i * 0.15, ease: "easeOut" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="p-5 bg-loreal-white border-t border-loreal-border flex flex-col sm:flex-row gap-3">
            <Link href="/signup" className="btn-primary text-sm flex-1 text-center">
              Join SCENTHOOD →
            </Link>
            <Link href="/referral" className="btn-outline text-sm flex-1 text-center">
              Share &amp; Get 15% Off
            </Link>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  // ── PROFILE STEP ──
  if (stage === "profile") {
    return (
      <main className="min-h-screen bg-loreal-white flex flex-col">
        <div className="border-b border-loreal-border px-5 py-4">
          <div className="max-w-xl mx-auto">
            <Link href="/" className="font-serif text-loreal-charcoal text-base tracking-[0.2em]">SCENTHOOD</Link>
          </div>
          <div className="max-w-xl mx-auto mt-3">
            <div className="progress-rail"><div className="progress-fill" style={{ width: "0%" }} /></div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center py-12 px-5">
          <ProfileStep gender={gender} setGender={setGender} age={age} setAge={setAge} onNext={() => setStage("quiz")} />
        </div>
      </main>
    );
  }

  // ── QUIZ STEP ──
  return (
    <main className="min-h-screen bg-loreal-white flex flex-col">
      <div className="border-b border-loreal-border px-5 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif text-loreal-charcoal text-base tracking-[0.2em]">SCENTHOOD</Link>
          <span className="body-sm text-[11px]">{step + 1} of {quizQuestions.length}</span>
        </div>
        <div className="max-w-xl mx-auto mt-3">
          <div className="progress-rail">
            <motion.div className="progress-fill" initial={{ width: 0 }}
              animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: "easeInOut" }} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 px-5">
        <div className="max-w-xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
              <div className="eyebrow mb-4">Question {step + 1}</div>
              <h2 className="heading-md mb-1">{currentQ.question}</h2>
              <p className="body-sm mb-8">{currentQ.hint}</p>

              <div className="space-y-2">
                {currentQ.options.map((opt, oi) => {
                  const selected = (answers[step] || []).includes(opt.label);
                  return (
                    <motion.button key={opt.label} onClick={() => toggleAnswer(opt.label)}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: oi * 0.06 }}
                      whileTap={{ scale: 0.99 }}
                      whileHover={{ x: 2 }}
                      className={`w-full flex items-center gap-4 p-4 border transition-all text-left ${
                        selected ? "border-loreal-champagne bg-loreal-cream" : "border-loreal-border bg-white hover:border-loreal-champagne/40 hover:bg-loreal-cream/40"
                      }`}>
                      <span className="text-xl w-8 text-center flex-shrink-0">{opt.icon}</span>
                      <div className="flex-1">
                        <div className={`font-sans text-sm font-medium ${selected ? "text-loreal-charcoal" : "text-loreal-slate"}`}>
                          {opt.label}
                        </div>
                        <div className="body-sm text-[11px]">{opt.description}</div>
                      </div>
                      <motion.div animate={{ scale: selected ? 1 : 1, backgroundColor: selected ? "#A48B75" : "transparent" }}
                        className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all ${
                          selected ? "border-loreal-champagne bg-loreal-champagne" : "border-loreal-border"
                        }`}>
                        {selected && <span className="text-white text-[10px]">✓</span>}
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-loreal-border px-5 py-4">
        <div className="max-w-xl mx-auto flex gap-3">
          <motion.button whileTap={{ scale: 0.98 }} onClick={() => step === 0 ? setStage("profile") : setStep(step - 1)}
            className="btn-outline text-sm flex-shrink-0 px-6">Back</motion.button>
          <motion.button whileTap={{ scale: 0.98 }} onClick={nextQuestion}
            disabled={!(answers[step]?.length > 0)}
            className={`btn-primary text-sm flex-1 ${!(answers[step]?.length > 0) ? "opacity-30 cursor-not-allowed" : ""}`}>
            {step === quizQuestions.length - 1 ? "Reveal My Identity" : "Continue"}
          </motion.button>
        </div>
      </div>
    </main>
  );
}
