"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { lorealLuxeBrands, accordVotes, pilotBrands } from "@/lib/data";

const CATEGORIES = ["All", "iconic", "maison", "prestige"] as const;
type Category = typeof CATEGORIES[number];

function BrandCard({ brand, i }: { brand: typeof lorealLuxeBrands[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04 }}
      className="border border-scent-alabaster bg-scent-parchment transition-all duration-200 hover:border-scent-noir/60 hover:shadow-[2px_2px_0_var(--noir)] group"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="text-[9px] tracking-[0.12em] uppercase border border-scent-alabaster px-2 py-0.5 text-loreal-muted font-sans">
            {brand.category}
          </span>
        </div>
        <h3 className="font-serif text-base font-light text-scent-noir mb-1 group-hover:text-scent-gold transition-colors">{brand.name}</h3>
        <p className="text-[11px] italic text-loreal-muted mb-3 font-serif">&ldquo;{brand.tagline}&rdquo;</p>
        <div className="w-full h-px bg-scent-alabaster mb-3" />
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[9px] uppercase tracking-[0.1em] text-loreal-muted mb-0.5 font-sans">Featured</div>
            <div className="text-[12px] text-scent-noir font-medium font-sans">{brand.topFragrance}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-[0.1em] text-loreal-muted mb-0.5 font-sans">Family</div>
            <div className="text-[11px] text-scent-goldDark font-medium font-sans">{brand.family}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BrandsPage() {
  const [category, setCategory] = useState<Category>("All");

  const filtered = lorealLuxeBrands.filter(
    (b) => category === "All" || b.category === category
  );

  return (
    <main className="min-h-screen bg-scent-parchment pb-20 pt-14">
      <BottomNav />

      {/* Header */}
      <div className="border-b border-scent-noir/10 bg-scent-parchment">
        <div className="max-w-5xl mx-auto px-5 py-10">
          <div className="md:flex md:items-end md:justify-between gap-6">
            <div>
              <div className="eyebrow mb-3">L&apos;Oréal Luxe Portfolio</div>
              <h1 className="display-lg text-scent-noir mb-3">All Partner Brands</h1>
              <p className="text-scent-darkOud max-w-lg text-sm leading-relaxed font-sans">
                SCENTHOOD connects its community directly to the creative teams behind the world&apos;s most iconic fragrance houses — all under the L&apos;Oréal Luxe banner.
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex-shrink-0 text-right">
              <div className="font-serif text-5xl text-scent-gold font-light leading-none">{lorealLuxeBrands.length}+</div>
              <div className="text-[11px] text-loreal-muted mt-1 font-sans uppercase tracking-[0.18em]">luxury brands</div>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex border-t border-scent-noir/10 gap-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-3 text-[10px] font-bold tracking-[0.14em] uppercase font-sans flex-shrink-0 border-r border-scent-noir/10 last:border-r-0 transition-all border-b-2 ${
                  category === cat
                    ? "text-scent-noir border-b-scent-gold bg-scent-alabaster/30"
                    : "text-loreal-muted border-b-transparent hover:text-scent-noir"
                }`}
              >
                {cat === "All" ? "All brands" : cat === "iconic" ? "Iconic" : cat === "maison" ? "Maison" : "Prestige"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Brand grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
          {filtered.map((brand, i) => (
            <BrandCard key={brand.name} brand={brand} i={i} />
          ))}
        </div>

        <div className="w-full h-px bg-scent-alabaster mb-12" />

        {/* Pilot brands */}
        <div className="mb-6">
          <div className="eyebrow mb-2">Phase 1 Active</div>
          <h2 className="display-md text-scent-noir mb-2">Pilot Partnerships</h2>
          <p className="text-sm text-scent-darkOud font-sans">These brands have opened their creative briefs to the SCENTHOOD community.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {pilotBrands.map((brand, i) => {
            const relatedVote = accordVotes[i];
            return (
              <div key={brand.name} className="border border-scent-alabaster bg-scent-parchment hover:border-scent-noir/40 transition-colors">
                <div className="h-0.5 bg-champagne-gradient" />
                <div className="p-6">
                  <div className="eyebrow mb-2">{brand.timeline}</div>
                  <h3 className="font-serif text-xl font-light text-scent-noir mb-2">{brand.name}</h3>
                  <p className="text-sm text-scent-darkOud mb-4 font-sans">{brand.tagline}</p>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {brand.targets.map((target) => {
                      const [num, ...rest] = target.split(" ");
                      return (
                        <div key={target} className="border border-scent-alabaster p-2.5 text-center">
                          <div className="font-serif text-base text-scent-gold font-light leading-none">{num}</div>
                          <div className="text-[9px] text-loreal-muted leading-tight mt-0.5 font-sans">{rest.join(" ")}</div>
                        </div>
                      );
                    })}
                  </div>

                  {relatedVote && (
                    <div className="border border-scent-alabaster p-3 bg-scent-alabaster/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] uppercase tracking-[0.12em] text-emerald-700 font-bold font-sans">Live vote</span>
                        <span className="text-[10px] text-loreal-muted font-sans">· {relatedVote.totalVotes.toLocaleString()} votes</span>
                      </div>
                      <div className="text-sm font-medium text-scent-noir mb-2 font-sans">{relatedVote.title}</div>
                      <Link href="/vote" className="text-[10px] text-scent-gold hover:text-scent-goldDark transition-colors font-bold font-sans uppercase tracking-[0.12em]">
                        Cast your vote →
                      </Link>
                    </div>
                  )}

                  {brand.editions && brand.editions.length > 0 && (
                    <div className="mt-3">
                      <div className="text-[9px] uppercase tracking-[0.12em] text-loreal-muted mb-2 font-sans">Community Editions</div>
                      <div className="flex flex-wrap gap-1.5">
                        {brand.editions.map((ed) => (
                          <span key={ed} className="text-[10px] border border-scent-alabaster px-2 py-0.5 text-scent-darkOud font-sans">{ed}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
