
export default defineNuxtPlugin(() => {
   const route = useRoute();
   const site_title = 'Crypto Horizon';
   const site_image = 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1761173267/crypto-horizon_-_logo-12_js96kq.png';
   const head = useRequestURL();
   const current_url = computed(() => head.href);
   const page_meta = route.meta;
   const page_title = page_meta.title as string;
   const page_description = page_meta.description as string;

   useHead({
      // titleTemplate: (pageTitle?: string) => {
      //    return pageTitle ? `${pageTitle} | ${site_name}` : site_name;
      // },
      titleTemplate: `%s | ${site_title}`,
      meta: [
         { name: 'robots', content: 'index, follow' },
      ],
      htmlAttrs: {
         lang: 'en',
      },
      link: [
         { rel: 'canonical', href: current_url },
         { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
         { rel: 'apple-touch-icon', href: '/favicon.ico' },
      ],
   });

   useSeoMeta({
      title: page_title,
      description: page_description,
      ogTitle: page_title,
      ogDescription: page_description,
      twitterTitle: page_title,
      twitterDescription: page_description,
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