// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
   devtools: { enabled: true },

   app: {
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
      '@nuxtjs/google-fonts',
      '@nuxt/icon',
      'nuxt-icon',
      '@nuxt/image',
      '@pinia/nuxt',
      'nuxt-quasar-ui',
      'radix-vue/nuxt',
      '@nuxt/ui',
   ],

   quasar: {
      plugins: ['Notify'],
      extras: {
         fontIcons: ['material-icons']
      }
   },

   runtimeConfig: {
      public: {
         API_KEY: process.env.API_KEY,
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