<template>
    <div class='market page gap-24 xl:gap-48 w-screen md:max-w-[1920px] p-10 md:pb-16 md:px-24 lg:px-36 xl:px-48 3xl:px-0'>
        <CoinsTable />
    </div>
</template>

<script setup>
    import CoinsTable from '~/components/market/CoinsTable.vue';
    
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getTrendingSearchList, resetCoin } = MarketStore;
    
    // const colorMode = useColorMode();
    // const dark_mode = computed(() => colorMode.value === 'dark');
    
    const title = 'Cryptocurrency Prices, Charts, and Market Capitalization';
    const description = 'Live cryptocurrency prices, market cap, volume, circulating supply, and price charts for 10,000+ coins. Track Bitcoin, Ethereum, and 10,000+ altcoins in real time.';
    
    useSeoMeta({
        title ,
        description,
        
        ogTitle: title,
        ogDescription: description,
        
        twitterTitle: title,
        twitterDescription: description,
    });
    
    onMounted(() => {
        getTrendingSearchList();
        resetCoin();
    });
</script>