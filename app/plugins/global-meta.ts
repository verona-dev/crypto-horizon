
export default defineNuxtPlugin(() => {
   const route = useRoute();
   const site_title = 'Crypto Horizon';
   const site_image = 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1761173267/crypto-horizon_-_logo-12_js96kq.png';
   const head = useRequestURL();
   const current_url = computed(() => head.href);
   const page_meta = (route.meta);
   const page_title = page_meta.title as string;
   const page_description = page_meta.description as string;

   useHead({
      // titleTemplate: (pageTitle?: string) => {
      //    return pageTitle ? `${pageTitle} | ${site_name}` : site_name;
      // },
      titleTemplate: `%s | ${site_title}`,
      title: page_title,
      meta: [
         { name: 'description', content: page_description },
         { property: 'og:title', content: page_title },
         { property: 'og:description', content: page_description },
         { property: 'og:url', content: current_url },
         { property: 'og:image', content: site_image },
         { property: 'og:image:type', content: 'image/png' },
         { property: 'og:image:width', content: '1200' },
         { property: 'og:image:height', content: '620' },
         { property: 'og:image:alt', content: 'Project image' },
         { name: 'twitter:title', content: page_title },
         { name: 'twitter:description', content: page_description },
         { name: 'twitter:image', content: site_image },
         { name: 'twitter:image:alt', content: 'Live cryptocurrency price table and charts' },
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