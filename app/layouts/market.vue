<template>
    <DefaultLayout>
        <MarketBar />
        <slot />
    </DefaultLayout>
</template>

<script setup>
    import DefaultLayout from '~/layouts/default.vue';
    import MarketBar from '~/components/market/MarketBar.vue';
    
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getGlobalMarket } = MarketStore;
    
    onMounted(() => {
        getGlobalMarket();
    });
</script>