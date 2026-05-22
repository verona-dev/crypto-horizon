<template>
    <div class='w-full'>
        <LoadingContent v-if='loading' />
        
        <div v-else class='page'>
            <CoinsTable />
        </div>
    </div>
</template>

<script setup>
    import CoinsTable from '~/components/market/CoinsTable.vue';
    import LoadingContent from '@/components/LoadingContent.vue';
    
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { loading } = storeToRefs(MarketStore);
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