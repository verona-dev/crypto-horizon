<template>
    <div v-if='globalTrending' class=''>
        trending data
    </div>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { getCoingeckoGlobalTrending } = MarketStore;
    
    const { globalTrending } = storeToRefs(MarketStore);
    
    onMounted(() => getCoingeckoGlobalTrending());
</script>