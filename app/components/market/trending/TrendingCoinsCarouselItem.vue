<template>
    <Card class='bg-card h-130 w-130 p-6 !rounded-xl hover:border-primary/25 flex flex-col justify-between'>
        <Skeleton
            v-if='!coin'
            class='w-full h-full'
        />
        
        <template v-else>
            <!--  Logo + Name + Info  -->
            <CardHeader class='flex flex-row justify-between items-center'>
                <!--                <Badge variant='outline' class='text-base text-primary'>#{{ mcap_rank }}</Badge>-->
                
                <!--  Logo  -->
                <HoverCard :openDelay='200'>
                    <HoverCardTrigger>
                        <Button
                            variant='outline'
                            size='icon-lg'
                            aria-label='logo'
                            class='w-16 h-16 rounded-xl bg-primary/15'
                        >
                            <NuxtImg
                                v-if='image'
                                :src='image'
                                alt='trending coin logo'
                                class='w-10 h-10 rounded-full select-none'
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
                                    class='w-10 h-10 rounded-full'
                                />
                            </NuxtImg>
                        </Button>
                    </HoverCardTrigger>
                    
                    <HoverCardContent :avoidCollisions='true' class='flex flex-col !items-start !gap-3'>
                        <div class='flex items-center gap-3 text-lg font-bold'>
                            <span v-if='symbol'>{{ symbol }}</span>
                            <span v-if='mcap_rank'>&#35;{{ mcap_rank }}</span>
                        </div>
                        
                        <div v-if='description' class='flex flex-col gap-3'>
                            <span>{{ title }}</span>
                            <span class='text-muted-foreground'>{{ description }}</span>
                        </div>
                    </HoverCardContent>
                </HoverCard>
                
                <!--  Symbol + Name  -->
                <div class='flex flex-col items-center'>
                    <p class='text-muted-foreground'>{{ symbol }}</p>
                    
                    <Title :tag='4'>{{ name }}</Title>
                </div>
                
                <!--  Action  -->
                <Button
                    variant='outline'
                    size='icon-lg'
                    aria-label='logo'
                    class='w-16 h-16 rounded-xl bg-muted'
                >
                    <NuxtIcon
                        name='ph:dots-three-vertical'
                        class='w-10 h-10'
                    />
                </Button>
            </CardHeader>
            
            <!--  Price + Percentage change  -->
            <CardContent class='flex justify-between items-center'>
                <div class='flex flex-col gap-4 border-l-2 border-l-primary pl-6'>
                    <Title :tag='5' class='text-muted-foreground'>Price</Title>
                    <Title :tag='2'>{{ price_label }}</Title>
                </div>
                
                <!--  Trend  -->
                <HoverCard :openDelay='200'>
                    <HoverCardTrigger>
                        <div
                            class='flex items-center gap-1'
                            :class='getTrendClass(price_change_percentage_1d)'
                        >
                            <NuxtIcon
                                :name='getTrendIcon(price_change_percentage_1d)'
                                size='24'
                            />
                            
                            <h5>{{ price_change_percentage_1d_label }}</h5>
                        </div>
                    </HoverCardTrigger>
                    
                    <HoverCardContent class='flex flex-col !gap-3'>
                        <p class='text-xs'>Price Percentage Change 24h</p>
                    </HoverCardContent>
                </HoverCard>
            </CardContent>
            
            <!--  Sparkline  -->
            <CardFooter class='flex items-center justify-center'>
                <Alert class='bg-transparent w-4/5 h-16 p-0 flex items-center justify-center select-none border-none'>
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
            </CardFooter>
        </template>
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTrendClass } from '~/utils/styleUtils.js';
    import { Button } from '~/components/ui/button';
    import InfoIcon from '~/components/InfoIcon.vue';
    import { Alert } from '~/components/ui/alert';
    import { Badge } from '~/components/ui/badge';
    import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '~/components/ui/card';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import { Skeleton } from '~/components/ui/skeleton';
    import Title from '~/components/Title.vue';
    
    const props = defineProps({
        coin: {
            type: Object
        }
    });
    
    const { coin } = toRefs(props);
    
    const slug = coin.value?.slug;
    const rank = coin.value.id.score + 1;
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