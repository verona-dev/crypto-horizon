<template>
    <div class='exchanges'>
        <h6>Coming Soon...</h6>
    </div>
</template>

<script setup>
    const route = useRoute();
    const config = useRuntimeConfig();
    
    const title = 'Crypto Exchanges List: Ranked by Volume & Trust Score';
    const description = 'Compare crypto exchanges by trading volume, trust score, supported coins, fees, and more. Find the best CEX and DEX platforms for trading Bitcoin, Ethereum, and altcoins.';
    const url = computed(() => `${config.public.site_url}${route.path}`);
    const keywords = 'crypto fear and greed index, market dominance, bitcoin dominance, ethereum dominance, stablecoins dominance, trending cryptocurrencies, top NFTs, crypto trends, trending NFTs, crypto market sentiment, global crypto data, crypto analytics, BTC market cap share';
    
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