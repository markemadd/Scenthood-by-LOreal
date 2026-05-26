"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const fi = (id: number) => `https://fimgs.net/mdimg/perfume/375x500.${id}.jpg`;

const stats = [
  { value: "$47B", label: "Global Fragrance Market" },
  { value: "70%", label: "Gen Z trust peers over ads" },
  { value: "2.1B+", label: "Fragrance views on TikTok" },
  { value: "47", label: "Countries in our community" },
];

const heroBottles = [
  { id: 57987, label: "Libre · YSL", rotate: -9, x: "8%", zIndex: 3, delay: 0.2 },
  { id: 33290, label: "Black Opium · YSL", rotate: 5, x: "36%", zIndex: 2, delay: 0.35 },
  { id: 21780, label: "La Vie Est Belle · Lancôme", rotate: -3, x: "62%", zIndex: 1, delay: 0.5 },
];

const showcaseFragrances = [
  { id: 57987, name: "Libre", brand: "YSL Beauté", family: "Floral · Musk" },
  { id: 33290, name: "Black Opium", brand: "YSL Beauté", family: "Amber · Gourmand" },
  { id: 21780, name: "La Vie Est Belle", brand: "Lancôme", family: "Gourmand · Floral" },
  { id: 25564, name: "Sì", brand: "Giorgio Armani", family: "Floral · Chypre" },
  { id: 32268, name: "Jazz Club", brand: "Maison Margiela", family: "Woody · Tobacco" },
  { id: 2615, name: "Acqua di Giò", brand: "Giorgio Armani", family: "Aquatic · Citrus" },
  { id: 59718, name: "Born in Roma", brand: "Valentino", family: "Floral · Vanilla" },
  { id: 36460, name: "By The Fireplace", brand: "Replica", family: "Amber · Woody" },
  { id: 63067, name: "Idôle", brand: "Lancôme", family: "Floral · Musk" },
  { id: 76382, name: "Paradoxe", brand: "Prada", family: "Floral · Woody" },
];

const pillarBottles = [9793, 36460, 63067];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="min-h-screen bg-loreal-white overflow-x-hidden">
      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-loreal-white/95 backdrop-blur-sm border-b border-loreal-border"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-serif text-loreal-charcoal text-xl tracking-[0.2em] font-light">
            SCENTHOOD
          </span>
          <div className="flex items-center gap-6">
            <Link href="/home" className="body-sm hover:text-loreal-charcoal transition-colors hidden sm:block">
              Explore
            </Link>
            <Link href="/tiers" className="body-sm hover:text-loreal-charcoal transition-colors hidden sm:block">
              Tiers
            </Link>
            <Link href="/signup" className="btn-primary text-xs py-2 px-5">
              Join
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="pt-14 min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Ambient glows */}
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-loreal-champagne/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-loreal-sand/25 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 w-full py-20">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — editorial headline */}
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="eyebrow mb-6">A Platform Strategy for L&apos;Oréal Luxe</div>
                <h1 className="heading-xl mb-7 text-balance">
                  The Fragrance<br />
                  <em>Community</em><br />
                  That Thinks.
                </h1>
                <p className="body-lead max-w-md mb-10 text-balance">
                  Vote on the next luxury launch. Write the review that shapes a brief. Rise from member to co-creator.
                  SCENTHOOD puts the community inside the creative process.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Link href="/signup" className="btn-primary">
                    Join SCENTHOOD Free
                  </Link>
                  <Link href="/home" className="btn-outline">
                    Explore Community
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right — fragrance bottle collage */}
            <div className="relative hidden md:block h-[540px]">
              {/* Decorative ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-loreal-champagne/12 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-loreal-sand/40 pointer-events-none" />

              {heroBottles.map((bottle, i) => (
                <motion.div
                  key={bottle.id + i}
                  initial={{ opacity: 0, y: 50, rotate: bottle.rotate - 8 }}
                  animate={{ opacity: 1, y: 0, rotate: bottle.rotate }}
                  transition={{
                    duration: 1,
                    delay: bottle.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -12,
                    rotate: 0,
                    scale: 1.04,
                    transition: { duration: 0.35 },
                  }}
                  style={{
                    position: "absolute",
                    left: bottle.x,
                    top: `${12 + i * 12}%`,
                    zIndex: bottle.zIndex,
                  }}
                  className="cursor-pointer group"
                >
                  <img
                    src={fi(bottle.id)}
                    alt={bottle.label}
                    className="h-64 lg:h-80 w-auto object-contain drop-shadow-2xl"
                    loading="eager"
                  />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <span className="text-[10px] text-loreal-champagne tracking-[0.12em]">{bottle.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <div className="border-y border-loreal-border bg-loreal-cream/30">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className="font-serif text-3xl md:text-4xl font-light champagne-text mb-1 cursor-default"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="body-sm">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FRAGRANCE SHOWCASE ─── */}
      <section className="border-b border-loreal-border">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-4">
          <Reveal className="flex items-end justify-between mb-10">
            <div>
              <div className="eyebrow mb-3">The Collection</div>
              <h2 className="heading-lg">Icons you already love</h2>
            </div>
            <Link
              href="/brands"
              className="body-sm text-loreal-champagne hover:text-loreal-gold transition-colors hidden md:block pb-1"
            >
              All Partner Brands →
            </Link>
          </Reveal>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5">
            {showcaseFragrances.map((frag, i) => (
              <Reveal key={frag.id + frag.name} delay={i * 0.045}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="group text-center cursor-default"
                >
                  <div className="relative bg-loreal-cream/40 border border-loreal-border group-hover:border-loreal-champagne/50 transition-all duration-300 p-3 md:p-5 mb-3 overflow-hidden">
                    <img
                      src={fi(frag.id)}
                      alt={frag.name}
                      className="h-28 md:h-40 w-auto mx-auto object-contain transition-transform duration-500 group-hover:scale-108"
                      style={{ transform: "scale(1)" }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-loreal-cream/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-[9px] md:text-[10px] uppercase tracking-[0.12em] text-loreal-muted mb-0.5">
                    {frag.brand}
                  </div>
                  <div className="font-serif text-xs md:text-sm text-loreal-charcoal font-light">
                    {frag.name}
                  </div>
                  <div className="text-[9px] md:text-[10px] champagne-text mt-0.5">{frag.family}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center md:hidden">
            <Link href="/brands" className="body-sm text-loreal-champagne">
              All Partner Brands →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── EDITORIAL SPLIT: featured bottle + quote ─── */}
      <section className="border-b border-loreal-border">
        <div className="max-w-6xl mx-auto">
          <div className="md:grid md:grid-cols-2 gap-0">

            {/* Left: large bottle */}
            <Reveal className="hidden md:flex items-center justify-center py-20 border-r border-loreal-border bg-loreal-cream/20">
              <div className="relative text-center">
                <motion.img
                  src={fi(57987)}
                  alt="YSL Libre"
                  className="h-72 lg:h-96 w-auto object-contain drop-shadow-2xl mx-auto"
                  whileHover={{ y: -8, rotate: -3 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="mt-6">
                  <div className="eyebrow mb-1">YSL Beauté</div>
                  <div className="font-serif text-loreal-charcoal text-lg font-light">Libre</div>
                  <div className="text-[10px] champagne-text mt-1">Floral · Musk · Lavender</div>
                </div>
              </div>
            </Reveal>

            {/* Right: quote */}
            <Reveal className="py-16 px-8 md:pl-16 md:pr-12 flex flex-col justify-center">
              <div className="divider mb-8" />
              <p className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-loreal-slate italic leading-relaxed mb-8">
                &ldquo;Fragrance is the most intimate form of communication a brand can have with its customer.
                SCENTHOOD closes the loop — giving both sides a voice.&rdquo;
              </p>
              <p className="body-sm mb-10">— L&apos;Oréal Luxe Community Vision, 2026</p>
              <div className="divider mb-10" />
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/quiz" className="btn-gold text-xs">
                  Discover Your Scent Identity
                </Link>
                <Link href="/vote" className="btn-outline text-xs">
                  Live Votes →
                </Link>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="border-b border-loreal-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Reveal className="text-center mb-12">
            <div className="eyebrow mb-3">How it Works</div>
            <h2 className="heading-lg">Three ways to contribute</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-px bg-loreal-border">
            {[
              {
                num: "01",
                title: "Vote",
                body: "Every active poll shapes a real product decision. Your vote on accord directions, scent families, and launch concepts is aggregated into the creative brief.",
                bottleId: pillarBottles[0],
              },
              {
                num: "02",
                title: "Write",
                body: "Fragrance deserves better writing. Publish reviews, emotional memories, and cultural connections. The best become briefs. Your words outlive the moment.",
                bottleId: pillarBottles[1],
              },
              {
                num: "03",
                title: "Rise",
                body: "Your L'Oréal Influence Score tracks the quality of your engagement. Rise from Scenthooders to Scentmaker to Scentsetters — and co-create the next launch.",
                bottleId: pillarBottles[2],
              },
            ].map((pillar, i) => (
              <Reveal key={pillar.num} delay={i * 0.1}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(237,228,220,0.55)" }}
                  transition={{ duration: 0.25 }}
                  className="bg-loreal-white p-10 h-full group cursor-default"
                >
                  <div className="champagne-text font-serif text-4xl font-light mb-5">{pillar.num}</div>
                  <h3 className="heading-sm mb-4">{pillar.title}</h3>
                  <p className="body-sm mb-8">{pillar.body}</p>
                  <img
                    src={fi(pillar.bottleId)}
                    alt=""
                    className="h-28 w-auto object-contain mx-auto opacity-40 grayscale group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER FRAGRANCES (dark section) ─── */}
      <section className="bg-loreal-charcoal border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <div className="eyebrow text-loreal-champagne/60 mb-3">Phase 1 Active</div>
            <h2 className="heading-lg text-white mb-12">Pilot Partnerships</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                brand: "YSL Beauté",
                name: "Libre",
                id: 57987,
                tagline:
                  "Community votes on the next Libre flanker. Scentsetters shape the brief. The launch reads: Co-Created by SCENTHOOD.",
                family: "Floral · Musk",
                vote: "Woody-Smoky vs. Citrus-Fresh",
              },
              {
                brand: "Valentino Beauty",
                name: "Born in Roma",
                id: 59718,
                tagline:
                  "Born in Roma — Next Chapter: the community votes on the creative direction of the next flanker. Your input shapes the brief.",
                family: "Floral · Vanilla",
                vote: "Intense Oud-Rose vs. Solar Citrus-Iris",
              },
            ].map((brand, i) => (
              <Reveal key={brand.brand} delay={i * 0.15}>
                <motion.div
                  whileHover={{ borderColor: "rgba(164,139,117,0.5)" }}
                  transition={{ duration: 0.25 }}
                  className="border border-white/10 p-8 flex items-center gap-8 group cursor-default"
                >
                  <motion.img
                    src={fi(brand.id)}
                    alt={brand.name}
                    className="h-44 w-auto object-contain flex-shrink-0 drop-shadow-2xl"
                    whileHover={{ y: -6, rotate: -3 }}
                    transition={{ duration: 0.35 }}
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="text-loreal-champagne/50 text-[10px] uppercase tracking-[0.2em] mb-2">
                      {brand.brand}
                    </div>
                    <h3 className="font-serif text-2xl text-white font-light mb-1">{brand.name}</h3>
                    <div className="text-loreal-champagne text-[11px] tracking-wide mb-4">{brand.family}</div>
                    <p className="text-white/45 text-sm leading-relaxed mb-2">{brand.tagline}</p>
                    <div className="text-[10px] text-loreal-champagne/60 mb-5">
                      Active vote: {brand.vote}
                    </div>
                    <Link
                      href="/vote"
                      className="btn-outline-gold text-[10px] py-2 px-5 inline-flex"
                    >
                      Cast Your Vote →
                    </Link>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY VOICES ─── */}
      <section className="border-b border-loreal-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Reveal className="text-center mb-12">
            <div className="eyebrow mb-3">Community Voices</div>
            <h2 className="heading-lg">What our members say</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-px bg-loreal-border">
            {[
              {
                name: "Yuki Tanaka",
                location: "Tokyo, Japan",
                tier: "Scentsetters",
                fragId: 32268,
                fragName: "Replica Jazz Club",
                quote:
                  "Jazz Club feels like a late autumn evening in a Copenhagen bar — whisky, wood polish, and a stranger's cigarette smoke just beyond the window.",
              },
              {
                name: "Lucas Andersson",
                location: "Stockholm, Sweden",
                tier: "Scentmaker",
                fragId: 57987,
                fragName: "YSL Libre",
                quote:
                  "Libre opens like a declaration. The lavender and vanilla aren't fighting — they've reached an agreement. This is what confidence smells like.",
              },
              {
                name: "Isabelle Moreau",
                location: "Paris, France",
                tier: "Scenthooders",
                fragId: 21780,
                fragName: "Lancôme La Vie Est Belle",
                quote:
                  "La Vie Est Belle is exactly that — life at its most joyful. The iris heart is textbook-perfect and the praline base keeps it beautifully modern.",
              },
            ].map((voice, i) => (
              <Reveal key={voice.name} delay={i * 0.12}>
                <div className="bg-loreal-white p-8 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    <img
                      src={fi(voice.fragId)}
                      alt={voice.fragName}
                      className="h-14 w-auto object-contain flex-shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-sans text-sm font-medium text-loreal-charcoal">{voice.name}</div>
                      <div className="body-sm text-[10px]">{voice.location}</div>
                      <div className="text-[9px] uppercase tracking-[0.15em] text-loreal-champagne mt-0.5">
                        {voice.tier}
                      </div>
                    </div>
                  </div>
                  <div className="divider-full mb-5" />
                  <div className="text-[10px] champagne-text uppercase tracking-[0.12em] mb-3">
                    {voice.fragName}
                  </div>
                  <p className="font-serif text-sm text-loreal-slate italic leading-relaxed flex-1">
                    &ldquo;{voice.quote}&rdquo;
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <Reveal>
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="eyebrow mb-3">Start Today</div>
            <h2 className="heading-lg">Find your scent identity.</h2>
          </div>
          <div className="flex-shrink-0">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/signup" className="btn-gold">
                Join Free &amp; Take the Quiz →
              </Link>
            </motion.div>
          </div>
        </div>
      </Reveal>

      {/* ─── FOOTER ─── */}
      <div className="border-t border-loreal-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="font-serif text-loreal-muted text-sm tracking-[0.15em]">SCENTHOOD</span>
          <span className="body-sm">A L&apos;Oréal Luxe platform strategy · 2026</span>
        </div>
      </div>
    </main>
  );
}
