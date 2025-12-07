// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';

const site_name = 'Crypto Horizon';
const site_description = 'Track real-time cryptocurrency prices, charts, latest news, market capitalization, DeFi analytics, and educational resources. Your ultimate crypto dashboard.';
const site_url = process.env.SITE_URL;

export default defineNuxtConfig({
   devtools: { enabled: true },

   // SEO
   // site-config
   site: {
      // url: site_url, // canonical URL
      name: site_name, // used in Title and Meta tags
      // description: site_description, // used in Meta tags
      defaultLocale: 'en_US',
   },

   // seo-utils
   seo: {
      enabled: true,
      meta: {
         // ogImage options in /plugins/global-meta.ts
         applicationName: site_name,
         author: 'verona-dev',
         colorScheme: 'dark light',
         // description: site_description,

         ogSiteName: site_name,
         // ogUrl: site_url, // canonical URL
         // ogTitle: site_name,
         // ogDescription: site_description,
         ogLocale: 'en_US',
         ogType: 'website',
         robots: 'index, follow',
         themeColor: [
            { content: '#14161f', media: '(prefers-color-scheme: dark)' },
            { content: '#f0f0f0', media: '(prefers-color-scheme: light)' },
         ],
         twitterCard: 'summary_large_image',
         // twitterTitle: site_name,
         // twitterDescription: site_description,
      },
   },

   linkChecker: {
      enabled: true
   },

   robots: {
      disallow: [
         '/market/exchanges',
         '/defi',
         '/defi/platforms',
         '/academy',
         '/academy/dyor',
      ],
   },

   sitemap: {
      enabled: true,
   },

   schemaOrg: {
      enabled: false
   },

   // Project
   app: {
      head: {
         /*
         titleTemplate: (pageTitle?: string) => {
            return pageTitle ? `${pageTitle} | ${site_name}` : site_name;
         },
         htmlAttrs: {
            lang: 'en',
         },
         */
      },
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
            prefix: 'my-icons',
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
      '@pinia/nuxt',
      '@nuxt/image',
      '@maz-ui/nuxt',
      '@nuxtjs/color-mode',
      '@nuxt/icon',
      'shadcn-nuxt',
      'motion-v/nuxt',
      '@nuxtjs/seo',
   ],

   nitro: {
      logLevel: 'verbose',
      prerender: {
         routes: ['/market']
      },
   },

   runtimeConfig: {
      public: {
         coingecko_api_key: process.env.COINGECKO_API_KEY,
         livecoinwatch_api_key: process.env.LIVECOINWATCH_API_KEY,
         coindesk_api: process.env.COINDESK_API_KEY,
         cmc_api_key: process.env.CMC_API_KEY,
         site_url: process.env.SITE_URL,
      },
   },

   shadcn: {
      prefix: '',
      componentDir: './app/components/ui'
   },

   ssr: true, // true for ogImage

   vite: {
      plugins: [
         tailwindcss(),
      ],
   },
});