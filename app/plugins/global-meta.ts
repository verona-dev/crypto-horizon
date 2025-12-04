
export default defineNuxtPlugin(() => {
   const config = useRuntimeConfig();
   const route = useRoute();

   const current_url = `${config.public.site_url}${route.path}`;
   const site_image = 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1755195826/cyberpunk-bitcoin-illustration-2_u6fytd.webp';

   useHead({
      link: [
         { rel: 'canonical', href: current_url },
         { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
         { rel: 'apple-touch-icon', href: '/favicon.ico' },
      ],
   });

   useSeoMeta({
      ogUrl: current_url,
      ogImage: {
         url: site_image,
         type: 'image/webp',
         width: 1200,
         height: 620,
         alt: 'Project image',
      },
      twitterImage: site_image,
      twitterImageAlt: 'Live cryptocurrency price table and charts',
   });
});