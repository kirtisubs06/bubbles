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
          blue: "#5AA9E6",      // Main blue color for the dolphin
          lightblue: "#7DB9E8", // Lighter blue (more like the reference image)
          teal: "#33C3F0",      // Secondary teal color
          skyblue: "#8DCBE6",   // Light blue for accents
          navy: "#0D5D79",      // Darker blue for contrast
          deep: "#0F172A",      // Very dark blue for backgrounds in dark mode
          cream: "#F9F7F0",     // Cream color (more beige than before)
          sand: "#F3E9D2",      // Sandy beige color
          yellow: "#FFD166",    // Warm yellow (replacing coral/orange tones)
          lime: "#88D498",      // Light lime green
          seafoam: "#93E5AB",   // Seafoam green for marine theme
          aqua: "#61E8E1",      // Aqua/turquoise for variety
          wave: "#BDE0FE",      // Light wave color
        },
        // Keep original teddy colors but replace coral with yellow
        teddy: {
          blue: "#80B3FF",
          pink: "#FF8FAB",
          mint: "#88E0D0",
          purple: "#A78BFA",
          peach: "#FFB7A6",
          cream: "#FFF4E0",
          charcoal: "#1F2937",
          yellow: "#FFD166"      // Replace coral with yellow
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s infinite",
        "wave": "wave 3s ease-in-out infinite",
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
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.1)",
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
