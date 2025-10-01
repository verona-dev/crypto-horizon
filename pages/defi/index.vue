<template>
    <div class='defi'>
        <GlobalDefi />
    </div>
</template>

<script setup>
    import GlobalDefi from '~/components/market/GlobalDefi.vue';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getCoingeckoGlobalMarket } = MarketStore;
    
    onMounted(() => getCoingeckoGlobalMarket());
    
    definePageMeta({
        title: 'Defi',
    });
</script>

<style scoped>
    .defi {}
</style>