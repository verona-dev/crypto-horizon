<template>
    <div class='market flex flex-col items-center justify-center gap-16'>
        <GlobalMarket />
        
        <GlobalMarketFearGreed v-if='fearAndGreed'/>
        
        <GlobalMarketDominance />
        
        <CoinsTable />
    </div>
</template>

<script setup>
    import GlobalMarket from '~/components/market/GlobalMarket.vue';
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