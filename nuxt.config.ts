// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
   css: [
      '@/assets/scss/main.scss',
      '@/assets/css/main.css',
   ],

    devtools: { enabled: true },

    modules: [['@nuxtjs/google-fonts', {
        families: {
            'Poppins': [400, 500, 600, 700]
        }
    }], 'nuxt-quasar-ui', 'nuxt-icon', '@nuxt/ui', '@pinia/nuxt', "@nuxt/icon"],

   vite: {
      css: {
         preprocessorOptions: {
            scss: {
               additionalData: `@import "@/assets/scss/_colors.scss"; @import "@/assets/scss/_variables.scss";`,
            },
         },
      },
   },
})