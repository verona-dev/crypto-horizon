// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        ['@nuxtjs/google-fonts', {
            families: {
                'Poppins': [400, 500, 600, 700]
            }
        }],
        'nuxt-quasar-ui',
        'nuxt-icon',
        '@nuxt/ui',
        '@pinia/nuxt',
    ]
})
