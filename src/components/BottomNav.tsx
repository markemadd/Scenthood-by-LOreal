"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/home",         label: "Home",         color: "gold" },
  { href: "/community",    label: "Community",    color: "parchment" },
  { href: "/vote",         label: "Votes",        color: "rose" },
  { href: "/intelligence", label: "Intelligence", color: "noir" },
  { href: "/referral",     label: "Refer",        color: "parchment" },
  { href: "/profile",      label: "Profile",      color: "gold" },
] as const;

function pillClass(color: string, active: boolean) {
  const base = "pill text-[11px] px-4 py-1.5";
  if (active) {
    if (color === "gold")      return `${base} pill-gold`;
    if (color === "rose")      return `${base} pill-rose`;
    if (color === "noir")      return `${base} pill-noir`;
    return `${base} pill-parchment`;
  }
  return `${base} pill-parchment opacity-70 hover:opacity-100`;
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* === TOP NAV === */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="px-4 md:px-8 pt-3 md:pt-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo mark */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="logo-mark group-hover:bg-scent-gold group-hover:text-scent-noir transition-colors">
                S<span className="text-scent-gold group-hover:text-scent-noir">·</span>H
              </div>
            </Link>

            {/* Pill nav — visible md+ */}
            <div className="hidden md:flex items-center gap-2 bg-scent-parchment/70 backdrop-blur-md p-1.5 border-2 border-scent-noir rounded-full">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}
                    className={pillClass(item.color, active)}>
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right action */}
            <Link href="/quiz" className="hidden md:inline-flex pill pill-noir text-[11px] px-4 py-1.5">
              Take the Quiz
            </Link>

            {/* Mobile: condensed action */}
            <Link href="/quiz" className="md:hidden pill pill-noir text-[10px] px-3 py-1">
              Quiz
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* === MOBILE BOTTOM NAV === */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-3 pb-3">
        <div className="bg-scent-parchment/95 backdrop-blur-md border-2 border-scent-noir rounded-full p-1.5 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`${pillClass(item.color, active)} flex-shrink-0`}>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
