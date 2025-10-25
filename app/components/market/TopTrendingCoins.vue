<template>
    <Card class='h-96 !w-4/5 xl:!w-fit'>
        <Skeleton
            v-if='!top_coins.length > 0'
            class='w-full h-full'
        />
        
        <CardContent
            v-else
            class='flex flex-col justify-around h-full relative p-8 animate-fadeIn-2000'
        >
            <!--  Title  -->
            <div class='flex items-center gap-3'>
                <h4>Top Trending Coins</h4>
                
                <HoverCard :openDelay='200'>
                    <HoverCardTrigger>
                        <InfoIcon />
                    </HoverCardTrigger>
                    
                    <HoverCardContent>
                        <span>
                            Discover the top trending cryptocurrencies on CoinGecko. This list is sorted by coins that are most searched for in the last 3 hours.
                        </span>
                    </HoverCardContent>
                </HoverCard>
            </div>
            
            <div
                v-for='coin in top_coins'
                :key='coin'
                class='flex items-center gap-4'
            >
                <!--  Logo  -->
                <NuxtImg
                    :src='coin.image'
                    alt='trending coin logo'
                    class='w-12 h-12 rounded-full select-none'
                    :custom='true'
                    v-slot='{ src, isLoaded, imgAttrs, alt }'
                    preload
                >
                    <img
                        v-if='isLoaded'
                        v-bind='imgAttrs'
                        :src='src'
                        :alt='alt'
                    >
                    
                    <Skeleton
                        v-else
                        class='w-18 h-18'
                    />
                </NuxtImg>
                
                <!--  Name + Symbol  -->
                <div class='flex flex-col gap-1'>
                    <span class='font-bold'>{{ coin.name }}</span>
                    <span class='text-muted-foreground text-xs'>{{ coin.symbol }}</span>
                </div>
            </div>
        </CardContent>
    </Card>
</template>

<script setup>
    import { Skeleton } from '~/components/ui/skeleton';
    import { Card, CardContent } from '~/components/ui/card';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import InfoIcon from '~/components/InfoIcon.vue';
    import { formatNumber } from '~/utils/formatUtils.js';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { trendingCoins } = storeToRefs(MarketStore);
    const top_coins = ref([]);
    
    watchEffect(() => {
        if(trendingCoins.value) {
            top_coins.value = trendingCoins.value?.slice(0, 3).map(coin => ({
                name: coin.item.name,
                symbol: coin.item.symbol,
                image: coin.item.large,
                price: formatNumber(coin.item.data.price),
                sparkline: coin.item.data.sparkline,
            }));
        }
    });
    
    watch(top_coins, (newVal) => {
        console.log(newVal[0]);
    })
</script>