/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#10b981", // Emerald 500
                    active: "#059669",
                    light: "#d1fae5",
                },
                secondary: {
                    DEFAULT: "#f59e0b", // Amber 500
                    active: "#d97706",
                    light: "#fef3c7",
                },
                accent: "#6366f1", // Indigo 500
                dark: "#0f172a", // Slate 900
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
