/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#000000',
          elevated: '#0a0a0a',
        },
        foreground: {
          DEFAULT: '#ffffff',
          muted: '#f5f5f5',
          dim: 'rgba(255, 255, 255, 0.6)',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        title: ['"Inter Tight"', 'sans-serif'],
        body: ['"Inter Tight"', 'sans-serif'],
      },
      keyframes: {
        'fade-slide': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'fade-slide': 'fade-slide 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}
