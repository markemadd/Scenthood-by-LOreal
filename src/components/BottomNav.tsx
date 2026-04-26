"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/home", label: "Home", icon: "⌂" },
  { href: "/vote", label: "Vote", icon: "◉" },
  { href: "/community", label: "Feed", icon: "◈" },
  { href: "/referral", label: "Refer", icon: "✦" },
  { href: "/profile", label: "Profile", icon: "◎" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-loreal-border md:hidden">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-3 px-6 transition-colors ${isActive ? "text-loreal-charcoal" : "text-loreal-muted hover:text-loreal-slate"
                  }`}
              >
                <div className={`w-5 h-px mb-0.5 transition-all ${isActive ? "bg-loreal-champagne" : "bg-transparent"}`} />
                <span className="text-[10px] tracking-[0.1em] uppercase font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop top nav bar (positioned fixed by parent pages) */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-loreal-white/95 backdrop-blur-sm border-b border-loreal-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between w-full">
          <Link href="/" className="font-serif text-loreal-charcoal text-lg tracking-[0.2em] font-light">
            SCENTHOOD
          </Link>
          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs tracking-[0.12em] uppercase font-medium transition-colors pb-0.5 border-b ${isActive
                    ? "text-loreal-charcoal border-loreal-champagne"
                    : "text-loreal-muted border-transparent hover:text-loreal-slate"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/referral" className="text-xs tracking-[0.12em] uppercase font-medium text-loreal-muted hover:text-loreal-champagne transition-colors">
              Refer &amp; Earn
            </Link>
            <Link href="/quiz" className="btn-outline text-xs py-1.5 px-4">
              Join
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
