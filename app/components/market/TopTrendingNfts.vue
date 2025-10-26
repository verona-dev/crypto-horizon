<template>
    <Card class='!w-4/5 xl:!w-fit'>
        <Skeleton
            v-if='!top_trending_nfts?.length'
            class='w-full h-full'
        />
        
        <div v-else>
            <!--  Card Header  -->
            <CardHeader class='flex flex-col xl:flex-row items-center p-8 border-b relative'>
                <!--  Title  -->
                <div class='flex items-center gap-3'>
                    <h4>Top Trending Nft's</h4>
                    
                    <HoverCard :openDelay='200'>
                        <HoverCardTrigger>
                            <InfoIcon />
                        </HoverCardTrigger>
                        
                        <HoverCardContent>
                        <span>
                            Discover the top trending Nft's on CoinGecko. This list is sorted by Nft's that are most searched for in the last 3 hours.
                        </span>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                
                <!--  See All  -->
                <Button variant='link' class='text-xs xl:absolute top-0 right-4 h-full'>
                    <NuxtLink to='/market/trending#trending-nfts'>See All</NuxtLink>
                    <ChevronRight />
                </Button>
            </CardHeader>
            
            <CardContent class='flex flex-col gap-8 p-8'>
                <Alert
                    v-for='nft in top_trending_nfts'
                    :key='nft.name'
                    class='bg-transparent flex gap-12 justify-between animate-fadeIn-2000 border-none'
                >
                    <!--  Logo + Title + Symbol  -->
                    <div class='flex flex-1 gap-3'>
                        <!--  Logo  -->
                        <NuxtImg
                            :src='nft.image'
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
                            <span class='font-bold'>{{ nft.name }}</span>
                            <span class='text-muted-foreground text-xs'>{{ nft.symbol }}</span>
                        </div>
                    </div>
                    
                    <!--  Sparkline  -->
                    <div v-if='!isMobile' class='h-10 select-none min-w-0 flex'>
                        <NuxtImg
                            v-if='!nft.sparkline'
                            :src='nft.sparkline'
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
                    <div class='flex flex-1 flex-col items-end'>
                        <h6>{{ nft.floor_price }}</h6>
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger>
                                <div
                                    class='flex items-center gap-1'
                                    :class='nft.text_class'
                                >
                                    <NuxtIcon
                                        :name='nft.trend_icon'
                                        size='16'
                                    />
                                    
                                    <span class='flex items-center text-xs'>{{ nft.floor_price_percentage_change }}</span>
                                </div>
                            </HoverCardTrigger>
                            
                            <HoverCardContent>
                                <p class='text-xs'>Floor Price Percentage Change 24h in $USD</p>
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
    import { useSidebar } from '~/components/ui/sidebar';
    const { isMobile } = useSidebar();
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { trendingNfts } = storeToRefs(MarketStore);
    const top_trending_nfts = ref([]);
    
    
    watch(trendingNfts, (newVal) => {
        if(newVal) {
            top_trending_nfts.value = trendingNfts.value?.slice(0, 3).map(nft => ({
                name: nft.name,
                symbol: nft.symbol,
                image: nft.thumb,
                floor_price: nft.data.floor_price,
                floor_price_percentage_change: formatNumber(nft.data.floor_price_in_usd_24h_percentage_change, {
                    style: 'percent'
                }),
                sparkline: nft.data.sparkline,
                text_class: getTextColorClass(nft.data.floor_price_in_usd_24h_percentage_change),
                trend_icon: getTrendIcon(nft.data.floor_price_in_usd_24h_percentage_change),
            }));
        }
    });
</script>