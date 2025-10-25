<template>
    <div class='trending page gap-60'>
        <TrendingCoins
            v-if='trending_coins'
            :coins='trending_coins'
        />
        
        <TrendingNfts
            v-if='trending_nfts'
            :nfts='trending_nfts'
        />
    </div>
</template>

<script setup>
    import TrendingCoins from '~/components/market/trending/TrendingCoins.vue';
    import TrendingNfts from '~/components/market/trending/TrendingNfts.vue';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { getCoingeckoTrending } = MarketStore;
    
    const { trendingCoins, trendingNfts } = storeToRefs(MarketStore);
    const trending_coins = computed(() => trendingCoins.value);
    const trending_nfts = computed(() => trendingNfts.value);
    
    onMounted(() => getCoingeckoTrending());
</script>