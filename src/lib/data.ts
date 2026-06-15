// ============================================================
// SCENTHOOD — Global Mock Data (v4 — Brand Catalog + Images)
// ============================================================

export type Tier = "Scenthooders" | "Scentmaker" | "Scentsetters";

export interface UserProfile {
  id: string;
  name: string;
  location: string;
  avatar: string;
  tier: Tier;
  ccs: number;
  joinDate: string;
  votingQuality: number;
  contentOutput: number;
  peerEndorsement: number;
  sessionAttendance: number;
  recentActivity: { action: string; points: number; date: string }[];
  scentProfile?: ScentProfile;
}

export interface ScentProfile {
  families: string[];
  memories: string[];
  moods: string[];
  occasions: string[];
  favBrand: string;
  identityTitle: string;
  identityDescription: string;
  recommendedFragrance: string;
  perfumeImage?: string;
  perfumeNotes?: string;
}

export interface BrandPerfume {
  name: string;
  fullName: string;
  brand: string;
  gender: "f" | "m" | "n";
  families: string[];
  image: string;
  notes: string;
  description: string;
}

// Fragrantica CDN helper
const fi = (id: number) => `https://fimgs.net/mdimg/perfume/375x500.${id}.jpg`;

// ── BRAND PERFUME CATALOG ──
// Real perfumes, correct gender attribution, verified families
export const brandPerfumeCatalog: Record<string, { f: BrandPerfume[]; m: BrandPerfume[]; n: BrandPerfume[] }> = {
  YSL: {
    f: [
      { name: "Libre", fullName: "YSL Libre", brand: "YSL Beauté", gender: "f", families: ["Floral", "Musk"], image: fi(57987), notes: "Top: Lavender · Mid: Orange Blossom · Base: Vanilla, Musk", description: "Bold florals meet warm vanilla — freedom bottled." },
      { name: "Black Opium", fullName: "YSL Black Opium", brand: "YSL Beauté", gender: "f", families: ["Amber", "Gourmand"], image: fi(33290), notes: "Top: Coffee, Pink Pepper · Mid: Jasmine · Base: Patchouli, Vanilla", description: "Addictive, dark, electrifying — the rebel's evening scent." },
      { name: "Mon Paris", fullName: "YSL Mon Paris", brand: "YSL Beauté", gender: "f", families: ["Floral", "Fruity"], image: fi(49773), notes: "Top: Pear, Bergamot · Mid: Rose, Peony · Base: Patchouli, Musk", description: "A modern Parisian love story in full bloom." },
    ],
    m: [
      { name: "Y Eau de Parfum", fullName: "YSL Y EDP", brand: "YSL Beauté", gender: "m", families: ["Woody", "Aromatic"], image: fi(45633), notes: "Top: Apple, Bergamot · Mid: Sage, Geranium · Base: Amberwood, Vetiver", description: "Decisive. Confident. The scent of his best self." },
      { name: "La Nuit de L'Homme", fullName: "YSL La Nuit de L'Homme", brand: "YSL Beauté", gender: "m", families: ["Woody", "Amber"], image: fi(9793), notes: "Top: Cardamom · Mid: Cedar, Lavender · Base: Vetiver, Coumarin", description: "Intimate cedar and cardamom — for nights that matter." },
      { name: "L'Homme", fullName: "YSL L'Homme", brand: "YSL Beauté", gender: "m", families: ["Woody", "Citrus"], image: fi(3840), notes: "Top: Bergamot, Ginger · Mid: Basil, White Pepper · Base: Cedar, Vetiver", description: "Crisp, refined and effortlessly sharp." },
    ],
    n: [],
  },
  "Maison Margiela Replica": {
    f: [
      { name: "Flower Market", fullName: "Replica Flower Market", brand: "Maison Margiela", gender: "f", families: ["Floral", "Fresh"], image: fi(26977), notes: "Top: Rose, Freesia · Mid: Violet, Lily · Base: White Musk, Sandalwood", description: "Sunday morning through an open flower-stall window." },
      { name: "Bubble Bath", fullName: "Replica Bubble Bath", brand: "Maison Margiela", gender: "f", families: ["Powdery", "Musk"], image: fi(45631), notes: "Top: Lemon, Green Notes · Mid: Heliotrope, Rose · Base: Sandalwood, Musk", description: "The warmth of a bath you never want to leave." },
      { name: "By The Fireplace", fullName: "Replica By The Fireplace", brand: "Maison Margiela", gender: "n", families: ["Amber", "Woody"], image: fi(36460), notes: "Top: Orange, Cloves · Mid: Chestnut, Guaiac Wood · Base: Vanilla, Benzoin", description: "A winter chalet. The fire crackles. You are exactly where you belong." },
    ],
    m: [
      { name: "Jazz Club", fullName: "Replica Jazz Club", brand: "Maison Margiela", gender: "m", families: ["Woody", "Tobacco"], image: fi(32268), notes: "Top: Rum, Lemon · Mid: Musk, Vetiver · Base: Virginia Tobacco, Vanilla", description: "A late autumn evening in a Copenhagen jazz bar — whisky, wood, leather." },
      { name: "Sailing Day", fullName: "Replica Sailing Day", brand: "Maison Margiela", gender: "m", families: ["Aquatic", "Citrus"], image: fi(37834), notes: "Top: Bergamot, Lemon · Mid: Juniper, Aldehydes · Base: Woody Notes, Musk", description: "Salt air and open horizon. The memory of freedom." },
      { name: "By The Fireplace", fullName: "Replica By The Fireplace", brand: "Maison Margiela", gender: "n", families: ["Amber", "Woody"], image: fi(36460), notes: "Top: Orange, Cloves · Mid: Chestnut, Guaiac Wood · Base: Vanilla, Benzoin", description: "A winter chalet. The fire crackles. You are exactly where you belong." },
    ],
    n: [
      { name: "By The Fireplace", fullName: "Replica By The Fireplace", brand: "Maison Margiela", gender: "n", families: ["Amber", "Woody"], image: fi(36460), notes: "Top: Orange, Cloves · Mid: Chestnut, Guaiac Wood · Base: Vanilla, Benzoin", description: "A winter chalet. The fire crackles. You are exactly where you belong." },
      { name: "Flower Market", fullName: "Replica Flower Market", brand: "Maison Margiela", gender: "f", families: ["Floral", "Fresh"], image: fi(26977), notes: "Top: Rose, Freesia · Mid: Violet, Lily · Base: White Musk, Sandalwood", description: "Sunday morning through an open flower-stall window." },
    ],
  },
  Lancôme: {
    f: [
      { name: "La Vie Est Belle", fullName: "Lancôme La Vie Est Belle", brand: "Lancôme", gender: "f", families: ["Gourmand", "Floral"], image: fi(21780), notes: "Top: Blackcurrant, Pear · Mid: Iris, Jasmine · Base: Praline, Patchouli, Vanilla", description: "Life is beautiful — an iris-praline masterpiece." },
      { name: "Idôle", fullName: "Lancôme Idôle", brand: "Lancôme", gender: "f", families: ["Floral", "Musk"], image: fi(63067), notes: "Top: Bergamot · Mid: Rose, Jasmine, Iris · Base: Musk, Cedarwood", description: "Radiant, floral and unapologetically confident." },
      { name: "Trésor", fullName: "Lancôme Trésor", brand: "Lancôme", gender: "f", families: ["Amber", "Floral"], image: fi(3001), notes: "Top: Peach, Apricot · Mid: Rose, Iris, Heliotrope · Base: Amber, Musk, Sandalwood", description: "A timeless floral amber — romantic, warm, eternal." },
    ],
    m: [
      { name: "L'Homme", fullName: "Lancôme L'Homme", brand: "Lancôme", gender: "m", families: ["Woody", "Aromatic"], image: fi(20527), notes: "Top: Bergamot, Basil · Mid: Cedar, Cardamom · Base: Vetiver, White Musk", description: "The Lancôme man — elegant, precise, irreplaceable." },
      { name: "Hypnôse Homme", fullName: "Lancôme Hypnôse Homme", brand: "Lancôme", gender: "m", families: ["Aromatic", "Woody"], image: fi(5766), notes: "Top: Bergamot, Coriander · Mid: Vetiver, Tonka Bean · Base: Amber, Musk", description: "Deep, enveloping and quietly hypnotic." },
    ],
    n: [],
  },
  Armani: {
    f: [
      { name: "Sì", fullName: "Armani Sì", brand: "Giorgio Armani", gender: "f", families: ["Floral", "Chypre"], image: fi(25564), notes: "Top: Blackcurrant Nectar · Mid: Rose, Freesia · Base: Patchouli, Vanilla, Ambroxan", description: "A declaration of modern femininity — structured and radiant." },
      { name: "Sì Passione", fullName: "Armani Sì Passione", brand: "Giorgio Armani", gender: "f", families: ["Floral", "Amber"], image: fi(57031), notes: "Top: Bergamot, Black Pepper · Mid: Rose, Jasmine · Base: Patchouli, Vanilla", description: "Passion amplified — Sì with an incandescent heart." },
      { name: "My Way", fullName: "Armani My Way", brand: "Giorgio Armani", gender: "f", families: ["Floral", "Woody"], image: fi(66520), notes: "Top: Bergamot, Orange Blossom · Mid: Tuberose, Indian Jasmine · Base: White Musk, Virginia Cedar", description: "For the woman who makes her own path." },
    ],
    m: [
      { name: "Acqua di Giò", fullName: "Armani Acqua di Giò", brand: "Giorgio Armani", gender: "m", families: ["Aquatic", "Citrus"], image: fi(2615), notes: "Top: Bergamot, Neroli, Calabrian Lime · Mid: Jasmine, Rosemary · Base: White Musk, Cedar, Amber", description: "The ocean, captured. A perpetual summer classic." },
      { name: "Acqua di Giò Profondo", fullName: "Armani Acqua di Giò Profondo", brand: "Giorgio Armani", gender: "m", families: ["Aquatic", "Woody"], image: fi(65474), notes: "Top: Green Mandarin, Bergamot · Mid: Mineral Accord, Rosemary · Base: Ambroxan, Patchouli, Musk", description: "The deeper, moodier ocean — mineral and magnetic." },
      { name: "Stronger With You", fullName: "Armani Stronger With You", brand: "Giorgio Armani", gender: "m", families: ["Amber", "Woody"], image: fi(57037), notes: "Top: Pink Pepper, Sage · Mid: Chestnut, Lavender · Base: Amber, Caramel, Vanilla", description: "Warm, spiced and irresistible — strength without arrogance." },
      { name: "Armani Code", fullName: "Armani Code", brand: "Giorgio Armani", gender: "m", families: ["Oriental", "Woody"], image: fi(4083), notes: "Top: Bergamot, Star Anise · Mid: Guaiac Wood, Olive Blossom · Base: Tobacco, Labdanum", description: "Dark, suave and unmistakably sophisticated." },
    ],
    n: [],
  },
  "Valentino / Prada": {
    f: [
      { name: "Born in Roma", fullName: "Valentino Born in Roma", brand: "Valentino", gender: "f", families: ["Floral", "Vanilla"], image: fi(59718), notes: "Top: Bergamot, Blackcurrant · Mid: Jasmine, Rose · Base: Vanilla, White Woods", description: "Roman passion — a jasmine-vanilla dream born under city lights." },
      { name: "Prada Paradoxe", fullName: "Prada Paradoxe", brand: "Prada", gender: "f", families: ["Floral", "Woody"], image: fi(76382), notes: "Top: Neroli, Bergamot · Mid: Jasmine, White Amber · Base: Cedarwood, Musk", description: "Floral but architectural — Prada's paradox made wearable." },
    ],
    m: [
      { name: "Born in Roma Uomo", fullName: "Valentino Born in Roma Uomo", brand: "Valentino", gender: "m", families: ["Aromatic", "Woody"], image: fi(62108), notes: "Top: Bergamot, Cardamom · Mid: Geranium, Sage · Base: Patchouli, Vetiver", description: "Raw Roman energy — aromatic, courageous and undeniably masculine." },
      { name: "Prada Luna Rossa Ocean", fullName: "Prada Luna Rossa Ocean", brand: "Prada", gender: "m", families: ["Aquatic", "Aromatic"], image: fi(75742), notes: "Top: Iris, Bergamot · Mid: Ambrette Seed · Base: Ambergris, Vetiver", description: "The precision of a racing hull. Clean power, quiet confidence." },
    ],
    n: [],
  },
};

export interface FeedPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userLocation: string;
  userTier: Tier;
  type: "video" | "photo" | "text";
  fragranceName: string;
  brand: string;
  thumbnailColor: string; // gradient for placeholder
  caption: string;
  likes: number;
  saves: number;
  comments: number;
  ccsEarned: number;
  timestamp: string;
  tags: string[];
  aspectRatio: "tall" | "wide" | "square";
  mediaUrl?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userLocation: string;
  userAvatar: string;
  userTier: Tier;
  fragranceName: string;
  excerpt: string;
  ccsEarned: number;
  upvotes: number;
  timestamp: string;
}

export interface AccordVote {
  id: string;
  title: string;
  subtitle: string;
  optionA: string;
  optionB: string;
  totalVotes: number;
  optionAVotes: number;
  optionBVotes: number;
  brand: string;
  perfumerNote: string;
  active: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  hint: string;
  options: { label: string; description: string; icon: string }[];
  multi?: boolean;
}

export interface LorealBrand {
  name: string;
  tagline: string;
  icon: string;
  category: "iconic" | "maison" | "prestige";
  topFragrance: string;
  family: string;
}

// ── CCS EARNING RATES ──
export const ccsEarning = {
  videoReview: 100,
  photoReview: 40,
  textReview: 20,
  upvoteReceived: 10,
  upvoteGiven: 1,
  eventAttendance: 30,
  councilEndorsement: 50,
  weeklyStreak: 20,
};

// ── TIERS ──
export type TierConfig = {
  name: Tier;
  subtitle: string;
  ccsRange: string;
  target: string;
  color: string;
  benefits: { label: string; physical?: boolean; exclusive?: boolean }[];
  perksHeadline: string;
};

export const tierData: TierConfig[] = [
  {
    name: "Scenthooders",
    subtitle: "Open Access · Community Foundation",
    ccsRange: "0–998",
    target: "Year 1 Global Target: 500,000 Scenthooders",
    color: "#A48B75",
    perksHeadline: "Your membership, made tangible.",
    benefits: [
      { label: "Vote on accord creative directions" },
      { label: "Publish video & photo reviews (+100 LIS per video)" },
      { label: "Discover your Scent Identity" },
      { label: "Physical 'SCENTHOOD' membership card — mailed to you", physical: true },
      { label: "Name printed in the annual community booklet", physical: true },
      { label: "Earn 15% discount codes capped at 3 purchases annually" },
      { label: "Shareable 'Scent Passport' PDF with your identity badge", physical: true },
      { label: "Annual 3–5 ml samples from your favourite scents with custom stickers on recyclable bottles", physical: true },
    ],
  },
  {
    name: "Scentmaker",
    subtitle: "Top 10% CCS · Earned by Contribution",
    ccsRange: "999+",
    target: "Year 1 Global Target: 50,000 Scentmakers",
    color: "#A8863A",
    perksHeadline: "Where contribution meets reward.",
    benefits: [
      { label: "Everything in Scenthooders" },
      { label: "Revenue share: €0.50 / 1,000 views (up to €500/month)", exclusive: true },
      { label: "Early access: new launches 2 weeks before public", exclusive: true },
      { label: "Quarterly 'Scentmaker Box' — curated samples & merch", physical: true, exclusive: true },
    ],
  },
  {
    name: "Scentsetters",
    subtitle: "Invitation-Only · Top 100 Global",
    ccsRange: "1000+",
    target: "Year 1: 100 Scentsetters worldwide",
    color: "#7A6028",
    perksHeadline: "Co-create the future of fragrance.",
    benefits: [
      { label: "Everything in Scentmaker" },
      { label: "Co-create product briefs with Givaudan & IFF master perfumers", exclusive: true },
      { label: "Attend the Annual Perfumer Summit (travel included)", physical: true, exclusive: true },
      { label: "Name engraved on a limited numbered bottle edition", physical: true, exclusive: true },
      { label: "Priority vote (2× weight) on all active briefs", exclusive: true },
      { label: "Direct line to L'Oréal Luxe creative team", exclusive: true },
      { label: "Get to edit one perfume for your own use, once a year", physical: true, exclusive: true },
    ],
  },
];

// ── ALL L'ORÉAL LUXE BRANDS (22) ──
export const lorealLuxeBrands: LorealBrand[] = [
  { name: "YSL Beauté", tagline: "Subversive. Couture. Free.", icon: "✦", category: "iconic", topFragrance: "Libre", family: "Floral-Musk" },
  { name: "Lancôme", tagline: "The art of gifting luxury.", icon: "🌹", category: "iconic", topFragrance: "La Vie Est Belle", family: "Gourmand" },
  { name: "Giorgio Armani", tagline: "Structured elegance, always.", icon: "◈", category: "iconic", topFragrance: "Sì", family: "Floral-Chypre" },
  { name: "Valentino Beauty", tagline: "Born in Rome. Made global.", icon: "✿", category: "iconic", topFragrance: "Born in Roma", family: "Floral-Vanilla" },
  { name: "Prada Beauty", tagline: "Intellectual luxury redefined.", icon: "◆", category: "maison", topFragrance: "Paradoxe", family: "Floral-Woody" },
  { name: "Maison Margiela Replica", tagline: "Memory in a bottle.", icon: "▣", category: "maison", topFragrance: "Jazz Club", family: "Woody-Tobacco" },
  { name: "Maison Francis Kurkdjian", tagline: "Perfumery as a fine art.", icon: "✧", category: "maison", topFragrance: "Baccarat Rouge 540", family: "Amber-Floral" },
  { name: "Atelier Cologne", tagline: "Cologne Absolue — the finest.", icon: "◯", category: "maison", topFragrance: "Oolang Infini", family: "Woody-Tea" },
  { name: "Viktor&Rolf", tagline: "Fashion's most unconventional nose.", icon: "✩", category: "maison", topFragrance: "Flowerbomb", family: "Floral-Oriental" },
  { name: "Mugler", tagline: "Architecture in scent.", icon: "⟡", category: "prestige", topFragrance: "Angel", family: "Gourmand" },
  { name: "Azzaro", tagline: "Bold. Unexpected. Then you.", icon: "◎", category: "prestige", topFragrance: "Wanted", family: "Citrus-Woody" },
  { name: "Cacharel", tagline: "Youth is a feeling.", icon: "◇", category: "prestige", topFragrance: "Anaïs Anaïs", family: "White Floral" },
  { name: "Ralph Lauren", tagline: "American romance, bottled.", icon: "◰", category: "iconic", topFragrance: "Polo Green", family: "Aromatic-Fougère" },
  { name: "Kiehl's", tagline: "Since 1851. Still honest.", icon: "◉", category: "prestige", topFragrance: "Original Musk", family: "Clean Musk" },
  { name: "Helena Rubinstein", tagline: "Ultra-prestige. Ultra-rare.", icon: "◍", category: "maison", topFragrance: "Wanted", family: "Floral" },
  { name: "Biotherm", tagline: "A breath of fresh water.", icon: "〜", category: "prestige", topFragrance: "Eau Pure", family: "Aquatic" },
  { name: "Urban Decay", tagline: "Beauty with an edge.", icon: "☿", category: "prestige", topFragrance: "Vibe", family: "Fruity-Floral" },
  { name: "IT Cosmetics", tagline: "Science of beauty, elevated.", icon: "◑", category: "prestige", topFragrance: "Confidence", family: "Clean-Musk" },
  { name: "Shu Uemura", tagline: "Art of beauty, from Tokyo.", icon: "❋", category: "maison", topFragrance: "Tsuya", family: "Floral-Woody" },
  { name: "Yue Sai", tagline: "Eastern luxury, global soul.", icon: "⬡", category: "prestige", topFragrance: "Imperial Orchid", family: "Floral-Oriental" },
  { name: "Diesel", tagline: "Fearless. Raw. Unfiltered.", icon: "◐", category: "prestige", topFragrance: "Only The Brave", family: "Aromatic-Woody" },
  { name: "Carita", tagline: "Haute beauté since 1954.", icon: "⬢", category: "maison", topFragrance: "Précieux Nectar", family: "Floral-Amber" },
];

// ── MOCK FEED POSTS ──
export const feedPosts: FeedPost[] = [
  {
    id: "fp1", userId: "u3", userName: "Yuki Tanaka", userAvatar: "YT", userLocation: "Tokyo",
    userTier: "Scentsetters", type: "video", fragranceName: "Replica Jazz Club", brand: "Maison Margiela",
    thumbnailColor: "from-amber-900 to-stone-800",
    caption: "Jazz Club doesn't just smell like a jazz club. It smells like the specific memory of being 22 and feeling the future open up in front of you. Watch to the end.",
    likes: 1847, saves: 412, comments: 89, ccsEarned: 120, timestamp: "2h ago",
    tags: ["WoodyAmber", "ReplicaCollection", "MaisonMargiela"], aspectRatio: "tall",
    mediaUrl: "/assets/margiela.mp4",
  },
  {
    id: "fp2", userId: "u2", userName: "Lucas Andersson", userAvatar: "LA", userLocation: "Stockholm",
    userTier: "Scentmaker", type: "video", fragranceName: "YSL Libre", brand: "YSL Beauté",
    thumbnailColor: "from-rose-800 to-neutral-900",
    caption: "Libre is what freedom smells like if freedom wore a blazer. The lavender-vanilla tension is extraordinary — and it lasts. 9 hours on my skin today.",
    likes: 643, saves: 218, comments: 34, ccsEarned: 60, timestamp: "5h ago",
    tags: ["YSLLibre", "FloralMusk", "Longevity"], aspectRatio: "square",
    mediaUrl: "/assets/ysl.mp4",
  },
  {
    id: "fp3", userId: "u1", userName: "Isabelle Moreau", userAvatar: "IM", userLocation: "Paris",
    userTier: "Scenthooders", type: "photo", fragranceName: "Lancôme La Vie Est Belle", brand: "Lancôme",
    thumbnailColor: "from-pink-700 to-purple-900",
    caption: "Get ready with me — the full morning routine, and why La Vie Est Belle is the perfect opener. Three sprays max. Never more.",
    likes: 2241, saves: 884, comments: 156, ccsEarned: 120, timestamp: "8h ago",
    tags: ["GRWM", "Lancome", "GourmandIris"], aspectRatio: "tall",
    mediaUrl: "/assets/lancome-new.webp",
  },
  {
    id: "fp4", userId: "u3", userName: "Yuki Tanaka", userAvatar: "YT", userLocation: "Tokyo",
    userTier: "Scentsetters", type: "photo", fragranceName: "Prada Paradoxe", brand: "Prada",
    thumbnailColor: "from-stone-600 to-zinc-900",
    caption: "Paradoxe is floral but it doesn't know it. The amber base turns it into something structural, almost architectural. Prada gets it.",
    likes: 918, saves: 302, comments: 67, ccsEarned: 60, timestamp: "12h ago",
    tags: ["PradaParadoxe", "FloralWoody", "CoutureFrag"], aspectRatio: "wide",
    mediaUrl: "/assets/prada-new.webp",
  },
  {
    id: "fp5", userId: "u2", userName: "Lucas Andersson", userAvatar: "LA", userLocation: "Stockholm",
    userTier: "Scentmaker", type: "video", fragranceName: "Mugler Angel", brand: "Mugler",
    thumbnailColor: "from-blue-900 to-indigo-900",
    caption: "Angel is 1992 calling. The patchouli-chocolate combination should not work, and yet it is the most iconic fragrance ever made. A masterclass in rule-breaking.",
    likes: 447, saves: 129, comments: 52, ccsEarned: 40, timestamp: "1d ago",
    tags: ["MuglerAngel", "Gourmand", "90sFragrance"], aspectRatio: "square",
    mediaUrl: "/assets/mugler.mp4",
  },
  {
    id: "fp6", userId: "u1", userName: "Isabelle Moreau", userAvatar: "IM", userLocation: "Paris",
    userTier: "Scenthooders", type: "photo", fragranceName: "Valentino Born in Roma", brand: "Valentino",
    thumbnailColor: "from-red-900 to-neutral-800",
    caption: "I tested Born in Roma for 5 days in 5 different cities. Here's what I found. This one surprised me most in humidity — the jasmine became almost edible.",
    likes: 3102, saves: 1120, comments: 234, ccsEarned: 120, timestamp: "2d ago",
    tags: ["ValentinoBornInRoma", "FloralAmber", "TravelReview"], aspectRatio: "tall",
    mediaUrl: "/assets/valentino-new.webp",
  },
  {
    id: "fp7", userId: "u-layla", userName: "Layla · @laylascents", userAvatar: "LA", userLocation: "Laylascents",
    userTier: "Scentsetters", type: "video", fragranceName: "YSL Libre", brand: "YSL Beauté",
    thumbnailColor: "from-rose-900 to-stone-900",
    caption: "First impressions of YSL Libre — recorded the moment I opened the box. The lavender-orange blossom opening is sharper than expected, then it softens into something almost edible.",
    likes: 1289, saves: 367, comments: 78, ccsEarned: 120, timestamp: "3d ago",
    tags: ["YSLLibre", "Laylascents", "FirstImpression"], aspectRatio: "tall",
    mediaUrl: "/assets/review-video.mp4",
  },
];

// ── USERS ──
export const users: UserProfile[] = [
  {
    id: "u1", name: "Isabelle Moreau", location: "Paris, France", avatar: "IM",
    tier: "Scenthooders", ccs: 320, joinDate: "2025-11-15",
    votingQuality: 68, contentOutput: 52, peerEndorsement: 45, sessionAttendance: 30,
    recentActivity: [
      { action: "Posted video review: La Vie Est Belle", points: 120, date: "8h ago" },
      { action: "Voted on Libre Flanker", points: 15, date: "2h ago" },
      { action: "Upvoted 3 community posts", points: 6, date: "2d ago" },
    ],
  },
  {
    id: "u2", name: "Lucas Andersson", location: "Stockholm, Sweden", avatar: "LA",
    tier: "Scentmaker", ccs: 847, joinDate: "2025-09-03",
    votingQuality: 85, contentOutput: 92, peerEndorsement: 78, sessionAttendance: 74,
    recentActivity: [
      { action: "Posted photo review: YSL Libre", points: 60, date: "5h ago" },
      { action: "Voted on Libre Flanker", points: 15, date: "1h ago" },
      { action: "Attended Perfumer Q&A", points: 30, date: "3h ago" },
      { action: "Review endorsed by 3 peers (+25 each)", points: 75, date: "1d ago" },
      { action: "Endorsed by Council member", points: 50, date: "2d ago" },
    ],
    scentProfile: {
      families: ["Woody", "Amber"], memories: ["Rain on old books", "Fireplace in winter"],
      moods: ["Mysterious", "Nostalgic"], occasions: ["Special Events", "Evenings"],
      favBrand: "Maison Margiela Replica",
      identityTitle: "The Literary Wanderer",
      identityDescription:
        "Your scent identity is defined by intellectual depth and warmth — woody ambers that unfold like the pages of a well-travelled novel. You wear fragrance as a form of emotional memory.",
      recommendedFragrance: "Replica Jazz Club",
    },
  },
  {
    id: "u3", name: "Yuki Tanaka", location: "Tokyo, Japan", avatar: "YT",
    tier: "Scentsetters", ccs: 1420, joinDate: "2025-07-20",
    votingQuality: 95, contentOutput: 98, peerEndorsement: 96, sessionAttendance: 92,
    recentActivity: [
      { action: "Posted video review: Replica Jazz Club", points: 120, date: "2h ago" },
      { action: "Priority voted on Replica Edition", points: 25, date: "30m ago" },
      { action: "Co-created product brief with perfumers", points: 100, date: "yesterday" },
      { action: "Hosted community session", points: 30, date: "2d ago" },
    ],
  },
];

// ── REVIEWS ──
export const reviews: Review[] = [
  {
    id: "r1", userId: "u2", userName: "Lucas Andersson", userLocation: "Stockholm",
    userAvatar: "LA", userTier: "Scentmaker", fragranceName: "Replica Jazz Club",
    excerpt: "Jazz Club feels like a late autumn evening in a Copenhagen bar — whisky, wood polish, and a stranger's cigarette smoke just beyond the window. This is what memory smells like.",
    ccsEarned: 40, upvotes: 47, timestamp: "2h ago",
  },
  {
    id: "r2", userId: "u3", userName: "Yuki Tanaka", userLocation: "Tokyo",
    userAvatar: "YT", userTier: "Scentsetters", fragranceName: "YSL Libre",
    excerpt: "Libre opens like a declaration. The lavender and vanilla aren't fighting — they've reached an agreement. This is what confidence smells like when it doesn't need to announce itself.",
    ccsEarned: 40, upvotes: 89, timestamp: "5h ago",
  },
  {
    id: "r3", userId: "u1", userName: "Isabelle Moreau", userLocation: "Paris",
    userAvatar: "IM", userTier: "Scenthooders", fragranceName: "Replica By The Fireplace",
    excerpt: "By the Fireplace captures the exact feeling of a chalet weekend in the Alps — warm wood, a roaring fire, and the contentment of being exactly where you're supposed to be.",
    ccsEarned: 40, upvotes: 34, timestamp: "1d ago",
  },
  {
    id: "r4", userId: "u2", userName: "Lucas Andersson", userLocation: "Stockholm",
    userAvatar: "LA", userTier: "Scentmaker", fragranceName: "Armani Privé Bois d'Encens",
    excerpt: "An elevated incense that doesn't shy away from its sacred roots — honeyed, rich, and absolutely unapologetic. Rare for a resinous composition to feel this contemporary.",
    ccsEarned: 40, upvotes: 62, timestamp: "1d ago",
  },
  {
    id: "r5", userId: "u3", userName: "Yuki Tanaka", userLocation: "Tokyo",
    userAvatar: "YT", userTier: "Scentsetters", fragranceName: "Lancôme La Vie Est Belle",
    excerpt: "La Vie Est Belle is exactly that — life at its most joyful. The iris heart is textbook-perfect, and the praline base keeps it modern without ever feeling sweet-heavy.",
    ccsEarned: 40, upvotes: 71, timestamp: "2d ago",
  },
];

// ── VOTES ──
export const accordVotes: AccordVote[] = [
  {
    id: "v1", title: "Next YSL Libre Flanker", brand: "YSL Beauté",
    subtitle: "Help shape the creative direction of the next Libre edition",
    optionA: "Woody-Smoky", optionB: "Citrus-Fresh",
    totalVotes: 23419, optionAVotes: 14051, optionBVotes: 9368,
    perfumerNote: '"The woody-smoky direction opens genuinely interesting territory. The community\'s pull toward depth and character over brightness reveals a fragrance audience that has grown in sophistication." — Anne Flipo, Master Perfumer',
    active: true,
  },
  {
    id: "v2", title: "Valentino Born in Roma — Next Chapter", brand: "Valentino Beauty",
    subtitle: "Help shape the direction of the next Born in Roma flanker",
    optionA: "Intense Oud-Rose", optionB: "Solar Citrus-Iris",
    totalVotes: 14870, optionAVotes: 9102, optionBVotes: 5768,
    perfumerNote: '"The community\'s lean toward the Oud-Rose direction is fascinating — it suggests a desire for depth and intimacy in the Born in Roma universe. This could redefine the flanker playbook." — Alberto Morillas, Perfumer',
    active: true,
  },
];

// ── QUIZ ──
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1, question: "Which scent families speak to you?", hint: "Select all that resonate",
    options: [
      { label: "Woody", description: "Cedar, sandalwood, vetiver", icon: "🌿" },
      { label: "Floral", description: "Rose, jasmine, iris", icon: "🌸" },
      { label: "Citrus", description: "Bergamot, neroli, lemon", icon: "🍊" },
      { label: "Amber", description: "Warm, resinous, vanilla", icon: "✨" },
      { label: "Fresh", description: "Clean, airy, ozonic", icon: "💧" },
    ], multi: true,
  },
  {
    id: 2, question: "Which moment resonates with you most?", hint: "Choose your fragrance memory",
    options: [
      { label: "A café on a grey morning", description: "Espresso, warm bread, anticipation", icon: "☕" },
      { label: "A bookshop in autumn", description: "Paper, leather, aged wood", icon: "📖" },
      { label: "After summer rain", description: "Petrichor, green, coolness", icon: "🌧️" },
      { label: "A fireplace in winter", description: "Smoke, warmth, belonging", icon: "🔥" },
      { label: "The ocean at dusk", description: "Salt, wind, open horizon", icon: "🌊" },
    ], multi: false,
  },
  {
    id: 3, question: "What mood does your ideal fragrance evoke?", hint: "Choose one",
    options: [
      { label: "Mysterious", description: "Depth, intrigue, complexity", icon: "🌙" },
      { label: "Confident", description: "Presence, clarity, power", icon: "⚡" },
      { label: "Romantic", description: "Tender, warm, sensual", icon: "🌹" },
      { label: "Serene", description: "Calm, grounded, peaceful", icon: "🕊️" },
      { label: "Bold", description: "Unapologetic, striking, vivid", icon: "🔥" },
    ], multi: false,
  },
  {
    id: 4, question: "When do you reach for fragrance?", hint: "Select all that apply",
    options: [
      { label: "Every morning", description: "Part of my daily ritual", icon: "☀️" },
      { label: "Special occasions", description: "Memorable moments", icon: "✨" },
      { label: "Evening & nights out", description: "After dark, when it counts", icon: "🌃" },
      { label: "At the office", description: "Subtle, professional", icon: "💼" },
    ], multi: true,
  },
  {
    id: 5, question: "Which L'Oréal Luxe world is yours?", hint: "Your heritage",
    options: [
      { label: "YSL", description: "Subversive, couture, free", icon: "🖤" },
      { label: "Maison Margiela Replica", description: "Memory, intimacy, story", icon: "🏛️" },
      { label: "Lancôme", description: "Timeless, radiant, Parisian", icon: "🌹" },
      { label: "Armani", description: "Structured, powerful, refined", icon: "🎯" },
      { label: "Valentino / Prada", description: "Modern luxury, craft", icon: "💎" },
    ], multi: false,
  },
];

// ── SCENT IDENTITY RESULTS ──
// Keys: "[family]_[gender]_[ageGroup]" — gender: m/f/n  ageGroup: young(18-29)/mid(30-44)/mature(45+)
export const scentIdentities: Record<string, ScentProfile> = {
  // ── FLORAL ──
  "floral_f_young": {
    families: ["Floral", "Musk"], memories: ["A café on a grey morning"], moods: ["Romantic"],
    occasions: ["Daily", "Evenings"], favBrand: "YSL",
    identityTitle: "The Free Spirit",
    identityDescription: "Bold florals with a musky heart — your scent is radiant, unapologetic, and unmistakably free. You wear fragrance like punctuation.",
    recommendedFragrance: "YSL Libre",
    perfumeImage: fi(57987),
    perfumeNotes: "Top: Lavender · Mid: Orange Blossom · Base: Vanilla, Musk",
  },
  "floral_f_mid": {
    families: ["Floral", "Gourmand"], memories: ["A café on a grey morning"], moods: ["Romantic"],
    occasions: ["Daily"], favBrand: "Lancôme",
    identityTitle: "The New Classicist",
    identityDescription: "You are drawn to the enduring power of florals — structured and purposeful. Your fragrance tells a story of quiet elegance that never needs to raise its voice.",
    recommendedFragrance: "Lancôme La Vie Est Belle",
    perfumeImage: fi(21780),
    perfumeNotes: "Top: Blackcurrant, Pear · Mid: Iris, Jasmine · Base: Praline, Vanilla",
  },
  "floral_f_mature": {
    families: ["Floral", "Chypre"], memories: ["A bookshop in autumn"], moods: ["Serene"],
    occasions: ["Special occasions"], favBrand: "Giorgio Armani",
    identityTitle: "The Elegant Signature",
    identityDescription: "Your fragrance is a refined declaration — floral-chypre accords that carry decades of craftsmanship and the confidence that only experience brings.",
    recommendedFragrance: "Armani Sì",
    perfumeImage: fi(25564),
    perfumeNotes: "Top: Blackcurrant Nectar · Mid: Rose, Freesia · Base: Patchouli, Vanilla",
  },
  "floral_m_young": {
    families: ["Floral", "Citrus"], memories: ["After summer rain"], moods: ["Confident"],
    occasions: ["Daily"], favBrand: "Valentino",
    identityTitle: "The Roman Modernist",
    identityDescription: "Crisp, floral, and courageous — your scent identity is about standing out without trying. Born in a tradition of bold choices.",
    recommendedFragrance: "Valentino Born in Roma Uomo",
    perfumeImage: fi(62108),
    perfumeNotes: "Top: Bergamot, Cardamom · Mid: Geranium, Sage · Base: Patchouli, Vetiver",
  },
  "floral_m_mid": {
    families: ["Aromatic", "Floral"], memories: ["A fireplace in winter"], moods: ["Serene"],
    occasions: ["Office", "Evenings"], favBrand: "Giorgio Armani",
    identityTitle: "The Understated Authority",
    identityDescription: "Your presence is felt before you enter. Aromatic and structured, your fragrance communicates quiet power — the signature of a man who doesn't need to raise his voice.",
    recommendedFragrance: "Armani Acqua di Giò Profondo",
    perfumeImage: fi(65474),
    perfumeNotes: "Top: Green Mandarin, Bergamot · Mid: Mineral Accord · Base: Ambroxan, Patchouli",
  },
  "floral_m_mature": {
    families: ["Woody", "Floral"], memories: ["A bookshop in autumn"], moods: ["Mysterious"],
    occasions: ["Special occasions"], favBrand: "Lancôme",
    identityTitle: "The Timeless Gentleman",
    identityDescription: "A woody-floral depth that speaks of experience and refinement — your fragrance is never loud, always remembered.",
    recommendedFragrance: "Lancôme L'Homme",
    perfumeImage: fi(20527),
    perfumeNotes: "Top: Bergamot, Basil · Mid: Cedar, Cardamom · Base: Vetiver, White Musk",
  },
  "floral_n_young": {
    families: ["Floral", "Musk"], memories: ["A café on a grey morning"], moods: ["Bold"],
    occasions: ["Daily"], favBrand: "Maison Margiela Replica",
    identityTitle: "The Undefined",
    identityDescription: "Clean, beautiful, and unboxable. Your scent is a statement about not being defined — soft musk florals that belong to no one category.",
    recommendedFragrance: "Replica Flower Market",
    perfumeImage: fi(26977),
    perfumeNotes: "Top: Rose, Freesia · Mid: Violet, Lily · Base: White Musk, Sandalwood",
  },
  // ── WOODY / AMBER ──
  "amber_f_young": {
    families: ["Amber", "Vanilla"], memories: ["A fireplace in winter"], moods: ["Romantic"],
    occasions: ["Evenings", "Special occasions"], favBrand: "YSL",
    identityTitle: "The Velvet Romantic",
    identityDescription: "Warm amber with a vanilla heart — your scent is intimate and magnetic. You leave an impression that lasts long after you've left the room.",
    recommendedFragrance: "YSL Black Opium",
    perfumeImage: fi(33290),
    perfumeNotes: "Top: Coffee, Pink Pepper · Mid: Jasmine · Base: Patchouli, Vanilla",
  },
  "amber_f_mid": {
    families: ["Amber", "Floral"], memories: ["A fireplace in winter"], moods: ["Romantic"],
    occasions: ["Special occasions"], favBrand: "Giorgio Armani",
    identityTitle: "The Quiet Hedonist",
    identityDescription: "Warmth is your compass. Rich ambers and deep wood compositions speak to your appreciation for the finer things — unhurried, generous, deeply pleasurable.",
    recommendedFragrance: "Armani Sì Passione",
    perfumeImage: fi(57031),
    perfumeNotes: "Top: Bergamot, Black Pepper · Mid: Rose, Jasmine · Base: Patchouli, Vanilla",
  },
  "amber_f_mature": {
    families: ["Amber", "Woody"], memories: ["A bookshop in autumn"], moods: ["Serene"],
    occasions: ["Evening", "Special occasions"], favBrand: "Lancôme",
    identityTitle: "The Golden Hour",
    identityDescription: "Amber on your skin develops into something extraordinary — resinous, warm, and deeply personal. You don't follow trends. You set them, quietly.",
    recommendedFragrance: "Lancôme Trésor",
    perfumeImage: fi(3001),
    perfumeNotes: "Top: Peach, Apricot · Mid: Rose, Iris · Base: Amber, Musk, Sandalwood",
  },
  "amber_m_young": {
    families: ["Woody", "Amber"], memories: ["A fireplace in winter"], moods: ["Bold"],
    occasions: ["Evenings"], favBrand: "YSL",
    identityTitle: "The Night Architect",
    identityDescription: "You build your nights deliberately. Smoky ambers and warm woods are your materials — structured, intentional, magnetic.",
    recommendedFragrance: "YSL La Nuit de L'Homme",
    perfumeImage: fi(9793),
    perfumeNotes: "Top: Cardamom · Mid: Cedar, Lavender · Base: Vetiver, Coumarin",
  },
  "amber_m_mid": {
    families: ["Woody", "Amber"], memories: ["A fireplace in winter"], moods: ["Mysterious"],
    occasions: ["Evening", "Special occasions"], favBrand: "Maison Margiela Replica",
    identityTitle: "The Literary Wanderer",
    identityDescription: "Your scent identity is defined by depth and warmth — woody ambers that unfold like the pages of a well-travelled novel. You wear fragrance as a form of emotional memory.",
    recommendedFragrance: "Replica Jazz Club",
    perfumeImage: fi(32268),
    perfumeNotes: "Top: Rum, Lemon · Mid: Musk, Vetiver · Base: Virginia Tobacco, Vanilla",
  },
  "amber_m_mature": {
    families: ["Amber", "Incense"], memories: ["A bookshop in autumn"], moods: ["Mysterious"],
    occasions: ["Special occasions"], favBrand: "Giorgio Armani",
    identityTitle: "The Distinguished Collector",
    identityDescription: "Deep, resinous, meditative. Your fragrance is a collector's choice — incense-amber that carries the weight of lived experience and cultured taste.",
    recommendedFragrance: "Armani Stronger With You",
    perfumeImage: fi(57037),
    perfumeNotes: "Top: Pink Pepper, Sage · Mid: Chestnut, Lavender · Base: Amber, Caramel, Vanilla",
  },
  "amber_n_young": {
    families: ["Amber", "Musk"], memories: ["A fireplace in winter"], moods: ["Romantic"],
    occasions: ["Evenings"], favBrand: "Maison Margiela Replica",
    identityTitle: "The Warm Wanderer",
    identityDescription: "Cocooning and intimate — your amber-musk identity is about warmth that draws people in. A scent that becomes distinctly yours on your skin.",
    recommendedFragrance: "Replica By The Fireplace",
    perfumeImage: fi(36460),
    perfumeNotes: "Top: Orange, Cloves · Mid: Chestnut, Guaiac Wood · Base: Vanilla, Benzoin",
  },
  // ── CITRUS / FRESH ──
  "citrus_f_young": {
    families: ["Citrus", "Floral"], memories: ["After summer rain"], moods: ["Confident"],
    occasions: ["Daily", "Office"], favBrand: "Lancôme",
    identityTitle: "The Solar Spirit",
    identityDescription: "You are your own sunshine. Citrus-floral accords that burst with energy and optimism — a fragrance that announces a new day has arrived.",
    recommendedFragrance: "Lancôme Idôle",
    perfumeImage: fi(63067),
    perfumeNotes: "Top: Bergamot · Mid: Rose, Jasmine, Iris · Base: Musk, Cedarwood",
  },
  "citrus_f_mid": {
    families: ["Citrus", "Woody"], memories: ["After summer rain"], moods: ["Confident"],
    occasions: ["Daily", "Office"], favBrand: "Giorgio Armani",
    identityTitle: "The Urban Nomad",
    identityDescription: "You thrive in movement. Bright citrus and clean woods mirror your decisive energy — always present, never heavy.",
    recommendedFragrance: "Armani My Way",
    perfumeImage: fi(66520),
    perfumeNotes: "Top: Orange Blossom, Bergamot · Mid: Tuberose, Indian Jasmine · Base: White Musk, Cedar",
  },
  "citrus_m_young": {
    families: ["Citrus", "Aquatic"], memories: ["The ocean at dusk"], moods: ["Confident"],
    occasions: ["Daily", "Sports"], favBrand: "Giorgio Armani",
    identityTitle: "The Open-Water Thinker",
    identityDescription: "Aquatic citrus — fresh, boundless, and clear-headed. You approach life like the open ocean: no limits, no noise, just forward motion.",
    recommendedFragrance: "Armani Acqua di Giò",
    perfumeImage: fi(2615),
    perfumeNotes: "Top: Bergamot, Neroli, Lime · Mid: Jasmine, Rosemary · Base: White Musk, Cedar, Amber",
  },
  "citrus_m_mid": {
    families: ["Citrus", "Woody"], memories: ["After summer rain"], moods: ["Confident"],
    occasions: ["Office", "Daily"], favBrand: "Azzaro",
    identityTitle: "The Decisive Modern",
    identityDescription: "Sharp bergamot and dry cedar — your fragrance is a handshake, a decision, a signature. Crisp and unapologetically masculine.",
    recommendedFragrance: "Azzaro Wanted By Night",
    perfumeImage: fi(57124),
    perfumeNotes: "Top: Bergamot, Apple, Cardamom · Mid: Violet, Geranium · Base: Amberwood, Vetiver",
  },
  "citrus_n_young": {
    families: ["Citrus", "Musk"], memories: ["After summer rain"], moods: ["Serene"],
    occasions: ["Daily"], favBrand: "Maison Margiela Replica",
    identityTitle: "The Clean Minimalist",
    identityDescription: "You believe in simplicity. Clean citrus and soft musk — a fragrance that disappears into your skin and becomes you. No ego, all presence.",
    recommendedFragrance: "Replica Sailing Day",
    perfumeImage: fi(37834),
    perfumeNotes: "Top: Bergamot, Lemon · Mid: Juniper, Aldehydes · Base: Woody Notes, Musk",
  },
  // ── DEFAULTS (fallback if no specific match) ──
  "default_f": {
    families: ["Floral", "Musk"], memories: ["A café on a grey morning"], moods: ["Romantic"],
    occasions: ["Daily"], favBrand: "Lancôme",
    identityTitle: "The New Classicist",
    identityDescription: "You are drawn to the enduring power of florals — structured and purposeful. Your fragrance tells a story of quiet elegance.",
    recommendedFragrance: "Lancôme La Vie Est Belle",
    perfumeImage: fi(21780),
    perfumeNotes: "Top: Blackcurrant, Pear · Mid: Iris, Jasmine · Base: Praline, Vanilla",
  },
  "default_m": {
    families: ["Woody", "Amber"], memories: ["A fireplace in winter"], moods: ["Mysterious"],
    occasions: ["Evenings"], favBrand: "Maison Margiela Replica",
    identityTitle: "The Literary Wanderer",
    identityDescription: "Your scent identity is defined by depth and warmth — woody ambers that unfold like the pages of a well-travelled novel.",
    recommendedFragrance: "Replica Jazz Club",
    perfumeImage: fi(32268),
    perfumeNotes: "Top: Rum, Lemon · Mid: Musk, Vetiver · Base: Virginia Tobacco, Vanilla",
  },
  "default_n": {
    families: ["Woody", "Musk"], memories: ["After summer rain"], moods: ["Serene"],
    occasions: ["Daily"], favBrand: "Maison Margiela Replica",
    identityTitle: "The Fluid Soul",
    identityDescription: "Genderless and quietly powerful — your fragrance resists definition. Clean woods and soft musks that belong entirely to you.",
    recommendedFragrance: "Replica By The Fireplace",
    perfumeImage: fi(36460),
    perfumeNotes: "Top: Orange, Cloves · Mid: Chestnut, Guaiac Wood · Base: Vanilla, Benzoin",
  },
};

// ── COMMUNITY STATS ──
export const communityStats = {
  totalVotes: "34,649",
  activeMembers: "12,847",
  tiktokViews: "2.1B",
  countries: "47",
};

// ── INTELLIGENCE DATA ──
export const intelligenceData = {
  // Weekly engagement (past 8 weeks)
  weeklyEngagement: [
    { week: "W1", votes: 2100, reviews: 340, newMembers: 890 },
    { week: "W2", votes: 2650, reviews: 410, newMembers: 1120 },
    { week: "W3", votes: 3200, reviews: 520, newMembers: 1340 },
    { week: "W4", votes: 2900, reviews: 480, newMembers: 980 },
    { week: "W5", votes: 4100, reviews: 670, newMembers: 1850 },
    { week: "W6", votes: 5300, reviews: 890, newMembers: 2200 },
    { week: "W7", votes: 4800, reviews: 820, newMembers: 1980 },
    { week: "W8", votes: 6200, reviews: 1040, newMembers: 2540 },
  ],

  // Brand engagement
  brandEngagement: [
    { brand: "YSL Libre", posts: 8420, votes: 12300, ccsGenerated: 184000 },
    { brand: "Maison Margiela", posts: 6100, votes: 9800, ccsGenerated: 142000 },
    { brand: "Lancôme", posts: 5200, votes: 7400, ccsGenerated: 118000 },
    { brand: "Valentino", posts: 3800, votes: 5100, ccsGenerated: 89000 },
    { brand: "Mugler", posts: 3100, votes: 4200, ccsGenerated: 71000 },
  ],

  // Accord trending by age group
  accordsByAge: [
    { accord: "Woody-Amber", "18-24": 28, "25-34": 34, "35-44": 38, "45+": 42 },
    { accord: "Floral-Musk", "18-24": 41, "25-34": 32, "35-44": 26, "45+": 22 },
    { accord: "Citrus-Fresh", "18-24": 36, "25-34": 28, "35-44": 24, "45+": 18 },
    { accord: "Gourmand", "18-24": 44, "25-34": 30, "35-44": 22, "45+": 16 },
  ],

  // Content format performance
  contentPerformance: [
    { format: "Video Review", avgCCS: 120, avgViews: 4200, conversionToVote: 68 },
    { format: "Photo Review", avgCCS: 60, avgViews: 1850, conversionToVote: 42 },
    { format: "Text Review", avgCCS: 40, avgViews: 640, conversionToVote: 28 },
  ],

  // KPIs
  communityHealth: 78,
  cltvMultiple: 2.3,
  organicCAC: 4.2,
  industryCAC: 52,
  retentionRate: 84,
  weeklyActiveRate: 61,
  avgCCSPerMember: 312,
  contentCreatorRate: 34,

  // Region breakdown
  regionBreakdown: [
    { name: "Western Europe", intensity: 95, families: "Floral-Musk, Woody", growth: "+18%" },
    { name: "North America", intensity: 83, families: "Fresh, Citrus", growth: "+24%" },
    { name: "East Asia", intensity: 74, families: "Woody-Amber, Floral", growth: "+41%" },
    { name: "Middle East", intensity: 68, families: "Woody-Amber, Spicy", growth: "+29%" },
    { name: "Latin America", intensity: 55, families: "Citrus, Floral", growth: "+35%" },
    { name: "Oceania", intensity: 42, families: "Fresh, Citrus", growth: "+19%" },
  ],
};

// ── PILOT BRANDS ──
export const pilotBrands = [
  {
    name: "YSL Beauté",
    tagline: "Community votes on the next Libre flanker. Scentsetters shape the brief. The launch reads: Co-Created by SCENTHOOD.",
    targets: ["30,000 Scenthooders", "800 Scentmakers", "3 Scentsetters seats"],
    timeline: "Phase 1 Launch",
    editions: [],
  },
  {
    name: "Valentino Beauty",
    tagline: "Born in Roma — Next Chapter: the community votes on the creative direction of the next flanker. Your input shapes the brief.",
    editions: ["Oud-Rose Intense", "Solar Citrus-Iris", "Coral Fantasy"],
    targets: ["25,000 Scenthooders", "600 Scentmakers", "3 Scentsetters seats"],
    timeline: "Phase 1 Launch",
  },
];
