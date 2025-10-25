<template>
    <Card class='!w-4/5 xl:!w-fit'>
        <Skeleton
            v-if='!top_coins.length > 0'
            class='w-full h-full'
        />
        
        <CardContent
            v-else
            class='flex flex-col justify-around h-full relative gap-6 p-8'
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
            
            <Card
                v-for='coin in top_coins'
                :key='coin'
                class='bg-transparent p-4 flex justify-between animate-fadeIn-2000'
            >
                <div class='xl:w-60 flex items-center gap-3'>
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
                            class='w-12 h-12 rounded-full'
                        />
                    </NuxtImg>
                    
                    <!--  Name + Symbol  -->
                    <div class='flex flex-col gap-1 border border-sky'>
                        <span class='font-bold'>{{ coin.name }}</span>
                        <span class='text-muted-foreground text-xs'>{{ coin.symbol }}</span>
                    </div>
                </div>

                
                <!--  Sparkline  -->
                <div class='h-1/2 xl:w-40 border border-accent select-none'>
                    <NuxtImg
                        v-if='coin.sparkline'
                        :src='coin.sparkline'
                        alt='trending coin logo'
                        class='w-full h-full'
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
                            class='w-50 h-16'
                        />
                    </NuxtImg>
                    
                    <div v-else class='w-full h-full flex flex-col items-center justify-center gap-2 mb-2'>
                        <NuxtIcon
                            name='my-icon:sparkline-fallback'
                            class='w-full h-full'
                        />
                        
                        <p class='text-xs'>No sparkline available</p>
                    </div>
                </div>
                
                <!--  Price  -->
                <div class='xl:w-24 border flex flex-col justify-center items-end'>
                    <h5>{{ coin.price }}</h5>
                    
                    <HoverCard :openDelay='200'>
                        <HoverCardTrigger>
                            <div
                                class='flex items-center gap-1'
                                :class='coin.text_class'
                            >
                                <NuxtIcon
                                    :name='coin.trend_icon'
                                    size='16'
                                />
                                
                                <span class='flex items-center text-sm'>{{ coin.price_percentage_change }}</span>
                            </div>
                        </HoverCardTrigger>
                        
                        <HoverCardContent>
                            <p class='text-xs'>Price Percentage Change 24h</p>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </Card>
        </CardContent>
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    import { Skeleton } from '~/components/ui/skeleton';
    import { Card, CardContent } from '~/components/ui/card';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import InfoIcon from '~/components/InfoIcon.vue';
    import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
    
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
                price_percentage_change: formatNumber(coin.item.data.price_change_percentage_24h?.usd, { style: 'percent'}),
                text_class: getTextColorClass(coin.item.data.price_change_percentage_24h?.usd),
                trend_icon: getTrendIcon(coin.item.data.price_change_percentage_24h?.usd),
                sparkline: coin.item.data.sparkline,
            }));
        }
    });
    
    watch(top_coins, (newVal) => {
        console.log(newVal[0]);
    })
</script>