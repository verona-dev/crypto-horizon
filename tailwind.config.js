/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./error.vue",
        "./src/**/*.{html,js}"
    ],
    darkMode: 'class',
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
        fontFamily: {
            // 'sans': ['Helvetica', 'Arial', 'sans-serif'],
        },
    },
    plugins: [
        require('tailwindcss-animate'),
    ],
}

