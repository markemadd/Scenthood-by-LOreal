-- One-time seed: starter community posts.
-- Paste this entire file into Supabase SQL Editor → New query → Run.
-- Safe to re-run: clears existing seeds first (matched by user_name+fragrance_name pair).

delete from posts where id in (
  select id from posts order by created_at asc limit 7
);

insert into posts (user_name, user_avatar, user_tier, user_location, type, fragrance_name, brand, caption, media_url, aspect_ratio, likes, saves, comments, ccs_earned, tags, created_at) values
('Yuki Tanaka', 'YT', 'Scentsetters', 'Tokyo', 'video', 'Replica Jazz Club', 'Maison Margiela',
 'Jazz Club doesn''t just smell like a jazz club. It smells like the specific memory of being 22 and feeling the future open up in front of you. Watch to the end.',
 '/assets/margiela.mp4', 'tall', 1847, 412, 89, 120,
 array['WoodyAmber','ReplicaCollection','MaisonMargiela'], now() - interval '2 hours'),

('Lucas Andersson', 'LA', 'Scentmaker', 'Stockholm', 'video', 'YSL Libre', 'YSL Beauté',
 'Libre is what freedom smells like if freedom wore a blazer. The lavender-vanilla tension is extraordinary — and it lasts. 9 hours on my skin today.',
 '/assets/ysl.mp4', 'square', 643, 218, 34, 60,
 array['YSLLibre','FloralMusk','Longevity'], now() - interval '5 hours'),

('Isabelle Moreau', 'IM', 'Scenthooders', 'Paris', 'photo', 'Lancôme La Vie Est Belle', 'Lancôme',
 'Get ready with me — the full morning routine, and why La Vie Est Belle is the perfect opener. Three sprays max. Never more.',
 '/assets/lancome-new.webp', 'tall', 2241, 884, 156, 120,
 array['GRWM','Lancome','GourmandIris'], now() - interval '8 hours'),

('Yuki Tanaka', 'YT', 'Scentsetters', 'Tokyo', 'photo', 'Prada Paradoxe', 'Prada',
 'Paradoxe is floral but it doesn''t know it. The amber base turns it into something structural, almost architectural. Prada gets it.',
 '/assets/prada-new.webp', 'wide', 918, 302, 67, 60,
 array['PradaParadoxe','FloralWoody','CoutureFrag'], now() - interval '12 hours'),

('Lucas Andersson', 'LA', 'Scentmaker', 'Stockholm', 'video', 'Mugler Angel', 'Mugler',
 'Angel is 1992 calling. The patchouli-chocolate combination should not work, and yet it is the most iconic fragrance ever made. A masterclass in rule-breaking.',
 '/assets/mugler.mp4', 'square', 447, 129, 52, 40,
 array['MuglerAngel','Gourmand','90sFragrance'], now() - interval '1 day'),

('Isabelle Moreau', 'IM', 'Scenthooders', 'Paris', 'photo', 'Valentino Born in Roma', 'Valentino',
 'I tested Born in Roma for 5 days in 5 different cities. Here''s what I found. This one surprised me most in humidity — the jasmine became almost edible.',
 '/assets/valentino-new.webp', 'tall', 3102, 1120, 234, 120,
 array['ValentinoBornInRoma','FloralAmber','TravelReview'], now() - interval '2 days'),

('Layla · @laylascents', 'LA', 'Scentsetters', 'Laylascents', 'video', 'YSL Libre', 'YSL Beauté',
 'First impressions of YSL Libre — recorded the moment I opened the box. The lavender-orange blossom opening is sharper than expected, then it softens into something almost edible.',
 '/assets/review-video.mp4', 'tall', 1289, 367, 78, 120,
 array['YSLLibre','Laylascents','FirstImpression'], now() - interval '3 days');
