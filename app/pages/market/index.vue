<template>
    <div class='market page gap-24 xl:gap-48 w-screen md:max-w-[1920px] p-10 md:pb-16 md:px-24 lg:px-36 xl:px-48'>
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
    
    onMounted(() => {
        getTrendingSearchList();
    });
</script>