<template>
    <div class='market flex flex-col items-center justify-center gap-16'>
        <GlobalMarketBar />
        
        <GlobalMarketFearGreed v-if='fearAndGreed'/>
        
        <GlobalMarketDominance />
        
        <CoinsTable />
    </div>
</template>

<script setup>
    import GlobalMarketBar from '~/components/market/GlobalMarketBar.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
    import GlobalMarketDominance from '~/components/market/GlobalMarketDominance.vue';
    import GlobalMarketFearGreed from '~/components/market/GlobalMarketFearGreed.vue';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getCoingeckoGlobalMarket, getCmcFearAndGreed } = MarketStore;
    const { fearAndGreed } = storeToRefs(MarketStore);
    
    onMounted(() => {
         getCoingeckoGlobalMarket();
         getCmcFearAndGreed();
    });
</script>