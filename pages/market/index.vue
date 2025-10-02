<template>
    <div class='market flex flex-col items-center justify-center gap-16'>
        <GlobalMarket />
        
        <GlobalMarketDominance />
        
        <CoinsTable />
    </div>
</template>

<script setup>
    import GlobalMarket from '~/components/market/GlobalMarket.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
    import GlobalMarketDominance from '~/components/market/GlobalMarketDominance.vue';
    
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getCoingeckoGlobalMarket } = MarketStore;
    
    onMounted(() => getCoingeckoGlobalMarket());
</script>