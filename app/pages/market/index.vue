<template>
    <div class='market page flex flex-col items-center justify-center gap-12'>
        <h1 class='page-title'>Crypto Market</h1>
        
        <div class='flex flex-col flex-wrap xl:flex-row items-center xl:items-start justify-center gap-12 w-screen max-w-7xl'>
            <MarketFearGreed />
            <MarketDominance />
        </div>
        
        <div class='flex flex-col flex-wrap xl:flex-row items-center xl:items-start justify-center gap-12 w-screen max-w-7xl'>
            <TopTrendingCoins />
            <TopTrendingNfts />
        </div>
        
        <CoinsTable />
        
        <Meteors v-if='dark_mode' :count='30' />
    </div>
</template>

<script setup>
    import MarketFearGreed from '~/components/market/MarketFearGreed.vue';
    import MarketDominance from '~/components/market/MarketDominance.vue';
    import TopTrendingCoins from '~/components/market/TopTrendingCoins.vue';
    import TopTrendingNfts from '~/components/market/TopTrendingNfts.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
    import { Meteors } from '~/components/ui/meteors';
    
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getFearAndGreed, getTrendingSearchList } = MarketStore;
    
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
    
    onMounted(() => {
        getFearAndGreed();
        getTrendingSearchList();
    });
</script>