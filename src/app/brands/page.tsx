"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { lorealLuxeBrands, accordVotes, pilotBrands } from "@/lib/data";

const CATEGORIES = ["All", "iconic", "maison", "prestige"] as const;
type Category = typeof CATEGORIES[number];

function BrandCard({ brand, i }: { brand: typeof lorealLuxeBrands[number]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-loreal-border bg-white cursor-default transition-all duration-200 hover:border-loreal-champagne/60"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl">{brand.icon}</span>
          <span className="text-[9px] tracking-[0.1em] uppercase border border-loreal-border px-2 py-0.5 text-loreal-muted">
            {brand.category}
          </span>
        </div>
        <h3 className="font-serif text-base font-light text-loreal-charcoal mb-1">{brand.name}</h3>
        <p className="text-[11px] italic text-loreal-muted mb-3">&ldquo;{brand.tagline}&rdquo;</p>
        <div className="divider-full mb-3" />
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[9px] uppercase tracking-[0.1em] text-loreal-muted mb-0.5">Featured</div>
            <div className="text-[12px] text-loreal-charcoal font-medium">{brand.topFragrance}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-[0.1em] text-loreal-muted mb-0.5">Family</div>
            <div className="text-[11px] champagne-text font-medium">{brand.family}</div>
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
    <main className="min-h-screen bg-loreal-white pb-20 md:pb-0 pt-14">
      <BottomNav />

      {/* Header */}
      <div className="border-b border-loreal-border">
        <div className="max-w-5xl mx-auto px-5 py-8">
          <div className="md:flex md:items-end md:justify-between gap-6">
            <div>
              <div className="eyebrow mb-2">L&apos;Oréal Luxe Portfolio</div>
              <h1 className="heading-lg mb-2">All Partner Brands</h1>
              <p className="body-lead max-w-lg">
                SCENTHOOD connects its community directly to the creative teams behind the world&apos;s most iconic fragrance houses — all under the L&apos;Oréal Luxe banner.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex-shrink-0 text-right">
              <div className="font-serif text-3xl champagne-text font-light">{lorealLuxeBrands.length}+</div>
              <div className="body-sm">luxury brands</div>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="max-w-5xl mx-auto">
          <div className="flex border-t border-loreal-border">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-3 text-[10px] font-medium tracking-[0.12em] uppercase flex-shrink-0 border-r border-loreal-border transition-all last:border-r-0 border-b-2 ${
                  category === cat
                    ? "text-loreal-charcoal border-b-loreal-champagne bg-loreal-cream/20"
                    : "text-loreal-muted border-b-transparent hover:text-loreal-slate"
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {filtered.map((brand, i) => (
            <BrandCard key={brand.name} brand={brand} i={i} />
          ))}
        </div>

        <div className="divider-full mb-10" />

        {/* Pilot brands — Phase 1 */}
        <div className="mb-6">
          <div className="eyebrow mb-2">Phase 1 Active</div>
          <h2 className="heading-md mb-1">Pilot Partnerships</h2>
          <p className="body-sm">These two brands have opened their creative briefs to the SCENTHOOD community.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {pilotBrands.map((brand, i) => {
            const relatedVote = accordVotes[i];
            return (
              <div key={brand.name} className="border border-loreal-border bg-white">
                <div className="h-0.5 bg-champagne-gradient" />
                <div className="p-6">
                  <div className="eyebrow mb-2">{brand.timeline}</div>
                  <h3 className="heading-sm mb-3">{brand.name}</h3>
                  <p className="body-sm mb-4">{brand.tagline}</p>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {brand.targets.map((target) => {
                      const [num, ...rest] = target.split(" ");
                      return (
                        <div key={target} className="border border-loreal-border p-2 text-center">
                          <div className="font-serif text-sm champagne-text font-light">{num}</div>
                          <div className="text-[9px] text-loreal-muted leading-tight">{rest.join(" ")}</div>
                        </div>
                      );
                    })}
                  </div>

                  {relatedVote && (
                    <div className="border border-loreal-border p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] uppercase tracking-[0.1em] text-green-700 font-medium">Live vote</span>
                        <span className="text-[10px] text-loreal-muted">· {relatedVote.totalVotes.toLocaleString()} votes</span>
                      </div>
                      <div className="text-xs font-medium text-loreal-charcoal mb-2">{relatedVote.title}</div>
                      <Link href="/vote" className="text-[10px] champagne-text hover:text-loreal-gold transition-colors font-medium">
                        Cast your vote →
                      </Link>
                    </div>
                  )}

                  {brand.editions && brand.editions.length > 0 && (
                    <div className="mt-3">
                      <div className="text-[9px] uppercase tracking-[0.1em] text-loreal-muted mb-2">Community Editions</div>
                      <div className="flex flex-wrap gap-1.5">
                        {brand.editions.map((ed) => (
                          <span key={ed} className="text-[10px] border border-loreal-border px-2 py-0.5 text-loreal-slate">{ed}</span>
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
