
export default defineNuxtPlugin(() => {
   const site_image = 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1761173267/crypto-horizon_-_logo-12_js96kq.png';
   const head = useRequestURL();
   const current_url = computed(() => head.href);

   useHead({
      // titleTemplate: (pageTitle?: string) => {
      //    return pageTitle ? `${pageTitle} | ${site_name}` : site_name;
      // },
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
         type: 'image/png',
         width: 1200,
         height: 620,
         alt: 'Project image',
      },
      twitterImage: site_image,
      twitterImageAlt: 'Live cryptocurrency price table and charts',
   });
});