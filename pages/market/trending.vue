<template>
    <div class='trending flex flex-col items-center justify-center gap-20'>
        <TrendingCoins
            v-if='trending_coins'
            :coins='trending_coins'
        />
    </div>
</template>

<script setup>
    import TrendingCoins from '~/components/market/trending/TrendingCoins.vue';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { getCoingeckoTrending } = MarketStore;
    
    const { marketTrending } = storeToRefs(MarketStore);
    const trending_coins = computed(() => marketTrending.value?.coins);
    
    onMounted(() => getCoingeckoTrending());
</script>