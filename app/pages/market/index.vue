<template>
    <div class='market page'>
        <Title :tag='1' :level='2' class='page-title inline'>Cryptocurrency Prices by</Title>
        
        <CoinsTable />
    </div>
</template>

<script setup>
    import CoinsTable from '~/components/market/CoinsTable.vue';
    import Title from '~/components/Title.vue';
    
    // MarketStore
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getCoinsMarkets, resetCoin } = MarketStore;
    
    // SEO
    const title = 'Cryptocurrency Prices, Charts, and Market Capitalization';
    const description = 'Live cryptocurrency prices, market cap, volume, circulating supply, and price charts for 10,000+ coins. Track Bitcoin, Ethereum, and 10,000+ altcoins in real time.';
    
    definePageMeta({
        layout: 'market',
        title,
        description,
    });
    
    onMounted(() => {
        getCoinsMarkets({}, 'table');
        resetCoin();
    });
</script>