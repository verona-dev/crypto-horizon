<template>
    <div class='market page'>
        <CoinsTable @update-label='onUpdateLabel' />
    </div>
</template>

<script setup>
    import CoinsTable from '~/components/market/CoinsTable.vue';
    
    // MarketStore
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getCoinsMarkets, resetCoin } = MarketStore;
    
    // SEO
    const title = 'Cryptocurrency Prices, Charts & Market Cap';
    const description = 'Live cryptocurrency prices, market cap, volume, circulating supply, and price charts for 10,000+ coins. Track Bitcoin, Ethereum, and 10,000+ altcoins in real time.';
    
    const label = ref('Market Cap');
    const onUpdateLabel = updateLabel => label.value = updateLabel;
    
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