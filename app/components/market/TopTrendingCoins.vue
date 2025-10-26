<template>
    <Card class='min-h-96 !w-4/5 xl:!w-[600px]'>
        <Skeleton
            v-if='!top_trending_coins?.length'
            class='w-full h-full'
        />
        
        <div v-else>
            <!--  Card Header  -->
            <CardHeader class='card-header'>
                <!--  Logo + Title + Symbol  -->
                <div class='card-title'>
                    <CardTitle>Top Trending Coins</CardTitle>
                    
                    <HoverCard :openDelay='200'>
                        <HoverCardTrigger>
                            <InfoIcon />
                        </HoverCardTrigger>
                        
                        <HoverCardContent>
                            Discover the top trending cryptocurrencies on CoinGecko. This list is sorted by coins that are most searched for in the last 3 hours.
                        </HoverCardContent>
                    </HoverCard>
                </div>
                
                <!--  See All  -->
                <Button variant='link' class='text-xs xl:absolute top-0 right-4 h-full'>
                    <NuxtLink to='/market/trending'>See All</NuxtLink>
                    <ChevronRight />
                </Button>
            </CardHeader>
            
            <CardContent class='card-content'>
                <Alert
                    v-for='coin in top_trending_coins'
                    :key='coin.name'
                    class='bg-transparent flex items-center gap-6 animate-fadeIn-2000 border-none'
                >
                    <!--  Logo + Name + Symbol  -->
                    <div class='name'>
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
                        <div class='h-20 flex flex-col justify-center gap-1'>
                            <span class='font-bold'>{{ coin.name }}</span>
                            <span class='text-muted-foreground text-xs'>{{ coin.symbol }}</span>
                        </div>
                    </div>
                    
                    <!--  Sparkline  -->
                    <div v-if='!isMobile' class='sparkline h-10'>
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
                        
                        <p v-else class='text-xs self-center'>No sparkline available</p>
                    </div>
                    
                    <!--  Price  -->
                    <div class='price'>
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
    import { Card, CardTitle, CardHeader, CardContent } from '~/components/ui/card';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import InfoIcon from '~/components/InfoIcon.vue';
    import { Alert } from '~/components/ui/alert';
    import { Button } from '~/components/ui/button';
    import { ChevronRight } from 'lucide-vue-next';
    import { useSidebar } from '~/components/ui/sidebar';
    const { isMobile } = useSidebar();
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { trendingCoins } = storeToRefs(MarketStore);
    const top_trending_coins = ref([]);
    
    watch(trendingCoins, (newValue) => {
        if(newValue) {
            top_trending_coins.value = trendingCoins.value?.slice(0, 3).map(coin => ({
                name: coin.item.name,
                symbol: coin.item.symbol,
                image: coin.item.large,
                price: formatNumber(coin.item.data.price),
                price_percentage_change: formatNumber(coin.item.data.price_change_percentage_24h?.usd, {
                    style: 'percent'
                }),
                text_class: getTextColorClass(coin.item.data.price_change_percentage_24h?.usd),
                trend_icon: getTrendIcon(coin.item.data.price_change_percentage_24h?.usd),
                sparkline: coin.item.data.sparkline,
            }));
        }
    });
</script>