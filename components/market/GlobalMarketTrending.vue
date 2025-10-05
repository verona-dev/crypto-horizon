<template>
    <Alert class='!bg-background flex w-4/5 !shadow-none animate-fadeIn'>
        <Skeleton
            v-if='!trending_coins'
            class='w-full h-full'
        />
        
        <div v-else class='flex items-start gap-12'>
            <GlobalMarketTrendingCoinCard
                v-for='coin in trending_coins'
                :key='coin.item.id'
                :coin='coin.item'
            />
        </div>
    </Alert>
</template>

<script setup>
    import GlobalMarketTrendingCoinCard from '~/components/market/GlobalMarketTrendingCoinCard.vue';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // const { getCoingeckoGlobalTrending } = MarketStore;
    
    const { globalTrending } = storeToRefs(MarketStore);
    const trending_coins = computed(() => globalTrending.value?.coins);
    console.log(trending_coins.value);
    
    // onMounted(() => getCoingeckoGlobalTrending());
</script>