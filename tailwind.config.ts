import type { Config } from "tailwindcss";

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
			fontFamily: {
				sans: ['Inter var', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
				pixel: ['Press Start 2P', 'cursive', 'sans-serif'],
				cyber: ['Orbitron', 'sans-serif'],
				heebo: ['Heebo', 'sans-serif'],
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
			},
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
				flow: {
					background: 'hsl(var(--flow-background))',
					foreground: 'hsl(var(--flow-foreground))',
					card: 'hsl(var(--flow-card))',
					'card-foreground': 'hsl(var(--flow-card-foreground))',
					accent: 'hsl(var(--flow-accent))',
					'accent-foreground': 'hsl(var(--flow-accent-foreground))',
					muted: 'hsl(var(--flow-muted))',
					'muted-foreground': 'hsl(var(--flow-muted-foreground))',
					border: 'hsl(var(--flow-border))',
					success: 'hsl(var(--flow-success))',
					warning: 'hsl(var(--flow-warning))',
					error: 'hsl(var(--flow-error))',
					info: 'hsl(var(--flow-info))',
				},
				solarpunk: {
					background: 'hsl(var(--solarpunk-background))',
					foreground: 'hsl(var(--solarpunk-foreground))',
					card: 'hsl(var(--solarpunk-card))',
					'card-foreground': 'hsl(var(--solarpunk-card-foreground))',
					accent: 'hsl(var(--solarpunk-accent))',
					'accent-foreground': 'hsl(var(--solarpunk-accent-foreground))',
					muted: 'hsl(var(--solarpunk-muted))',
					'muted-foreground': 'hsl(var(--solarpunk-muted-foreground))',
					border: 'hsl(var(--solarpunk-border))',
					success: 'hsl(var(--solarpunk-success))',
					warning: 'hsl(var(--solarpunk-warning))',
					error: 'hsl(var(--solarpunk-error))',
					info: 'hsl(var(--solarpunk-info))',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			gridTemplateColumns: {
				'20': 'repeat(20, minmax(0, 1fr))',
			},
			gridTemplateRows: {
				'10': 'repeat(10, minmax(0, 1fr))',
			},
			spacing: {
				'xs': '0.25rem',
				'sm': '0.5rem',
				'md': '1rem',
				'lg': '1.5rem',
				'xl': '2rem',
				'2xl': '3rem',
			},
			boxShadow: {
				'cyber-sm': '0 0 5px rgba(217, 70, 239, 0.2)',
				'cyber': '0 0 10px rgba(217, 70, 239, 0.4)',
				'cyber-lg': '0 0 15px rgba(217, 70, 239, 0.6)',
				'neo-subtle': '0 2px 10px rgba(0, 0, 0, 0.1)',
				'neo': '0 4px 20px rgba(0, 0, 0, 0.15)',
				'neo-lg': '0 8px 30px rgba(0, 0, 0, 0.2)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'pixelate-in': {
					'0%': { filter: 'blur(10px)' },
					'100%': { filter: 'blur(0)' }
				},
				'glow-pulse': {
					'0%': { boxShadow: '0 0 5px rgba(217, 70, 239, 0.5)' },
					'50%': { boxShadow: '0 0 15px rgba(217, 70, 239, 0.8)' },
					'100%': { boxShadow: '0 0 5px rgba(217, 70, 239, 0.5)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'enter': 'fade-in 0.5s ease-out, scale-in 0.2s ease-out',
				'exit': 'fade-out 0.3s ease-out, scale-out 0.2s ease-out',
				'pulse-subtle': 'pulse-subtle 3s infinite ease-in-out',
				'float': 'float 3s infinite ease-in-out',
				'pixelate-in': 'pixelate-in 0.5s ease-out',
				'glow-pulse': 'glow-pulse 3s infinite ease-in-out'
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)',
				'blur-sm': 'blur(8px)',
				'blur-lg': 'blur(30px)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
