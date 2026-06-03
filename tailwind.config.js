/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New Scenthood palette (Brandstorm 2026)
        scent: {
          noir:        '#0D0D0D',  // foundation black
          parchment:   '#F5F0E8',  // editorial off-white
          darkOud:     '#2A2320',  // cards on dark
          gold:        '#D4A5A5',  // dusty rose pink (replaces liquid gold)
          goldDark:    '#9E5A5A',  // deep rose (hover/dark variant)
          amber:       '#8B7355',  // scenthooder tier
          alabaster:   '#E8E0D0',  // borders / neutrals
          oudRose:     '#6B2D3A',  // cultural-warmth (used sparingly)
          oudRoseLite: '#8a3d4d',
        },
        // Legacy loreal-* keys remapped to new palette so existing pages keep working
        loreal: {
          white:         '#F5F0E8',    // → parchment
          cream:         '#EDE5DB',
          sand:          '#E0D5CC',
          neutral:       '#F3EFEA',
          champagne:     '#D4A5A5',    // → dusty rose pink
          gold:          '#8B7355',    // → raw amber
          'gold-dark':   '#6B5A4E',
          accent2:       '#B3A59C',
          charcoal:      '#0D0D0D',    // → noir
          slate:         '#2A2320',    // → dark oud
          muted:         '#8a7e75',
          border:        '#D8CEC7',
          'border-dark': '#C4B5AC',
          rose:          '#8a3d4d',
          'rose-deep':   '#6B2D3A',
        },
      },
      fontFamily: {
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra:  '0.35em',
      },
      backgroundImage: {
        'champagne-gradient': 'linear-gradient(135deg, #D4A5A5 0%, #C08080 50%, #9E5A5A 100%)',
        'warm-gradient':      'linear-gradient(180deg, #F5F0E8 0%, #E8E0D0 100%)',
        'noir-fade':          'linear-gradient(180deg, rgba(13,13,13,0) 0%, rgba(13,13,13,0.85) 80%, rgba(13,13,13,1) 100%)',
      },
    },
  },
  plugins: [],
};
