<template>
    <div class='exchanges'>
        <h6>Coming Soon...</h6>
    </div>
</template>

<script setup>
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { loading } = storeToRefs(MarketStore);
    const { getExchanges } = MarketStore;
    
    // SEO
    const title = 'Crypto Exchanges: Ranked by Volume & Trust Score';
    const description = 'Compare crypto exchanges by trading volume, trust score, supported coins, fees, and more. Find the best CEX and DEX platforms for trading Bitcoin, Ethereum, and altcoins.';
    
    onMounted(async() => {
        await getExchanges();
    })
    
    definePageMeta({
        layout: 'market',
        title,
        description,
    });
</script>