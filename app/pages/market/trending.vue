<template>
    <div class='trending page gap-60'>
        <TrendingCoinsCarousel
            v-if='trending_coins'
            :coins='trending_coins'
        />
        
        <TrendingNftsCarousel
            v-if='trending_nfts'
            :nfts='trending_nfts'
        />
    </div>
</template>

<script setup>
    import TrendingCoinsCarousel from '@/components/market/trending/TrendingCoinsCarousel.vue';
    import TrendingNftsCarousel from '@/components/market/trending/TrendingNftsCarousel.vue';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { getTrendingSearchList } = MarketStore;
    
    const { trendingCoins, trendingNfts } = storeToRefs(MarketStore);
    const trending_coins = computed(() => trendingCoins.value);
    const trending_nfts = computed(() => trendingNfts.value);
    
    onMounted(() => getTrendingSearchList());
</script>