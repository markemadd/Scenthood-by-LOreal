"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import {
  quizQuestions,
  scentIdentities,
  brandPerfumeCatalog,
  ScentProfile,
  BrandPerfume,
} from "@/lib/data";
import { imageFor } from "@/lib/brandImages";

type Gender = "f" | "m" | "n";
type AgeGroup = "young" | "mid" | "mature";

function getAgeGroup(age: number): AgeGroup {
  if (age < 30) return "young";
  if (age < 45) return "mid";
  return "mature";
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
      <h2 className="display-lg text-scent-noir mb-3">A few quick details.</h2>
      <p className="text-scent-darkOud mb-10">Fragrance is deeply personal — your gender and age help us recommend scents created for you.</p>

      <div className="mb-8">
        <div className="eyebrow mb-3">I identify as</div>
        <div className="flex gap-2">
          {([{ val: "f" as Gender, label: "Woman" }, { val: "m" as Gender, label: "Man" }, { val: "n" as Gender, label: "Non-binary" }] as const).map((opt) => (
            <button key={opt.val} onClick={() => setGender(opt.val)}
              className={`flex-1 py-3 text-sm font-bold border-2 border-scent-noir transition-all font-sans ${gender === opt.val ? "bg-scent-gold text-scent-noir" : "bg-scent-parchment text-scent-noir hover:bg-scent-alabaster"}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="eyebrow mb-3">My age</div>
        <input type="number" min={13} max={100} placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)}
          className="w-full border-2 border-scent-noir px-4 py-3 text-base text-scent-noir bg-scent-parchment focus:outline-none focus:bg-scent-alabaster font-medium placeholder:text-scent-noir/40 font-sans" />
      </div>

      <button onClick={onNext} disabled={!canContinue}
        className={`pill pill-gold text-[12px] w-full py-3 ${!canContinue ? "opacity-30 cursor-not-allowed" : ""}`}>
        Continue →
      </button>
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
    const fragranceImage = imageFor(identity.recommendedFragrance, identity.favBrand ?? brandPref, 0);

    return (
      <main className="min-h-screen bg-scent-parchment">
        {/* Dark header */}
        <div className="bg-scent-noir text-scent-parchment px-5 pt-16 pb-12 text-center relative overflow-hidden grain">
          <div className="relative z-10 max-w-xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="eyebrow mb-5 text-scent-gold">Your Scent Identity</motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
              className="display-xl text-scent-parchment mb-4">
              {identity.identityTitle}
            </motion.h1>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
              className="w-12 h-px mx-auto mb-5 bg-champagne-gradient" />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
              className="text-scent-parchment/70 text-sm leading-relaxed max-w-md mx-auto font-sans">
              {identity.identityDescription}
            </motion.p>

            {/* Mood tags */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-2 justify-center mt-6">
              {identity.moods.map((mood, i) => (
                <motion.span key={mood} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 + i * 0.07 }}
                  className="text-[9px] uppercase tracking-[0.15em] px-3 py-1.5 border border-scent-gold/30 text-scent-gold/80 font-bold font-sans">
                  {mood}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Fragrance recommendation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
          className="max-w-xl mx-auto px-5 -mt-6 relative z-10">
          <div className="bg-scent-parchment border-2 border-scent-noir shadow-[0_6px_0_#0D0D0D]">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={fragranceImage}
                alt={identity.recommendedFragrance}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 576px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scent-noir/80 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <div className="eyebrow text-scent-gold mb-1.5">Your L&apos;Oréal Luxe Match</div>
                <div className="font-serif text-2xl text-scent-parchment font-light leading-tight">
                  {identity.recommendedFragrance}
                </div>
                {(identity.favBrand ?? brandPref) && (
                  <div className="text-[10px] text-scent-gold uppercase tracking-[0.18em] font-bold font-sans mt-1">
                    {identity.favBrand ?? brandPref}
                  </div>
                )}
              </div>
            </div>

            {/* Notes & families */}
            <div className="p-5">
              {identity.perfumeNotes && (
                <p className="text-sm text-scent-darkOud leading-relaxed mb-4 font-sans">{identity.perfumeNotes}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {identity.families.map((f) => (
                  <span key={f} className="text-[9px] uppercase tracking-[0.12em] px-2.5 py-1 bg-scent-gold/15 text-scent-goldDark border border-scent-gold/30 font-bold font-sans">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Scent DNA bars */}
            <div className="px-5 pb-5 border-t border-scent-noir/10 pt-4">
              <div className="eyebrow mb-3 text-[9px]">Scent DNA</div>
              <div className="space-y-3">
                {identity.families.slice(0, 3).map((family, i) => {
                  const widths = [100, 65, 40];
                  return (
                    <div key={family}>
                      <div className="flex justify-between text-[10px] mb-1.5 font-sans">
                        <span className="text-scent-noir font-semibold">{family}</span>
                        <span className="text-scent-goldDark font-bold">{widths[i]}%</span>
                      </div>
                      <div className="h-1.5 bg-scent-alabaster overflow-hidden">
                        <motion.div
                          className="h-full bg-champagne-gradient"
                          initial={{ width: 0 }}
                          animate={{ width: `${widths[i]}%` }}
                          transition={{ duration: 1, delay: 1.0 + i * 0.15, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="p-5 border-t border-scent-noir/10 flex flex-col sm:flex-row gap-3">
              <Link href="/signup" className="btn-primary text-sm flex-1 text-center">
                Join SCENTHOOD →
              </Link>
              <Link href="/referral" className="btn-outline text-sm flex-1 text-center">
                Share &amp; Get 15% Off
              </Link>
            </div>
          </div>

          <div className="text-center mt-8 pb-16">
            <button onClick={() => { setStage("profile"); setStep(0); setAnswers({}); setGender(null); setAge(""); }}
              className="text-[11px] uppercase tracking-[0.15em] text-loreal-muted hover:text-scent-noir transition-colors font-bold font-sans">
              Retake quiz →
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  // ── PROFILE STEP ──
  if (stage === "profile") {
    return (
      <main className="min-h-screen bg-scent-parchment flex flex-col">
        <div className="border-b-2 border-scent-noir px-5 py-4">
          <div className="max-w-xl mx-auto flex items-center gap-3">
            <Link href="/" className="logo-mark">S<span className="text-scent-gold">·</span>H</Link>
            <span className="eyebrow">Scent Identity Quiz</span>
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
    <main className="min-h-screen bg-scent-parchment flex flex-col">
      <div className="border-b-2 border-scent-noir px-5 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="logo-mark">S<span className="text-scent-gold">·</span>H</Link>
            <span className="eyebrow">Scent Identity Quiz</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-scent-noir font-sans">{step + 1} / {quizQuestions.length}</span>
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
              <h2 className="display-lg text-scent-noir mb-3">{currentQ.question}</h2>
              <p className="text-scent-darkOud mb-8 font-sans text-sm">{currentQ.hint}</p>

              <div className="space-y-2">
                {currentQ.options.map((opt, oi) => {
                  const selected = (answers[step] || []).includes(opt.label);
                  return (
                    <motion.button key={opt.label} onClick={() => toggleAnswer(opt.label)}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: oi * 0.06 }}
                      whileTap={{ scale: 0.99 }}
                      whileHover={{ x: 2 }}
                      className={`w-full flex items-center gap-4 p-4 border-2 transition-all text-left ${
                        selected ? "border-scent-noir bg-scent-gold/20" : "border-scent-noir/20 bg-scent-parchment hover:border-scent-noir/60"
                      }`}>
                      <div className="flex-1">
                        <div className="font-sans text-sm font-bold text-scent-noir">
                          {opt.label}
                        </div>
                        <div className={`text-[11px] mt-0.5 font-sans ${selected ? "text-scent-noir/80" : "text-loreal-muted"}`}>{opt.description}</div>
                      </div>
                      <div className={`w-5 h-5 border-2 border-scent-noir flex items-center justify-center flex-shrink-0 transition-all ${selected ? "bg-scent-noir text-scent-gold" : "bg-transparent"}`}>
                        {selected && <span className="text-[10px] font-bold">✓</span>}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t-2 border-scent-noir px-5 py-4 bg-scent-parchment">
        <div className="max-w-xl mx-auto flex gap-3">
          <button onClick={() => step === 0 ? setStage("profile") : setStep(step - 1)}
            className="pill pill-parchment text-[12px] flex-shrink-0 px-6 py-2.5">Back</button>
          <button onClick={nextQuestion}
            disabled={!(answers[step]?.length > 0)}
            className={`pill pill-gold text-[12px] flex-1 py-2.5 ${!(answers[step]?.length > 0) ? "opacity-30 cursor-not-allowed" : ""}`}>
            {step === quizQuestions.length - 1 ? "Reveal My Identity →" : "Continue →"}
          </button>
        </div>
      </div>
    </main>
  );
}
