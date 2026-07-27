import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
                sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
                mono: ['ui-monospace', 'SFMono-Regular']
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            colors: {
                ink: '#12151a',
                mist: '#f3f6f8',
                accent: {
                    DEFAULT: '#0d9488',
                    deep: '#0f766e'
                },
                textPrimary: 'rgba(18, 21, 26, 0.92)',
                textSecondary: 'rgba(18, 21, 26, 0.55)',
                textDisabled: 'rgba(18, 21, 26, 0.35)',
                divider: 'rgba(18, 21, 26, 0.1)',
                hover: 'rgba(18, 21, 26, 0.04)'
            }
        }
    },
    plugins: []
}
export default config
