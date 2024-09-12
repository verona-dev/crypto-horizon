/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                green: {
                    50: '#EFFDF5',
                    100: '#D9FBE8',
                    200: '#B3F5D1',
                    300: '#75EDAE',
                    400: '#00DC82',
                    500: '#00C16A',
                    600: '#00A155',
                    700: '#007F45',
                    800: '#016538',
                    900: '#0A5331',
                    950: '#052e16'
                },
                customPrimary: {
                    50: '#F8F4EB',
                    100: '#F3EBDB',
                    200: '#E9DABD',
                    300: '#DFC99E',
                    400: '#D1B274',
                    500: '#C39A4A',
                    600: '#A07C35',
                    700: '#765B27',
                    800: '#4C3A19',
                    900: '#211A0B',
                    950: '#0C0A04',
                },
                customGray: {
                    50: '#FFFFFF',
                    100: '#F5F7F9',
                    200: '#DCE2E9',
                    300: '#C3CED9',
                    400: '#AABAC9',
                    500: '#91A6B9',
                    600: '#7891A9',
                    700: '#617D98',
                    800: '#51697F',
                    900: '#415466',
                    950: '#364655',
                },
            },
            fontFamily: {
                'sans': ['Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

