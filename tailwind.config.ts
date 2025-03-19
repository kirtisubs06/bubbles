
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
				// Bubbles color palette - updated to focus on blue, yellow, green, white
				bubbles: {
					blue: '#5AA9E6',        // Main blue color
					teal: '#33C3F0',        // Secondary teal color
					skyblue: '#8DCBE6',     // Light blue for accents
					navy: '#0D5D79',        // Darker blue for contrast
					deep: '#0F172A',        // Very dark blue for backgrounds in dark mode
					cream: '#F9F7F0',       // Light cream color for backgrounds
					aqua: '#61E8E1',        // Aqua/turquoise for variety
					yellow: '#FFD166',      // Warm yellow (replacing coral)
					sand: '#F3E9D2',        // Sandy beige color
					seafoam: '#93E5AB',     // Seafoam green for marine theme
					lime: '#88D498',        // Light lime green
					wave: '#BDE0FE',        // Light wave color
				},
				// TeddyTech color palette - updated to remove coral/orange
				teddy: {
					'blue': '#A0D2EB',
					'purple': '#B8B5FF',
					'pink': '#FFABE1',
					'yellow': '#FFD166',    // Yellow instead of peach/coral
					'mint': '#A2E1DB',
					'cream': '#FFF8F0',
					'charcoal': '#2A2D34',
				}
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
				heading: ["var(--font-heading)", ...fontFamily.sans],
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
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)',
			},
			boxShadow: {
				'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
				'medium': '0 6px 30px rgba(0, 0, 0, 0.08)',
				'strong': '0 8px 40px rgba(0, 0, 0, 0.12)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
