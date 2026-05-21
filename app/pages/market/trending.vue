<template>
    <div class='page gap-60'>
        <div class='flex flex-col items-center justify-center gap-16'>
            <Title tag='h1' class='page-title'>Trending Coins</Title>
            
            <TrendingCoinsCarousel
                v-if='trending_coins'
                :coins='trending_coins'
            />
        </div>
        
        <div class='flex flex-col items-center justify-center gap-24'>
            <Title tag='h1' class='page-title'>Trending Nft's</Title>
            
            <TrendingNftsCarousel
                v-if='trending_nfts'
                :nfts='trending_nfts'
                id='trending-nfts'
            />
        </div>
    </div>
</template>

<script setup>
    import TrendingCoinsCarousel from '@/components/market/trending/TrendingCoinsCarousel.vue';
    import TrendingNftsCarousel from '@/components/market/trending/TrendingNftsCarousel.vue';
    import Title from '~/components/Title.vue';
    
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
    
    definePageMeta({
        layout: 'market',
        title,
        description,
    });
    
    onMounted(() => getTrendingSearchList());
</script>