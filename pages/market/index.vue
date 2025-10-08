<template>
    <div class='market flex flex-col items-center justify-center gap-20'>
        <MarketBar />
        
        <h1 class='text-6xl'>Crypto Market</h1>
        
        <div class='flex flex-wrap items-center justify-center gap-4 h-[960px] xl:h-96 max-w-7xl'>
            <MarketFearGreed />
            <MarketDominance />
        </div>
        
        <CoinsTable />
    </div>
</template>

<script setup>
    import MarketBar from '~/components/market/MarketBar.vue';
    import MarketFearGreed from '~/components/market/MarketFearGreed.vue';
    import MarketDominance from '~/components/market/MarketDominance.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
    
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getCmcFearAndGreed, getCoingeckoGlobalMarket } = MarketStore;
    
    onMounted(() => {
        getCmcFearAndGreed();
        getCoingeckoGlobalMarket();
    });
</script>