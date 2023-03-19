/**
 * WARNING: DO NOT USE ANY TWIND FUNCTIONS in here otherwise the
 * vscode-twind-intellisense plugin may stop working. To overcome
 * this issue, use animations and keyframes intead of twind's animation
 * function.
 */
import type { Options } from '$fresh/plugins/twind.ts'

const gridCols = ([arg]: string[]) => {
	const template = Number.isInteger(Number(arg))
		? `repeat(${arg}, minmax(0, 1fr))`
		: arg
		? arg.replace(/(^\[)|(\])$/g, '').replace(/_/g, ' ')
		: arg

	return {
		'grid-template-columns': template,
	}
}

const gridRows = ([arg]: string[]) => {
	const template = Number.isInteger(Number(arg))
		? `repeat(${arg}, minmax(0, 1fr))`
		: arg
		? arg.replace(/(^\[)|(\])$/g, '').replace(/_/g, ' ')
		: arg

	return {
		'grid-template-rows': template,
	}
}

const options: Omit<Options, 'selfURL'> = {
	theme: {
		extend: {
			maxWidth: {
				lg: '1056px',
			},
			colors: {
				primary: '#001489',
				secondary: '#009bdb',

				gray: {
					100: '#F9F9F8',
					200: '#ebebeb',
					300: '#e6e5e5',
					400: '#f0f0f0',
					600: '#787878',
					700: '#424242',
					800: '#323030',
				},
				'bg': {
					'100': '#ffffff',
					'200': '#e5e5e5',
					'300': '#cccccc',
				},
				'input-text': '#5B5B5B',
				'dark-blue': '#001489',
				'light-blue': '#009CDE',
			},
			fontFamily: {
				'sans': ['Roboto', 'sans-serif'],
			},
			textColor: {
				'color-heading-1': '#009bdb',
				'link': '#009bdb',
				'default': '#161616',
				'default-inverse': '#FFFFFF',
				// "subdued": "#66736C",
				// "subdued-inverse": "#C6C6C6",
				// "price": "#8C3D3D",
				// "section-title": "#161616",
				// "positive": "#1A7346",
				// "critical": "#B44125",
			},
			fontSize: {
				'2xs': '0.625rem',
				xs: '0.75rem',
				sm: '0.875rem',
				base: '1rem',
				md: '1.25rem',
				lg: '1.5rem',
				xl: '1.75rem',
				'2xl': '2rem',
				'3xl': '2.5rem',
				'4xl': '3rem',
				'footer-link': ['13px', '16px'],
			},
			outline: {
				none: ['none'],
			},

			// "fontFamily": {
			//   "roboto": ["Roboto", "sans-serif"],
			// },
			// colors: {
			//   "primary": "#009bdb",
			//   "secondary": "#001489",
			//   // "default": "#FFFFFF",
			//   // "header": "#FFFFFF",
			//   // "badge": "#8C3D3D", // shopping cart tem isso tambem
			//   // "footer": "#003232",
			//   // "interactive": "#161616",
			//   // "interactive-inverse": "#FFFFFF",
			//   // "hover": "rgba(0, 0, 0, 0.04)",
			//   // "hover-inverse": "rgba(255, 255, 255, 0.4)",
			// },
			// textColor: {
			//   "color-heading-1": "#009bdb",
			//   // "default": "#161616",
			//   // "default-inverse": "#FFFFFF",
			//   // "subdued": "#66736C",
			//   // "subdued-inverse": "#C6C6C6",
			//   // "price": "#8C3D3D",
			//   // "section-title": "#161616",
			//   // "positive": "#1A7346",
			//   // "critical": "#B44125",
			// },
			borderColor: {
				'default': '#D4DBD7',
				'default-inverse': '#FFFFFF',
				// "interactive": "#161616",
				// "focus": "#3379EF",
				// "positive": "#1A7346",
				// "critical": "#B44125",
			},
			// outline: {
			//   interactive: ["2px solid #3379EF", "2px"],
			// },
			// fontSize: {
			//   "heading-1": ["2rem", "1.25"],
			//   "heading-2": ["2.5rem", "1.25"],
			//   "2xs": "0.625rem",
			//   // "heading-2": ["24px", "28.8px"],
			//   // "heading-3": ["20px", "24px"],
			//   // "menu": ["16px", "20px"],
			//   // "button": ["14px", "18px"],
			//   // "body": ["16px", "20px"],
			//   // "caption": ["13px", "16px"],
			//   // "list-price": ["10px", "20px"],
			// },
			// fontWeight: {
			//   "heading-1": "900",
			//   // "heading-2": "500",
			//   // "heading-3": "500",
			//   // "menu": "400",
			//   // "button": "700",
			//   // "body": "400",
			//   // "caption": "400",
			//   // "list-price": "400",
			// },
			animation: {
				'slide-left': 'slide-left-frame 0.4s ease normal',
				'slide-right': 'slide-right-frame 0.4s ease normal',
				'slide-bottom': 'slide-bottom-frame 0.4s ease normal',
			},
			keyframes: {
				'slide-left-frame': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0)' },
				},
				'slide-right-frame': {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' },
				},
				'slide-bottom-frame': {
					from: { transform: 'translateY(100%)' },
					to: { transform: 'translateY(0)' },
				},
			},
			// boxShadow: {
			//   sm: "0px 1px 3px 0px #00000014",
			//   default: "0px 1px 4px 0px #0000001F",
			//   md: "0px 1px 5px 0px #00000024",
			//   lg: "0px 4px 10px 0px #0000001F",
			// },
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			'3xl': '1920px',
		},
	},
	preflight: (preflight) => ({
		...preflight,

		// Stick footer to the bottom of the page
		body: {
			minHeight: '100vh',
			fontFamily: 'Roboto, sans-serif',
			display: 'flex',
			flexDirection: 'column',
		},
		'section[data-manifest-key="./sections/Footer.tsx"]': {
			marginTop: 'auto',
		},

		// Prevent scroll when modal is open
		'body[no-scroll]': {
			overflow: 'hidden',
			height: '100vh',
		},
	}),
	plugins: {
		backdrop: {
			'&::backdrop': {
				background: 'rgba(0, 0, 0, 0.5)',
			},
		},
		'scroll-snap-center': {
			'scroll-snap-align': 'center',
		},
		'scroll-x-mandatory': {
			'scroll-snap-type': 'x mandatory',
		},
		'snap-x': {
			'scroll-snap-type': 'x var(--tw-scroll-snap-strictness)',
		},
		'snap-mandatory': {
			'--tw-scroll-snap-strictness': 'mandatory',
		},
		'fill': (parts) => ({ 'fill': parts.join('-') }),
		'max-h-min': {
			'max-height': 'min-content',
		},
		'snap': ([mod]) => ({ 'scroll-snap-align': mod }),
		'grid-cols': gridCols,
		'grid-rows': gridRows,
		'scroll-smooth': {
			'scroll-behavior': 'smooth',
			'-webkit-overflow-scrolling': 'touch',
		},
		'scrollbar-none': {
			'scrollbar-width': 'none',
			'-ms-overflow-style': 'none',
			'&::-webkit-scrollbar': {
				display: 'none',
			},
		},
		'header-alert': {
			// text-underline text-link
			'a': ({ theme }) => ({
				'color': theme('textColor').link,
				'text-decoration': 'underline',
			}),
		},
		'p-inline': {
			'p': {
				display: 'inline',
			},
		},
		'text-shadow': { textShadow: '#009bdb57 1px 1px' },
		'line-clamp': {
			'&': {
				display: '-webkit-box',
				WebkitBoxOrient: 'vertical',
				overflow: 'hidden',
				WebkitLineClamp: 2,
				textOverflow: 'ellipsis',
			},
		},
	},
}

export default options
