<template>
    <div class='defi' v-if='globalDefi'>
        <GlobalDefi />
    </div>
</template>

<script setup>
    import GlobalDefi from '~/components/market/GlobalDefi.vue';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '../../../stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { globalDefi } = storeToRefs(MarketStore);
    const { getCoingeckoGlobalDefi } = MarketStore;
    
    onMounted(() => getCoingeckoGlobalDefi());
    
    definePageMeta({
        title: 'Defi',
    });
</script>

<style scoped>
    .defi {}
</style>