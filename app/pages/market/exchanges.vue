<template>
    <div class='exchanges'>
        <h6>Coming Soon...</h6>
    </div>
</template>

<script setup>
    const route = useRoute();
    const config = useRuntimeConfig();
    
    const title = 'Crypto Exchanges: Ranked by Volume & Trust Score';
    const description = 'Compare crypto exchanges by trading volume, trust score, supported coins, fees, and more. Find the best CEX and DEX platforms for trading Bitcoin, Ethereum, and altcoins.';
    const url = computed(() => `${config.public.site_url}${route.path}`);
    const keywords = 'crypto exchanges, best crypto exchange, top cryptocurrency exchanges, CEX, centralized exchange, Binance, Coinbase, Kraken, exchange volume, trust score, crypto trading platforms, exchange rankings, compare crypto exchanges, high volume exchanges';
    
    useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        ogUrl: url,
        keywords,
    });
</script>