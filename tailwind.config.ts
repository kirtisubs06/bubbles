
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Bubbles color palette - updated to the coastal palette from the image
				bubbles: {
					blue: '#335571',       // Navy blue from the image
					teal: '#5DB0C7',       // Teal that complements the palette
					skyblue: '#C3D9E9',    // Light blue for accents
					lightblue: '#A7C5E3',  // Medium-light blue from the image
					navy: '#24405C',       // Darker blue for contrast
					deep: '#1A2D3F',       // Very dark blue for backgrounds in dark mode
					cream: '#F7F3ED',      // Cream color from the image
					sand: '#EDE3D6',       // Sandy beige color from the image
					seafoam: '#A0D5DB',    // Seafoam green for marine theme
					lime: '#88C7D0',       // Teal-green that matches the palette
					aqua: '#6FBAC7',       // Aqua/turquoise that matches the palette
					wave: '#D8E6F1',       // Light wave color
					purple: '#9b87f5',     // Keeping the purple accent
				},
				// Teddy colors updated to match our coastal palette
				teddy: {
					'blue': '#A7C5E3',    // Updated to match lightblue
					'purple': '#9b87f5',   // Keeping purple
					'pink': '#FF8FAB',
					'mint': '#A0D5DB',     // Updated to match seafoam
					'cream': '#F7F3ED',    // Updated to match bubbles-cream
					'charcoal': '#1A2D3F', // Updated to match bubbles-deep
					'teal': '#5DB0C7',     // Added teal color
				}
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
				heading: ["var(--font-heading)", ...fontFamily.sans],
				kidsfont: ["Comic Sans MS", "Comic Sans", "cursive"],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in-left': {
					from: { opacity: '0', transform: 'translateX(-20px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				'fade-in-right': {
					from: { opacity: '0', transform: 'translateX(20px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.95)' },
					to: { opacity: '1', transform: 'scale(1)' },
				},
				'page-transition-in': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'page-transition-out': {
					from: { opacity: '1', transform: 'translateY(0)' },
					to: { opacity: '0', transform: 'translateY(-20px)' },
				},
				'wave': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'25%': { transform: 'translateY(-5px) rotate(2deg)' },
					'75%': { transform: 'translateY(5px) rotate(-2deg)' },
				},
				'splash': {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'70%': { transform: 'scale(1.5)', opacity: '0.5' },
					'100%': { transform: 'scale(2)', opacity: '0' },
				},
				'bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-15px)' },
				},
				'wobble': {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(-5deg)' },
					'75%': { transform: 'rotate(5deg)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-left': 'fade-in-left 0.6s ease-out',
				'fade-in-right': 'fade-in-right 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'page-in': 'page-transition-in 0.5s ease-out',
				'page-out': 'page-transition-out 0.5s ease-out',
				'wave': 'wave 3s ease-in-out infinite',
				'splash': 'splash 2s ease-out',
				'bounce': 'bounce 2s ease-in-out infinite',
				'wobble': 'wobble 3s ease-in-out infinite',
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)',
			},
			boxShadow: {
				'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
				'medium': '0 6px 30px rgba(0, 0, 0, 0.08)',
				'strong': '0 8px 40px rgba(0, 0, 0, 0.12)',
				'bubbly': '0 8px 32px rgba(83, 170, 210, 0.2)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
