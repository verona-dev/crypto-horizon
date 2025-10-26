<template>
    <Card class='!w-4/5 xl:!w-fit'>
        <Skeleton
            v-if='!top_coins.length > 0'
            class='w-full h-full'
        />
        
        <div v-else>
            <!--  Card Header  -->
            <CardHeader class='flex flex-row items-center gap-3 p-8 border-b relative'>
                <!--  Title  -->
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
                
                <!--  See All  -->
                <Button variant='link' class='text-xs absolute top-0 right-4 h-full'>
                    <NuxtLink to='/market/trending'>See All</NuxtLink>
                    <ChevronRight />
                </Button>
            </CardHeader>
            
            <CardContent class='flex flex-col gap-8 p-8'>
                <Alert
                    v-for='coin in top_coins'
                    :key='coin.name'
                    class='bg-transparent flex justify-between animate-fadeIn-2000 border-none'
                >
                    <div class='xl:w-56 flex gap-3'>
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
                        <div class='flex flex-col gap-1'>
                            <span class='font-bold'>{{ coin.name }}</span>
                            <span class='text-muted-foreground text-xs'>{{ coin.symbol }}</span>
                        </div>
                    </div>
                    
                    <!--  Sparkline  -->
                    <div class='h-12 xl:w-44 select-none'>
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
                                class='w-full h-full'
                            />
                        </NuxtImg>
                        
                        <p v-else class='text-xs'>No sparkline available</p>
                    </div>
                    
                    <!--  Price  -->
                    <div class='xl:w-24 flex flex-col items-end'>
                        <h6>{{ coin.price }}</h6>
                        
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
                                    
                                    <span class='flex items-center text-xs'>{{ coin.price_percentage_change }}</span>
                                </div>
                            </HoverCardTrigger>
                            
                            <HoverCardContent>
                                <p class='text-xs'>Price Percentage Change 24h</p>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </Alert>
            </CardContent>
        </div>
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    import { Skeleton } from '~/components/ui/skeleton';
    import { Card, CardHeader, CardContent } from '~/components/ui/card';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import InfoIcon from '~/components/InfoIcon.vue';
    import { Alert } from '~/components/ui/alert';
    import { Button } from '~/components/ui/button';
    import { ChevronRight } from 'lucide-vue-next';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { trendingCoins } = storeToRefs(MarketStore);
    const top_coins = ref([]);
    
    watch(trendingCoins, (newValue) => {
        if(newValue) {
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
</script>