<template>
    <div class='trending page gap-60'>
        <TrendingCoinsCarousel
            v-if='trending_coins'
            :coins='trending_coins'
        />
        
        <TrendingNftsCarousel
            v-if='trending_nfts'
            :nfts='trending_nfts'
            id='trending-nfts'
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
    
    // SEO
    const title = 'Trending Cryptocurrencies & NFTs';
    const description = 'Discover the most talked-about cryptocurrencies and NFTs right now. Track real-time trends, price surges, and viral projects in the crypto space.';
    
    // useSeoMeta({
    //     title,
    //     description,
    //     ogTitle: title,
    //     ogDescription: description,
    //     twitterTitle: title,
    //     twitterDescription: description,
    // });
    
    definePageMeta({
        title,
        description,
    });
    
    onMounted(() => getTrendingSearchList());
</script>