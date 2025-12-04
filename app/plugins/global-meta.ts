
export default defineNuxtPlugin(() => {
   const site_image = 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1755195826/cyberpunk-bitcoin-illustration-2_u6fytd.webp';

   useHead({
      link: [
         { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
         { rel: 'apple-touch-icon', href: '/favicon.ico' },
      ],
   });

   useSeoMeta({
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