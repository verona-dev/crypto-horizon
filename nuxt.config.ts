// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
   devtools: { enabled: true },

   app: {
      layout: 'default',
      pageTransition: {
         // Name options are: 'bounce', 'fade', 'page', 'custom',
         // Mode options are: 'out-in','in-out',
         name: 'bounce',
         mode: 'out-in',
      },
   },

   css: [
      '@/assets/scss/main.scss',
      '@/assets/css/main.css',
      '@mdi/font/css/materialdesignicons.min.css',
   ],

   colorMode: {
      preference: 'system', // default value of $colorMode.preference
      fallback: 'light', // fallback value if not system preference found
      hid: 'nuxt-color-mode-script',
      globalName: '__NUXT_COLOR_MODE__',
      classPrefix: '',
      classSuffix: '-mode',
      storageKey: 'nuxt-color-mode'
   },

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
      stylePath: 'google-fonts.css',
      fontsDir: 'fonts',
   },

   modules: [
      '@nuxtjs/color-mode',
      '@nuxtjs/google-fonts',
      '@nuxt/icon',
      'nuxt-icon',
      '@nuxt/image',
      '@pinia/nuxt',
      'nuxt-quasar-ui',
      'radix-vue/nuxt',
      '@nuxt/ui',
   ],

   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },

   quasar: {
      plugins: ['Notify'],
      extras: {
         fontIcons: ['material-icons']
      }
   },

   runtimeConfig: {
      public: {
         API_COINCAP_URL: process.env.API_COINCAP_URL,
      },
   },

   // Disable SSR
   ssr: false,

   ui: {
      global: true
   },

   vite: {
      css: {
         preprocessorOptions: {
            scss: {
               additionalData:
                  `@import "@/assets/scss/_colors.scss"; 
                  @import "@/assets/scss/_variables.scss";`,
            },
         },
      },
   },
})