<template>
    <div class='academy'>
        <h6>Coming Soon...</h6>
    </div>
</template>

<script setup>
    // SEO
    const route = useRoute();
    const config = useRuntimeConfig();
    
    const title = 'Crypto & DeFi Academy: Free Guides & Tutorials';
    const description = 'Master the blockchain and DeFi with free guides and tutorials. Learn and stay ahead in the fast-moving crypto space.';
    const url = computed(() => `${config.public.site_url}${route.path}`);
    const keywords = 'Crypto academy, DeFi courses, blockchain tutorials, free crypto guides, learn DeFi, blockchain education, crypto for beginners, advanced DeFi, smart contracts, yield farming guides, NFT courses, crypto security, crypto investing, DeFi protocols, Ethereum courses, Solana tutorials, Layer 2 education, crypto glossary, crypto webinars, DeFi strategies, crypto analysis';
    
    useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        ogUrl: url,
        keywords,
        robots: 'noindex, nofollow',
    });
</script>