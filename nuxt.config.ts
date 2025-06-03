// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
   devtools: { enabled: false },

   app: {
      layout: 'Layout',
      pageTransition: {
         // Name options are: 'bounce', 'fade', 'page', 'custom',
         // Mode options are: 'out-in','in-out',
         name: 'bounce',
         mode: 'out-in',
      },
   },

   css: [
      '@/assets/styles/index.css',
   ],

   colorMode: {
      preference: 'dark', // default value of $colorMode.preference
      fallback: 'base',
      hid: 'nuxt-color-mode-script',
      globalName: '__NUXT_COLOR_MODE__',
      classPrefix: '',
      classSuffix: '',
      storageKey: 'nuxt-color-mode'
   },

   compatibilityDate: '2024-07-23',

   googleFonts: {
      families: {
         Roboto: true,
         'Josefin+Sans': true,
         Lato: [100, 300],
         Raleway: {
            wght: [100, 400],
            ital: [100]
         },
         Inter: '200..700',
      },
      base64: true,
      outputDir: 'assets',
      stylePath: 'fonts/google-fonts.css',
      fontsDir: 'fonts',
   },

   icon: {
      // componentName: 'NuxtIcon'
   },

   image: {
      // dir: 'assets/images',
      screens: {
         'xs': 320,
         'sm': 640,
         'md': 768,
         'lg': 1024,
         'xl': 1280,
         'xxl': 1536,
         '2xl': 1536
      },
      vercel: {
         sizes: [320, 640, 768, 1024, 1280, 1536, 2048, 3840],
      },
   },

   modules: [
      '@nuxtjs/google-fonts',
      '@nuxt/ui',
      '@nuxt/image',
      '@pinia/nuxt',
   ],

   runtimeConfig: {
      public: {
         coingecko_api_key: process.env.COINGECKO_API_KEY
      },
   },

   // Disable SSR
   ssr: false,
})