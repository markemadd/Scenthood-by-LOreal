# SCENTHOOD — Project Memory

> **Drop this into a new chat as the first message to bring the next agent fully up to speed.**

---

## 1 · What this project is

**SCENTHOOD** is a fragrance community web app built for **L'Oréal Brandstorm 2026** (L'Oréal's annual student innovation competition — Brandstorm, *not* "Swarm"). It's the Next.js prototype that goes with the user's pitch deck.

- **Owner:** Mark Emad Garas (GitHub: `markemadd`)
- **Repo:** https://github.com/markemadd/Scenthood-by-LOreal
- **Local path:** `/Users/markemad/Desktop/L'oreal app/`
- **Active branch:** `brandstorm-2026` (the redesign — already pushed)
- **`main`:** older version, untouched by the redesign
- **Stack:** Next.js 14.2.21 (App Router) · React · TypeScript · Tailwind CSS · Framer Motion · Node 18+
- **Dev:** `npm run dev` (port 3000) · **Build:** `npm run build` · **Deploy target:** Vercel

### Positioning copy (paste-ready)
> "SCENTHOOD is the community for people who take fragrance seriously — a space to discover, share, and grow through the scents that define you. Whether you're just starting your collection or shaping what the industry buys next, your voice has a place here."

---

## 2 · Pages & what each one does

The bottom/top **pill nav** lists six destinations. The root `/` redirects to `/home`.

| Route | Purpose |
|---|---|
| `/home` | Editorial landing: full-bleed L'Oréal Paris clay hero, "SCENTHOOD" wordmark, live ticker, stats strip, featured live vote (YSL Libre), 4-card "From the community" review grid, pilot brands strip (6 cards), "Tune into the signal" rose CTA → /signup, footer with Navigate + Discover + big wordmark band |
| `/community` | Fragrance feed with sticky pill filters (All/Video/Photo/Text). Pinterest-style masonry of FeedCards. "+ Create & Earn LIS" opens a fully-functional modal that uploads an image, lets you write a review, and persists the post to `localStorage` (`scenthood_user_posts`) — user posts prepend the seed feed with a "New" badge. Hero is the editorial fragrance-journal sketch. |
| `/vote` | "Live Accord Voting" — co-creation studio. Cards split 5/7: brand-correct image on the left, vote on the right. Cast vote → animated % bar fill + perfumer's note reveal. Bug-free (hooks pulled out into VoteCard subcomponent). |
| `/intelligence` | L'Oréal Luxe internal analytics. Reordered: **Strategic Recommendations** first, then **Trend Forecast**, then KPI cards, weekly engagement, brand performance, accord×age table, world heat map, community pulse. New noir hero with 3 KPI tiles. |
| `/referral` | Oud Rose hero (Valentino Garavani fashion image) → SCENT-IM-4821 referral code → WhatsApp/copy share → dark milestone tracker (1/3/5/10 friends) → friends list → CTA. |
| `/profile` | Dua Lipa Libre hero with "About me." headline. Reads `scenthood_user` from localStorage if signed up, else falls back to mock Lucas Andersson. Circular LIS score (SVG ring animated), 4 LIS components (Voting Quality 25% / Content Output 30% / Peer Endorsement 25% / Session Attendance 20%), tier progression bar, recent activity log. |
| `/quiz` | 5-question Scent Identity Quiz. ProfileStep (gender + age) → QuizStep × N → ResultScreen (palette per primary family, picks a brand-catalog fragrance, scent-DNA bars). |
| `/signup` | Two-pane editorial signup. Left = YSL Libre hero image with brand mark + headline. Right = 3-step flow (method → social → details). On submit, writes `scenthood_user` to localStorage and shows "You're in." noir confirmation. |
| `/brands`, `/tiers` | Older pages, kept intact (use the remapped `loreal-*` color tokens so they pick up the new palette automatically). |

---

## 3 · Design system

### Palette (Tailwind tokens in `tailwind.config.js`)
The new tokens live under `scent.*`. **Legacy `loreal-*` keys are still defined and remapped to the new palette** so every existing component keeps working.

| Token | Hex | Role |
|---|---|---|
| `scent.noir` | `#0D0D0D` | Foundation black. Sophistication anchor (Chanel/YSL/Tom Ford signal). |
| `scent.parchment` | `#F5F0E8` | Editorial off-white. Page bg, body text on dark. |
| `scent.darkOud` | `#2A2320` | Elevated cards on dark surfaces. |
| `scent.gold` | `#C9A84C` | Liquid Gold accent — *sparingly* on logo, tier badges, LIS progress. Encodes aspiration/reward. |
| `scent.amber` | `#8B7355` | Raw Amber → Scenthooders tier. Earthy, accessible. |
| `scent.alabaster` | `#E8E0D0` | Borders, neutrals. |
| `scent.oudRose` | `#6B2D3A` | Cultural-warmth signal & CTAs. Egypt-first nod. |

**Rationale (from user's research-grounded brief):** the noir/gold/rose triangle resolves the Keller-style luxury-vs-belonging tension. Noir for credibility, gold for aspiration (Heller), Oud Rose for cultural specificity (Kumar et al. 2021).

### Typography (Google Fonts loaded in `globals.css`)
- **`font-display`** → Archivo Black 900 (headline display — `.display-hero`, `.display-xl`, `.display-lg`, `.display-md`)
- **`font-serif`** → Cormorant Garamond (review excerpts, italic editorial quotes)
- **`font-sans`** → Inter (UI, body)
- **`font-mono`** → JetBrains Mono (referral codes)

### Component utilities (in `globals.css` @layer components)
- `.pill`, `.pill-gold`, `.pill-rose`, `.pill-parchment`, `.pill-noir` — the template's signature pill button. 1.5px noir border, hover lifts 1px with 0 4px 0 noir shadow.
- `.grain`, `.grain-light`, `.grain-heavy` — SVG fractal-noise overlay for cinematic texture (used on every hero).
- `.bg-grain` — same texture as a utility background.
- `.eyebrow` — gold 10px uppercase, 0.22em letter-spacing, bold.
- `.btn-primary` / `.btn-gold` / `.btn-rose` / `.btn-outline` / `.btn-outline-gold` — legacy classes, remapped.
- `.vote-option`, `.progress-rail`, `.logo-mark` (S·H pill).

---

## 4 · File map (only what an agent typically needs)

```
/Users/markemad/Desktop/L'oreal app/
├ src/app/
│  ├ layout.tsx              # imports globals.css
│  ├ page.tsx                # redirects "/" → "/home"
│  ├ home/page.tsx           # hero + ticker + stats + featured vote + 4-card grid + brand strip + footer
│  ├ community/page.tsx      # feed + masonry + CreateModal (localStorage persist)
│  ├ vote/page.tsx           # VoteCard subcomponent (hooks fixed)
│  ├ intelligence/page.tsx   # Strategic Recs + Trend Forecast at top, then dashboards
│  ├ referral/page.tsx
│  ├ profile/page.tsx
│  ├ quiz/page.tsx
│  ├ signup/page.tsx         # 2-pane editorial signup
│  ├ brands/page.tsx         # untouched legacy
│  ├ tiers/page.tsx          # untouched legacy
│  └ globals.css             # palette CSS vars + typography + .pill + .grain + .display-* utilities
├ src/components/
│  ├ BottomNav.tsx           # Pill nav (top on desktop, bottom on mobile). Logo mark + Take the Quiz CTA.
│  └ TierBadge.tsx           # Scenthooders/Scentmaker/Scentsetters chip
├ src/lib/
│  ├ data.ts                 # users, feedPosts, reviews, accordVotes, quizQuestions, scentIdentities,
│  │                          brandPerfumeCatalog (full L'Oréal Luxe catalog with Fragrantica image IDs),
│  │                          lorealLuxeBrands, intelligenceData, communityStats
│  ├ brandImages.ts          # imageFor(fragranceName, brand, seed): mapping + PILOT_BRAND_CARDS
│  └ utils.ts
├ public/assets/             # ALL real brand campaign images (renamed)
├ tailwind.config.js         # scent.* tokens + remapped loreal-* tokens + fonts
└ package.json               # Next 14.2.21
```

### Asset roster — public/assets/

Every brand image is the **real campaign shot**. `brandImages.ts` is the single source of truth — never hard-code paths in pages, always go through `imageFor()`.

| File | Content |
|---|---|
| `home-page.jpg` | L'Oréal Paris embossed clay — Home hero |
| `home-hero.jpg` | YSL Libre face close-up — Signup left panel |
| `ysl-libre.jpg` | YSL Libre gold bottle, Paris rooftop |
| `ysl-libre-dua.jpg` | YSL Libre Dua Lipa LIBRE poster — Profile hero |
| `ysl-myslf.jpg` | YSL MYSLF (Austin Butler) — Intelligence hero |
| `loreal-paris-clay.jpg` | YSL La Nuit de L'Homme (filename misleading — content is La Nuit) |
| `community-page.jpg` | YSL Y blue bottle (also filename misleading) |
| `valentino.jpg` | Valentino Born in Roma Uomo (studded black) |
| `valentino-meta.jpg` | Valentino Garavani fashion (red mirror) — Referral hero |
| `prada.jpg` | Prada Paradoxe |
| `lancome-la-vie.jpg` | Lancôme La Vie Est Belle (Paris/Eiffel) |
| `lancome-idole.jpg` | Lancôme Idôle (pink on red tray) |
| `lancome-tresor.jpg` | Lancôme Trésor (amber/silk) |
| `margiela-jazz-club.jpg` | Replica Jazz Club (whisky bar) |
| `margiela-jazz-club-alt.jpg` | Replica Jazz Club (saxophone) — spare |
| `margiela-fireplace.jpg` | Replica By The Fireplace |
| `margiela-flower-market.jpg` | Replica Flower Market |
| `margiela-bubble-bath.jpg` | Replica Bubble Bath |
| `armani-si.jpg` | Armani Sì |
| `armani-stronger-with-you.jpg` | Armani Stronger With You Absolutely |
| `mugler-angel.jpg` | Mugler Angel (blue + silver claws) |
| `fragrance-journal.jpg` | Editorial perfume-note journal sketch — Community hero, brand-neutral |
| `vote-image.jpg` | Perfume bottle shadow — Vote hero, brand-neutral fallback |
| `logo.jpeg` | The Scenthood S·H mark (reference only) |

> ⚠️ Two filenames are historic misleaders: `loreal-paris-clay.jpg` is actually La Nuit de L'Homme, and `community-page.jpg` is actually YSL Y. The mapping in `brandImages.ts` is correct — don't rename without updating the map.

---

## 5 · LocalStorage contracts

The app fakes persistence in localStorage. Two keys:

```ts
// Set by /signup, read by /profile and the create flow
"scenthood_user": {
  name, email, gender, ageRange, platform, initials,
  tier: "Scenthooders" | "Scentmaker" | "Scentsetters",
  lis: number, joinDate: ISO, referralCode: string,
  recentActivity: { action, points, date }[],
  votingQuality, contentOutput, peerEndorsement, sessionAttendance: number,
}

// Set by /community CreateModal, read on mount
"scenthood_user_posts": UserPost[]    // UserPost extends FeedPost { imageDataUrl?: string }
```

User-uploaded images are stored as `data:` URLs in the post and rendered via plain `<img>` (next/image refuses data URLs without `unoptimized`).

---

## 6 · What was changed in this session

In implementation order, on branch `brandstorm-2026` (1 commit, 38 files, +1788/-1748):

1. **Palette + typography** — new `scent.*` tokens; legacy `loreal-*` remapped; Archivo Black display font.
2. **Pill nav** (`BottomNav.tsx`) — colored pill nav top+bottom, S·H logo mark, Take the Quiz right-side CTA.
3. **Home redesign** — full-bleed L'Oréal Paris clay hero, oversized SCENTHOOD wordmark, live ticker, stats strip, featured vote with YSL Libre image, 4-card review grid, 6-card pilot brand strip, Tune-Into-The-Signal CTA → /signup, structured 3-column footer (Navigate + Discover + wordmark) + big-wordmark band.
4. **Community redesign** — fragrance-journal hero, sticky pill filters, masonry FeedCards using `imageFor()`, **functional Create & Earn LIS modal** (image upload, brand picker, fragrance picker, post type, caption, LIS reward → localStorage persist → prepends feed with "New" badge).
5. **Vote redesign** — split-image cards per vote using `imageFor(v.title, v.brand)`, hooks-in-map bug fixed by extracting VoteCard.
6. **Intelligence redesign** — new noir hero with 3 KPI tiles + grain; sections reordered (Strategic Recs → Trend Forecast → KPI cards → Weekly engagement → Brand engagement → World heat map → Community pulse).
7. **Referral redesign** — Oud Rose hero (Valentino Garavani fashion shot), hard-shadow card style, dark milestone tracker.
8. **Profile redesign** — Dua Lipa Libre hero with "About me." headline, circular LIS score, 4-component bars on dark card.
9. **Quiz redesign** — new pill buttons, display headings, S·H logo mark in the top bar.
10. **Signup redesign** — editorial 2-pane (left = YSL Libre hero / right = pill-button 3-step form). Welcome-done state is a full-bleed dark "You're in." takeover.
11. **`brandImages.ts`** — central image map. `imageFor(fragranceName?, brand?, seed?)` returns the correct campaign image; neutral textures (journal/shadow) fall back when no brand match.
12. **Brand renames** — all "Swarm 2026" replaced with **"Brandstorm 2026"**.
13. **Root redirect** — `app/page.tsx` redirects `/` to `/home` so there's a single landing page.
14. **Image-filename cleanup** — 12 new brand photos renamed from their messy originals.

---

## 7 · Known issues / things still to do

- **Subscribe button** on the home "Tune into the signal" block → goes to `/signup` (works).
- **No real backend.** Everything lives in mock data or localStorage. CreateModal posts don't sync across devices — by design for the pitch.
- **Three pages reuse images of opposite-gender campaigns** (e.g. Profile hero is Dua Lipa even if the user is male). Acceptable for an editorial hero, but flag-worthy if the user wants gendered hero swaps.
- **Filename misnomers** — see callout above for `loreal-paris-clay.jpg` and `community-page.jpg`.
- **Vercel deploy** — branch pushed, **not yet deployed**. Next step the user asked for was a preview deploy on `brandstorm-2026`. Pick up there.
- **`.claude/`** is in `.gitignore`. Don't try to commit local IDE/dev configs.
- **`feedPosts` from data.ts** is the seed array. CreateModal posts are prepended at runtime only.

---

## 8 · Conventions & gotchas

- **Never hard-code an image path in a page** — always `imageFor(fragranceName, brand, idx)`. This is the rule that prevents YSL imagery on a Margiela card.
- **next/image won't take data URLs** without `unoptimized`. Community feed uses a plain `<img>` when `post.imageDataUrl` is present.
- **Hooks rule** — VoteCard was extracted because the original mapped useState inside a `.map()`. Don't regress this.
- **`useScroll` parallax on the Home hero** uses a `useRef` on the hero div + `useTransform` for `y` and `opacity` — keep `target: heroRef`, don't swap to `container`.
- **Build/dev cache clash** — if you run `next build` while `next dev` is also running, kill dev + `rm -rf .next` before restarting. Hit this once.
- **Tailwind safelist** — none configured. Class names must appear literally; don't string-concat dynamic Tailwind tokens.
- **`/quiz` and `/signup` do not render `<BottomNav />`**. They have their own top bars (logo mark + "Scent Identity Quiz" / "Create Account").

---

## 9 · How to pick up from here

```bash
cd "/Users/markemad/Desktop/L'oreal app"
git checkout brandstorm-2026
npm install      # if node_modules is missing
npm run dev      # → http://localhost:3000
```

**Common asks the user will make next:**
- "Deploy to Vercel preview" → `vercel` (project isn't linked yet — first run will prompt to link to a Vercel project).
- "Change image on page X" → edit `src/lib/brandImages.ts` (preferred) or the `Image` `src` in the page if it's a hero.
- "Add a new fragrance to a vote/feed" → edit `src/lib/data.ts`. If it's a brand we have imagery for, the mapping auto-resolves.
- "Add a new brand" → add brand campaign image to `public/assets/`, then add a `BRAND_MAP[…]` entry and one `FRAGRANCE_MAP[…]` entry per fragrance, then optionally add to `PILOT_BRAND_CARDS`.
- "Make it look more / less template-y" → tune grain opacity in `globals.css` (`.grain::before { opacity: 0.22 }`), or swap Archivo Black for a different display weight.

---

## 10 · Git state at memory-save time

- Branch `brandstorm-2026` is **pushed** to `origin` (GitHub).
- 1 commit on the branch: `7a0376d Brandstorm 2026 redesign: cinematic editorial aesthetic`
- `main` is the older landing-page version.
- PR not yet opened. URL when you want one:
  https://github.com/markemadd/Scenthood-by-LOreal/pull/new/brandstorm-2026
