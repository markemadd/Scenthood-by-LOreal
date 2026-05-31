// Brand → image mapping. Never put the wrong brand image on a card.
//
// Verified assets:
//   ysl-libre.jpg               → YSL Libre (gold bottle, Paris rooftop)
//   ysl-libre-dua.jpg           → YSL Libre Dua Lipa LIBRE poster (fire)
//   home-hero.jpg               → YSL Libre (woman close-up with gold bottle)
//   ysl-myslf.jpg               → YSL MYSLF (Austin Butler)
//   loreal-paris-clay.jpg       → YSL La Nuit de L'Homme (Austin-Butler-style portrait)
//   community-page.jpg          → YSL Y (blue bottle)
//   valentino.jpg               → Valentino Born in Roma Uomo (studded black bottle)
//   valentino-meta.jpg          → Valentino Garavani fashion (red mirror editorial)
//   prada.jpg                   → Prada Paradoxe (bottle on rock at sunset)
//   lancome-la-vie.jpg          → Lancôme La Vie Est Belle (pink, Eiffel Tower)
//   lancome-idole.jpg           → Lancôme Idôle (pink bottle on red tray)
//   lancome-tresor.jpg          → Lancôme Trésor (amber bottle, silk)
//   margiela-jazz-club.jpg      → Margiela Replica Jazz Club (whisky bar)
//   margiela-jazz-club-alt.jpg  → Margiela Replica Jazz Club (saxophone)
//   margiela-fireplace.jpg      → Margiela Replica By The Fireplace (logs, fire)
//   margiela-flower-market.jpg  → Margiela Replica Flower Market (pink florals)
//   margiela-bubble-bath.jpg    → Margiela Replica Bubble Bath (mint, bubbles)
//   armani-si.jpg               → Armani Sì (rose bottle in hand)
//   armani-stronger-with-you.jpg→ Armani Stronger With You Absolutely
//   mugler-angel.jpg            → Mugler Angel (blue star bottle, silver claws)
//   home-page.jpg               → L'Oréal Paris embossed clay (hero texture)
//   fragrance-journal.jpg       → Editorial fragrance journal sketch (brand-neutral)
//   vote-image.jpg              → Perfume bottle shadow on linen (brand-neutral)

const NEUTRAL_IMAGES = [
  "/assets/vote-image.jpg",
  "/assets/fragrance-journal.jpg",
];

const FRAGRANCE_MAP: Record<string, string> = {
  // YSL
  "YSL Libre":                       "/assets/ysl-libre.jpg",
  "YSL Libre Intense":               "/assets/ysl-libre-dua.jpg",
  "YSL Y EDP":                       "/assets/community-page.jpg",
  "YSL Y":                           "/assets/community-page.jpg",
  "MYSLF":                           "/assets/ysl-myslf.jpg",
  "YSL MYSLF":                       "/assets/ysl-myslf.jpg",
  "YSL La Nuit de L'Homme":          "/assets/loreal-paris-clay.jpg",
  "La Nuit de L'Homme":              "/assets/loreal-paris-clay.jpg",

  // Valentino
  "Valentino Born in Roma":          "/assets/valentino.jpg",
  "Valentino Born in Roma Uomo":     "/assets/valentino.jpg",

  // Prada
  "Prada Paradoxe":                  "/assets/prada.jpg",

  // Lancôme
  "Lancôme La Vie Est Belle":        "/assets/lancome-la-vie.jpg",
  "La Vie Est Belle":                "/assets/lancome-la-vie.jpg",
  "Lancôme Idôle":                   "/assets/lancome-idole.jpg",
  "Idôle":                           "/assets/lancome-idole.jpg",
  "Lancôme Trésor":                  "/assets/lancome-tresor.jpg",
  "Trésor":                          "/assets/lancome-tresor.jpg",

  // Maison Margiela Replica
  "Replica Jazz Club":               "/assets/margiela-jazz-club.jpg",
  "Margiela Jazz Club":              "/assets/margiela-jazz-club.jpg",
  "Replica By The Fireplace":        "/assets/margiela-fireplace.jpg",
  "By The Fireplace":                "/assets/margiela-fireplace.jpg",
  "Replica Flower Market":           "/assets/margiela-flower-market.jpg",
  "Flower Market":                   "/assets/margiela-flower-market.jpg",
  "Replica Bubble Bath":             "/assets/margiela-bubble-bath.jpg",
  "Bubble Bath":                     "/assets/margiela-bubble-bath.jpg",

  // Armani
  "Armani Sì":                       "/assets/armani-si.jpg",
  "Sì":                              "/assets/armani-si.jpg",
  "Sì Passione":                     "/assets/armani-si.jpg",
  "Armani Sì Passione":              "/assets/armani-si.jpg",
  "Armani Stronger With You":        "/assets/armani-stronger-with-you.jpg",
  "Stronger With You":               "/assets/armani-stronger-with-you.jpg",

  // Mugler
  "Mugler Angel":                    "/assets/mugler-angel.jpg",
  "Angel":                           "/assets/mugler-angel.jpg",
};

const BRAND_MAP: Record<string, string> = {
  "YSL Beauté":       "/assets/ysl-libre.jpg",
  "YSL":              "/assets/ysl-libre.jpg",
  "Valentino":        "/assets/valentino.jpg",
  "Valentino Beauty": "/assets/valentino.jpg",
  "Prada":            "/assets/prada.jpg",
  "Lancôme":          "/assets/lancome-la-vie.jpg",
  "Maison Margiela":  "/assets/margiela-jazz-club.jpg",
  "Margiela":         "/assets/margiela-jazz-club.jpg",
  "Giorgio Armani":   "/assets/armani-si.jpg",
  "Armani":           "/assets/armani-si.jpg",
  "Mugler":           "/assets/mugler-angel.jpg",
};

export function imageFor(fragranceName?: string, brand?: string, seed = 0): string {
  if (fragranceName && FRAGRANCE_MAP[fragranceName]) return FRAGRANCE_MAP[fragranceName];

  if (fragranceName) {
    for (const k of Object.keys(FRAGRANCE_MAP)) {
      if (fragranceName.includes(k)) return FRAGRANCE_MAP[k];
    }
  }

  if (brand && BRAND_MAP[brand]) return BRAND_MAP[brand];

  if (brand) {
    for (const k of Object.keys(BRAND_MAP)) {
      if (brand.includes(k)) return BRAND_MAP[k];
    }
  }

  return NEUTRAL_IMAGES[Math.abs(seed) % NEUTRAL_IMAGES.length];
}

// Home brand strip
export const PILOT_BRAND_CARDS = [
  { img: "/assets/ysl-libre.jpg",      name: "YSL Libre",              tag: "Solar floral · Women",  brand: "YSL Beauté" },
  { img: "/assets/valentino.jpg",      name: "Valentino Born in Roma", tag: "Smoke & spike · Men",   brand: "Valentino" },
  { img: "/assets/prada.jpg",          name: "Prada Paradoxe",         tag: "Bright amber · Women",  brand: "Prada" },
  { img: "/assets/lancome-la-vie.jpg", name: "Lancôme La Vie Est Belle", tag: "Gourmand iris · Women", brand: "Lancôme" },
  { img: "/assets/margiela-fireplace.jpg", name: "Margiela By The Fireplace", tag: "Smoke & wood · Unisex", brand: "Maison Margiela" },
  { img: "/assets/armani-si.jpg",      name: "Armani Sì",              tag: "Floral chypre · Women", brand: "Giorgio Armani" },
];
