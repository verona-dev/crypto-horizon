<template>
    <div class='defi-platforms'>
        <h6>Coming Soon...</h6>
    </div>
</template>

<script setup>
    // SEO
    const route = useRoute();
    const config = useRuntimeConfig();
    
    const title = 'DeFi Platforms: Lending, DEXs & Yield Aggregators';
    const description = 'Compare DeFi platforms by TVL, yields, risks, and chain support. Discover leading protocols like Aave, Uniswap, Compound, and emerging DeFi apps.';
    const url = computed(() => `${config.public.site_url}${route.path}`);
    const keywords = 'DeFi platforms, DeFi protocols, DeFi lending, yield farming, DEX, decentralized exchange, DeFi TVL, Aave, Compound, Uniswap, Curve, Lido, MakerDAO, best DeFi apps, top DeFi platforms 2025, DeFi rankings, Ethereum DeFi, Solana DeFi, Layer 2 DeFi, DeFi aggregators, DeFi risks, DeFi security';
    
    useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        ogUrl: url,
        keywords,
    });
</script>