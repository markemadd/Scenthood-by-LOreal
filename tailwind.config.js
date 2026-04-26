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
        loreal: {
          white: '#FBF6F3',      // warm off-white — primary page background
          cream: '#EDE4DC',      // warm beige — card & section backgrounds
          sand: '#E0D5CC',       // deeper warm — inputs, dividers, highlights
          neutral: '#F3F3F3',    // cool light gray — alternate/neutral sections
          champagne: '#A48B75',  // warm taupe — primary accent, buttons, eyebrows
          gold: '#8A7362',       // deeper taupe — hover states, headings accent
          'gold-dark': '#6B5A4E',
          accent2: '#B3A59C',    // muted rose-taupe — borders, secondary accents
          charcoal: '#1A1A1A',
          slate: '#3D3D3D',
          muted: '#7A6D67',
          border: '#D8CEC7',     // derived from accent2 — all borders
          'border-dark': '#C4B5AC',
          rose: '#D4A5A5',
          'rose-deep': '#9E5A5A',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      backgroundImage: {
        'champagne-gradient': 'linear-gradient(135deg, #A48B75 0%, #D4C5BB 50%, #A48B75 100%)',
        'warm-gradient': 'linear-gradient(180deg, #FBF6F3 0%, #EDE4DC 100%)',
      },
    },
  },
  plugins: [],
};
