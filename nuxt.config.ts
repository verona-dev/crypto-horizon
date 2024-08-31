// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
   devtools: { enabled: true },

   css: [
      '@/assets/scss/main.scss',
      '@/assets/css/main.css',
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