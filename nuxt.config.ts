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
         Poppins: [400, 500, 600, 700]
      },
   },

   modules: [
      '@nuxtjs/google-fonts',
      '@nuxt/icon',
      'nuxt-icon',
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