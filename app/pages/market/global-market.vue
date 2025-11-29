<template>
    <div class='market page gap-24 xl:gap-48'>
        <div class='flex flex-col items-center justify-center gap-16 z-10'>
            <h1 class='page-title'>Global Market</h1>
            
            <div class='flex flex-col flex-wrap xl:flex-row items-center xl:items-start justify-center gap-6 w-screen max-w-7xl'>
                <MarketFearGreed />
                <MarketDominance />
            </div>
            
            <div class='flex flex-col flex-wrap xl:flex-row items-center xl:items-start justify-center gap-6 w-screen max-w-8xl'>
                <TopTrendingCoins />
                <TopTrendingNfts />
            </div>
        </div>
        
        <Meteors v-if='dark_mode' :count='30' />
    </div>
</template>

<script setup>
    import MarketFearGreed from '~/components/market/MarketFearGreed.vue';
    import MarketDominance from '~/components/market/MarketDominance.vue';
    import TopTrendingCoins from '~/components/market/TopTrendingCoins.vue';
    import TopTrendingNfts from '~/components/market/TopTrendingNfts.vue';
    import { Meteors } from '~/components/ui/meteors';
    
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getTrendingSearchList } = MarketStore;
    
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
    const route = useRoute();
    const config = useRuntimeConfig();
    
    const title = 'Global Crypto Market Dashboard: Fear & Greed, BTC Dominance, Trending Coins & NFTs';
    const description = 'Live insights into global crypto market data: Fear & Greed Index, Bitcoin dominance, trending coins, and trending NFTs. Track market sentiment and trends in real time.';
    const url = computed(() => `${config.public.site_url}${route.path}`);
    const keywords = 'crypto fear and greed index, market dominance, bitcoin dominance, ethereum dominance, stablecoins dominance, trending cryptocurrencies, top NFTs, crypto trends, trending NFTs, crypto market sentiment, global crypto data, crypto analytics, BTC market cap share';
    
    useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        ogUrl: url,
        keywords,
    });
    
    onMounted(() => {
        getTrendingSearchList();
    });
</script>