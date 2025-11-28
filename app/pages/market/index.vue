<template>
    <div class='market page gap-24 xl:gap-48 w-screen md:max-w-[1920px] p-10 md:pb-16 md:px-24 lg:px-36 xl:px-48 3xl:px-0'>
        <CoinsTable />
    </div>
</template>

<script setup>
    import CoinsTable from '~/components/market/CoinsTable.vue';
    
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getTrendingSearchList } = MarketStore;
    
    // const colorMode = useColorMode();
    // const dark_mode = computed(() => colorMode.value === 'dark');
    
    useSeoMeta({
        title: 'Cryptocurrency Prices, Charts, and Market Capitalization',
        description: 'Live cryptocurrency prices, market cap, volume, circulating supply, and price charts for 10,000+ coins. Track Bitcoin, Ethereum, and altcoins in real time.',
        
        ogTitle: 'Live Cryptocurrency Prices & Market Data',
        ogDescription: 'Real-time crypto prices, market cap, volume, and charts for Bitcoin, Ethereum, and 10,000+ altcoins.',
        ogUrl: `${process.env.SITE_URL}/market`,
    });
    
    definePageMeta({
        title: 'Cryptocurrency Prices, Charts, and Market Capitalization',
    });
    
    onMounted(() => {
        getTrendingSearchList();
    });
</script>