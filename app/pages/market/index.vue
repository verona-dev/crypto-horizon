<template>
    <div class='page md:max-w-[1920px]'>
        <CoinsTable />
    </div>
</template>

<script setup>
    import CoinsTable from '~/components/market/CoinsTable.vue';
    
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getTrendingSearchList, resetCoin } = MarketStore;
    
    // SEO
    const title = 'Cryptocurrency Prices, Charts, and Market Capitalization';
    const description = 'Live cryptocurrency prices, market cap, volume, circulating supply, and price charts for 10,000+ coins. Track Bitcoin, Ethereum, and 10,000+ altcoins in real time.';
    
    definePageMeta({
        title,
        description,
    });
    
    onMounted(() => {
        getTrendingSearchList();
        resetCoin();
    });
</script>