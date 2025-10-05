<template>
    <div class='market flex flex-col items-center justify-center gap-12'>
        <GlobalMarketBar />
        
        <div class='flex flex-wrap items-center justify-center gap-4 h-[768px] xl:h-96 max-w-7xl'>
            <GlobalMarketFearGreed />
            <GlobalMarketDominance />
        </div>
        
        <GlobalMarketTrending v-if='globalTrending'/>
        
        <CoinsTable />
    </div>
</template>

<script setup>
    import GlobalMarketBar from '~/components/market/GlobalMarketBar.vue';
    import GlobalMarketFearGreed from '~/components/market/GlobalMarketFearGreed.vue';
    import GlobalMarketDominance from '~/components/market/GlobalMarketDominance.vue';
    import GlobalMarketTrending from '~/components/market/GlobalMarketTrending.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getCoingeckoGlobalMarket, getCmcFearAndGreed, getCoingeckoGlobalTrending } = MarketStore;
    const { globalTrending } = storeToRefs(MarketStore);
    
    
    onMounted(() => {
         getCoingeckoGlobalMarket();
         getCmcFearAndGreed();
        getCoingeckoGlobalTrending();
    });
</script>