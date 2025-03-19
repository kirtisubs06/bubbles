/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        bubbles: {
          blue: "#335571",      // Navy blue from the image (darker)
          lightblue: "#A7C5E3",  // Light blue from the image
          teal: "#5DB0C7",      // Teal that complements the palette
          skyblue: "#C3D9E9",   // Very light blue from the image
          navy: "#24405C",      // Deeper navy blue
          deep: "#1A2D3F",      // Very dark blue for backgrounds in dark mode
          cream: "#F7F3ED",     // Cream color from the image
          sand: "#EDE3D6",      // Sandy beige color from the image
          yellow: "#FFD166",    // Keeping existing yellow (not used much)
          lime: "#88C7D0",      // Adjusted to a more teal-green
          seafoam: "#A0D5DB",   // Seafoam that matches coastal palette
          aqua: "#6FBAC7",      // Aqua that matches coastal palette
          wave: "#D8E6F1",      // Very light blue wave color
        },
        // Keep original teddy colors but with purple instead of yellow
        teddy: {
          blue: "#80B3FF",
          pink: "#FF8FAB",
          mint: "#88E0D0",
          purple: "#9b87f5",
          peach: "#FFB7A6",
          cream: "#FFF4E0",
          charcoal: "#1F2937",
          yellow: "#F7F3ED"      // Replace with cream color
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        // Adding a fun font for kids
        kidsfont: ["Comic Sans MS", "Comic Sans", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s infinite",
        "wave": "wave 3s ease-in-out infinite",
        "bounce": "bounce 2s ease-in-out infinite",
        "wobble": "wobble 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-5px) rotate(2deg)" },
          "75%": { transform: "translateY(5px) rotate(-2deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.1)",
        bubbly: "0 8px 32px rgba(83, 170, 210, 0.2)",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
