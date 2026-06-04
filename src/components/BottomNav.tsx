"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navItems = [
  { href: "/home",         label: "Home" },
  { href: "/community",    label: "Community" },
  { href: "/vote",         label: "Votes" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/tiers",        label: "Tiers" },
  { href: "/referral",     label: "Refer" },
  { href: "/profile",      label: "Profile" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* === TOP BAR === */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-scent-noir/95 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" onClick={() => setOpen(false)}>
            <div className="w-7 h-7 rounded-full bg-scent-parchment flex items-center justify-center font-serif text-xs text-scent-noir font-bold group-hover:bg-scent-gold transition-colors">
              S
            </div>
            <span className="hidden sm:block text-scent-parchment text-[11px] tracking-[0.22em] uppercase font-bold font-sans">
              Scenthood
            </span>
          </Link>

          {/* Right side: Quiz CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/quiz"
              className="hidden sm:inline-flex items-center bg-scent-gold text-scent-noir text-[10px] uppercase tracking-[0.18em] font-bold font-sans px-4 py-1.5 hover:bg-scent-goldDark hover:text-scent-parchment transition-colors"
              onClick={() => setOpen(false)}
            >
              Take the Quiz
            </Link>

            {/* Hamburger button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col justify-center items-center gap-[5px] w-10 h-10 group"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-scent-parchment group-hover:bg-scent-gold transition-colors origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-px bg-scent-parchment group-hover:bg-scent-gold transition-colors"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-scent-parchment group-hover:bg-scent-gold transition-colors origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* === FULL-SCREEN MENU OVERLAY === */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-scent-noir grain flex flex-col"
          >
            {/* Nav links — vertically centered */}
            <div className="flex-1 flex flex-col items-center justify-center gap-1 px-8">
              {navItems.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block font-serif text-3xl md:text-4xl font-light leading-tight transition-colors py-1 text-center ${
                        active
                          ? "text-scent-gold"
                          : "text-scent-parchment/60 hover:text-scent-parchment"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="border-t border-white/10 px-8 py-6 flex items-center justify-between"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-scent-parchment/30 font-sans font-bold">
                Brandstorm 2026 · L&apos;Oréal Luxe
              </div>
              <Link
                href="/quiz"
                onClick={() => setOpen(false)}
                className="bg-scent-gold text-scent-noir text-[10px] uppercase tracking-[0.18em] font-bold font-sans px-5 py-2 hover:bg-scent-goldDark hover:text-scent-parchment transition-colors"
              >
                Take the Quiz →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
