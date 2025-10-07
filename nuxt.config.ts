// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
   devtools: { enabled: false },

   app: {
      layout: 'default',
      layoutTransition: {
         name: 'scroll-animation-layout',
         mode: 'in-out'
      },
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

   icon: {
      componentName: 'NuxtIcon',
      cssLayer: 'base',
      customCollections: [
         {
            prefix: 'my-icon',
            dir: './assets/my-icons'
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

   modules: [
     '@nuxt/image',
     '@pinia/nuxt',
     'maz-ui/nuxt',
     '@nuxtjs/color-mode',
     '@nuxt/icon',
     'shadcn-nuxt',
     'nuxt-charts',
     'nuxt-scroll-restoration',
     'nuxt-swiper',
   ],

   runtimeConfig: {
      public: {
         coingecko_api_key: process.env.COINGECKO_API_KEY,
         livecoinwatch_api_key: process.env.LIVECOINWATCH_API_KEY,
         coindesk_api: process.env.COINDESK_API_KEY,
         cmc_api_key: process.env.CMC_API_KEY,
      },
   },

   scrollRestoration: {
      scrollRestorationTimeoutMs: 3000,
      tryToScrollIntervalMs: 50
   },

   shadcn: {
      prefix: '',
      componentDir: './components/ui'
   },

   ssr: true,

   vite: {
      plugins: [
         tailwindcss(),
      ],
   },
});