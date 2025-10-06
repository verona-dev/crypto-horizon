<template>
    <Card
        v-if='coin'
        class='!w-72 bg-accent-foreground/75 flex flex-col justify-center gap-6 shadow-2xl !p-0 !border-warning/10'
    >
        <CardHeader class='flex items-center justify-center border-b border-warning/10 !py-4'>
            <NuxtLink
                :to='`/market/${slug}`'
                class='flex items-center justify-center gap-4'
            >
                <Badge class='text-md border-muted-foreground' variant='outline'>{{ rank }}</Badge>
                
                <h6 class='truncate'>{{ name }}</h6>
            </NuxtLink>
        </CardHeader>
        
        <CardContent class='flex flex-col items-center justify-center gap-6 px-0'>
            <div class='flex flex-col items-center gap-3'>
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
                
                <div class='flex items-center gap-2 text-muted-foreground'>
                    <p class='text-sm'>#{{ mcap_rank }}</p>
                    
                    <p class='text-sm'>{{ symbol }}</p>
                    
                    <HoverCard :openDelay='200' v-if='description'>
                        <HoverCardTrigger class='info-icon'>
                            <NuxtIcon
                                name='radix-icons:info-circled'
                                size='15'
                                class='flex text-muted-foreground'
                            />
                        </HoverCardTrigger>
                        
                        <HoverCardContent class='!p-6 flex flex-col !gap-3'>
                            <p class='text-xs'>{{ title }}</p>
                            <p class='text-xs text-muted-foreground'>{{ description }}</p>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
            
            <div class='flex flex-col items-center gap-1'>
                <h5>{{ price_label }}</h5>
                
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
            </div>
            
            <!--  Sparkline  -->
            <div class='w-3/4 border-t border-warning/10 h-32 rounded py-8 px-2 flex items-center'>
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
    import { Skeleton } from '~/components/ui/skeleton/index.ts';
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.ts';
    import { Badge } from '~/components/ui/badge/index.js';
    
    const props = defineProps({
        coin: {
            type: Object
        }
    });
    
    const { coin } = toRefs(props);
    
    const slug = coin.value?.slug;
    const rank = coin.value?.score + 1;
    const image = coin.value?.large;
    const mcap_rank = coin.value?.market_cap_rank;
    const name = coin.value?.name;
    const symbol = coin.value?.symbol;
    const price = coin.value?.data?.price;
    const price_label = formatNumber(price);
    const price_change_percentage_1d = coin.value?.data?.price_change_percentage_24h?.usd;
    const price_change_percentage_1d_label = formatNumber(price_change_percentage_1d, {
        style: 'percent', compact: true, decimals: 2,
    });
    const sparkline = coin.value?.data?.sparkline;
    const title = coin.value?.data?.content?.title;
    const description = coin.value?.data?.content?.description;
</script>