/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'farm-green': {
                    50: '#F2F9F5',
                    100: '#E1F3E9',
                    200: '#C3E6D2',
                    300: '#9ADBBA',
                    400: '#6AC598',
                    500: '#3EA775',  // Primary Brand
                    600: '#2C865A',
                    700: '#256C4A',
                    800: '#21563D',
                    900: '#1D4734',
                },
                'rich-soil': {
                    50: '#F9F6F3',
                    100: '#F0EBE5',
                    200: '#DDD2C6',
                    300: '#C6B29F',
                    400: '#A68A73',
                    500: '#8C6B51', // Secondary Brand
                    600: '#73523E',
                    700: '#5F4132',
                    800: '#50382E',
                    900: '#433029',
                },
                'sand': {
                    50: '#FDFCFB',
                    100: '#F7F5F2',
                    200: '#F0EBE7',
                    300: '#E6DED8',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'], // For headings
            },
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1280px',
                    '2xl': '1400px',
                },
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
            }
        },
    },
    plugins: [],
}
