// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        ['@nuxtjs/google-fonts', {
            families: {
                'Poppins': [400, 500, 600, 700]
            }
        }],
        'nuxt-quasar-ui',
        '@pinia/nuxt',
        'nuxt-icon',
        '@nuxt/ui'
    ]
})
