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
        extend: {
            width: {
                '100': '25rem',     // 400px
                '110': '28rem',     // 448px
                '120': '31.25rem',  // 500px
                '130': '34.25rem',  // 548px
                '140': '37.5rem',   // 600px
                '150': '40.5rem',   // 648px
                '160': '43.75rem',  // 700px
                '170': '46.75rem',  // 748px
                '180': '50rem',     // 800px
                '190': '53rem',     // 848px
                '200': '56.25rem',  // 900px
                '210': '59.25rem',  // 948px
            }
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1366px',
            '3xl': '1920px',
            '4xl': '2560px',
        },
        fontFamily: {
            great: ['Great', 'sans-serif'],
            montserrat: ['Montserrat Variable', 'sans-serif'],
            roboto: ['Roboto', 'monospace'],
            sans: ['Satoshi', 'sans-serif'],
            satoshi: ['Satoshi', 'sans-serif'],
        },
    },
    plugins: [
        require('tailwindcss-animate'),
    ],
}

