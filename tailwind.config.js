/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF4EA',
          100: '#FFE4CC',
          200: '#FFC999',
          300: '#FFA95C',
          400: '#FF8F2E',
          500: '#FF7A00',
          600: '#E86A00',
          700: '#B85300',
          800: '#7A3700',
          900: '#3D1C00',
        },
        ink: {
          DEFAULT: '#0B0B0C',
          900: '#0B0B0C',
          800: '#131315',
          700: '#1C1C1F',
          600: '#2A2A2E',
          500: '#45454B',
          400: '#6E6E76',
          300: '#9C9CA3',
          200: '#CFCFD4',
          100: '#ECECEF',
          50: '#F6F6F7',
        },
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.055em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11,11,12,.04), 0 8px 24px -8px rgba(11,11,12,.12)',
        lift: '0 2px 4px rgba(11,11,12,.04), 0 24px 48px -16px rgba(11,11,12,.22)',
        glow: '0 0 0 1px rgba(255,122,0,.25), 0 18px 50px -12px rgba(255,122,0,.55)',
        card: '0 40px 80px -20px rgba(0,0,0,.45), 0 18px 36px -18px rgba(0,0,0,.5)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shine: {
          from: { transform: 'translateX(-120%) skewX(-20deg)' },
          to: { transform: 'translateX(220%) skewX(-20deg)' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(.8)', opacity: '.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        progress: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        shine: 'shine 3.2s ease-in-out infinite',
        'spin-slow': 'spinSlow 30s linear infinite',
        'pulse-ring': 'pulseRing 2.4s cubic-bezier(.2,.6,.4,1) infinite',
        rise: 'rise .9s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
}
