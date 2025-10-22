// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
   devtools: { enabled: true },

   app: {
      layout: 'default',
      layoutTransition: { name: 'fade', mode: 'in-out' },
      pageTransition: {
         // Name options are: 'bounce', 'fade', 'page', 'custom',
         // Mode options are: 'out-in','in-out',
         name: 'bounce',
         mode: 'out-in',
      },
   },

   css: [
      '~/assets/tailwind.css',
   ],

   colorMode: {
      preference: 'system', // default value of $colorMode.preference
      fallback: 'dark',
      hid: 'nuxt-color-mode-script',
      globalName: '__NUXT_COLOR_MODE__',
      classPrefix: '',
      classSuffix: '',
      storageKey: 'nuxt-color-mode'
   },

   compatibilityDate: '2024-07-23',

   icon: {
      componentName: 'NuxtIcon',
      cssLayer: 'base',
      customCollections: [
         {
            prefix: 'my-icon',
            dir: './app/assets/my-icons'
         },
      ],
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
         '2xl': 2048
      },
      vercel: {
         sizes: [320, 640, 768, 1024, 1280, 1536, 2048, 3840],
      },
   },

   mazUi: {
      theme: {
         preset: 'maz-ui',
         strategy: 'hybrid',
         darkModeStrategy: 'class',
      },
      translations: {
         locale: 'en',
         fallbackLocale: 'en',
      },
   },

   modules: [
      '@nuxt/image',
      '@pinia/nuxt',
      '@maz-ui/nuxt',
      '@nuxtjs/color-mode',
      '@nuxt/icon',
      'shadcn-nuxt',
      'nuxt-charts',
      'motion-v/nuxt',
   ],

   nitro: {
      logLevel: 'verbose',
   },

   runtimeConfig: {
      public: {
         coingecko_api_key: process.env.COINGECKO_API_KEY,
         livecoinwatch_api_key: process.env.LIVECOINWATCH_API_KEY,
         coindesk_api: process.env.COINDESK_API_KEY,
         cmc_api_key: process.env.CMC_API_KEY,
      },
   },

   shadcn: {
      prefix: '',
      componentDir: './app/components/ui'
   },

   ssr: false,

   vite: {
      plugins: [
         tailwindcss(),
      ],
   },
});