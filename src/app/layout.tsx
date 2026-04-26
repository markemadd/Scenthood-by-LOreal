import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SCENTHOOD — The Fragrance Community That Thinks",
  description:
    "A luxury fragrance community platform by L'Oréal Luxe. Co-create, vote, and shape the future of fragrance alongside the world's finest perfumers.",
  keywords: ["fragrance", "L'Oréal Luxe", "community", "YSL", "Maison Margiela", "perfume", "SCENTHOOD"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
