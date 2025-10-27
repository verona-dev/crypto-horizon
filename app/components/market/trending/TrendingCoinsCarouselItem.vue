<template>
    <Card class='w-[400px]'>
        <Skeleton
            v-if='!coin'
            class='w-full h-full'
        />
        
        <div v-else class='h-72 p-3 flex flex-col justify-between animate-fadeIn'>
            <!--  Logo + Name + Symbol  -->
            <CardHeader class='card-header'>
                <div class='flex items-center gap-3'>
                    <!--
                    <Badge variant='outline'>{{ rank }}</Badge>
                    -->
                    
                    <!--  Logo  -->
                    <NuxtImg
                        v-if='image'
                        :src='image'
                        alt='trending coin logo'
                        class='w-8 h-8 rounded-full select-none'
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
                            class='w-8 h-8 rounded-full'
                        />
                    </NuxtImg>
                    
                    <CardTitle>{{ name }}</CardTitle>
                    
                    <p class='text-sm text-muted-foreground'>{{ symbol }}</p>
                    
                    <HoverCard :openDelay='200'>
                        <HoverCardTrigger>
                            <InfoIcon />
                        </HoverCardTrigger>
                        
                        <HoverCardContent class='flex flex-col !items-start !gap-3'>
                            <div class='flex flex-col gap-3'>
                                <span>{{ title }}</span>
                                <span>Market cap rank &#35;{{ mcap_rank }}</span>
                            </div>
                            <span class='text-muted-foreground'>{{ description }}</span>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </CardHeader>
            
            <!--  Sparkline  -->
            <CardContent class='flex items-center justify-center'>
                <Alert class='bg-transparent w-80 h-20 p-0 flex items-center justify-center select-none border-none'>
                    <NuxtImg
                        v-if='sparkline'
                        :src='sparkline'
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
                    
                    <div v-else class='w-full h-full text-muted-foreground flex flex-col items-center justify-center gap-2 mb-2'>
                        <NuxtIcon
                            name='ph:presentation-chart-duotone'
                            class='w-full h-full'
                        />
                        
                        <p class='text-xs'>No sparkline available</p>
                    </div>
                </Alert>
            </CardContent>
            
            <CardFooter class='flex justify-between items-center'>
                <h5>{{ price_label }}</h5>
                
                <!--  Trend  -->
                <HoverCard :openDelay='200'>
                    <HoverCardTrigger>
                        <div
                            class='flex items-center gap-1'
                            :class='getTextColorClass(price_change_percentage_1d)'
                        >
                            <NuxtIcon
                                :name='getTrendIcon(price_change_percentage_1d)'
                                size='12'
                            />
                            
                            <h5>{{ price_change_percentage_1d_label }}</h5>
                        </div>
                    </HoverCardTrigger>
                    
                    <HoverCardContent class='flex flex-col !gap-3'>
                        <p class='text-xs'>Price Percentage Change 24h</p>
                    </HoverCardContent>
                </HoverCard>
            </CardFooter>
        </div>
    </Card>
    
    
    <Card
        v-if='coin'
        class='!w-68 flex flex-col justify-center gap-6 !p-0'
    >
        <NuxtLink
            :to='`/market/${slug}`'
            target='_blank'
        >
            <!--  Rank + Name  -->
            <CardHeader class='h-24 card-header flex flex-row justify-center items-center gap-3 border-b'>
                <Badge variant='outline'>{{ rank }}</Badge>
                
                <h6 class='name text-green-deco font-bold uppercase'>{{ name }}</h6>
                
                <NuxtIcon
                    name='iconoir:open-new-window'
                    size='12'
                    class='icon opacity-0'
                />
            </CardHeader>
        </NuxtLink>
        
        <CardContent class='flex flex-col items-center justify-center gap-6 px-0'>
            <div class='flex flex-col items-center gap-3'>
                <!--  Logo  -->
                <NuxtImg
                    :src='image'
                    alt='trending coin logo'
                    class='w-18 h-18 rounded-md rounded-b-none select-none'
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
                
                <!--  Mcap + Symbol + Description  -->
                <div class='flex items-center gap-2 text-muted-foreground'>
                    <p class='text-sm'>#{{ mcap_rank }}</p>
                    
                    <p class='text-sm'>{{ symbol }}</p>
                    
                    <HoverCard :openDelay='200' v-if='description'>
                        <HoverCardTrigger>
                            <InfoIcon />
                        </HoverCardTrigger>
                        
                        <HoverCardContent class='flex flex-col !gap-3'>
                            <span>{{ title }}</span>
                            <span class='text-muted-foreground'>{{ description }}</span>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
            
            <div class='flex flex-col items-center gap-1'>
                <!--  Price  -->
                <h5>{{ price_label }}</h5>
                
                <!--  Trend  -->
                <HoverCard :openDelay='200'>
                    <HoverCardTrigger>
                        <div
                            class='flex items-center gap-1'
                            :class='getTextColorClass(price_change_percentage_1d)'
                        >
                            <NuxtIcon
                                :name='getTrendIcon(price_change_percentage_1d)'
                                size='12'
                            />
                            
                            <span class='flex items-center text-xs'>{{ price_change_percentage_1d_label }}</span>
                            
                            <span class='text-xs'>&#40;24h&#41;</span>
                        </div>
                    </HoverCardTrigger>
                    
                    <HoverCardContent class='flex flex-col !gap-3'>
                        <p class='text-xs'>Price Percentage Change 24h</p>
                    </HoverCardContent>
                </HoverCard>
            </div>
            
            <!--  Sparkline  -->
            <div class='w-full h-24 rounded py-6 px-2 flex items-center justify-center border-t border-warning/10 select-none'>
                <NuxtImg
                    v-if='sparkline'
                    :src='sparkline'
                    alt='trending coin logo'
                    class='w-2/3 h-full'
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
        </CardContent>
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    import InfoIcon from '~/components/InfoIcon.vue';
    import { ChevronRight } from 'lucide-vue-next';
    import { Alert } from '~/components/ui/alert';
    // import { Badge } from '~/components/ui/badge';
    import { Button } from '@/components/ui/button/index.js';
    import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '~/components/ui/card';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import { Skeleton } from '~/components/ui/skeleton';
    
    const props = defineProps({
        coin: {
            type: Object
        }
    });
    
    const { coin } = toRefs(props);
    
    const slug = coin.value?.slug;
    // const rank = coin.value?.score + 1;
    const image = coin.value?.large;
    const mcap_rank = coin.value?.market_cap_rank;
    const name = coin.value?.name;
    const symbol = coin.value?.symbol;
    const price = coin.value?.data?.price;
    const price_label = formatNumber(price);
    const price_change_percentage_1d = coin.value?.data?.price_change_percentage_24h?.usd;
    const price_change_percentage_1d_label = formatNumber(price_change_percentage_1d, {
        style: 'percent',
    });
    const sparkline = coin.value?.data?.sparkline;
    const title = coin.value?.data?.content?.title;
    const description = coin.value?.data?.content?.description;
</script>

<style scoped>
    .card-header {
        &:hover {
            .name {
                text-decoration: underline;
            }
            
            .icon {
                opacity: 1;
            }
        }
    }
</style>