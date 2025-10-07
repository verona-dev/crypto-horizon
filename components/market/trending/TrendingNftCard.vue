<template>
    <Card
        v-if='nft'
        class='!w-80 bg-accent-foreground/75 flex flex-col justify-center gap-6 shadow-2xl !p-0 !border-warning/10'
    >
        <CardHeader class='flex items-center justify-center border-b border-warning/10 !py-8'>
            <NuxtLink
                :to='`/market/${slug}`'
                class='flex items-center justify-center gap-4'
            >
                <h6 class='break-words whitespace-normal'>{{ name }}</h6>
            </NuxtLink>
        </CardHeader>
        
        <CardContent class='flex flex-col items-center justify-center gap-6 px-0'>
            <div class='flex flex-col items-center gap-3'>
                <NuxtImg
                    :src='image'
                    alt='trending nft logo'
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
                <h5>{{ floor_price }}</h5>
                
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
                    alt='trending nft logo'
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
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTextColorClass, getTrendIcon } from '~/utils/styleUtils.js';
    import { Badge } from '~/components/ui/badge/index.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    
    const props = defineProps({
       nft: {
           type: Object,
       }
    });
    
    const { nft } = toRefs(props);
    
    const slug = nft.value?.id;
    const name = nft.value?.name;
    const symbol = nft.value?.symbol;
    const image = nft.value?.thumb;
    const price = nft.value?.floor_price_in_native_currency;
    const price_label = formatNumber(price);
    const currency = nft.value?.native_currency;
    
    const floor_price = nft.value?.data?.floor_price;
    const price_change_percentage_1d = nft.value?.data?.floor_price_in_usd_24h_percentage_change;
    const price_change_percentage_1d_label = formatNumber(price_change_percentage_1d, {
        style: 'percent', compact: true, decimals: 2,
    });
    const volume_24h = nft.value?.data?.h24_volume;
    const average_sale_price_24h = nft.value?.data?.h24_average_sale_price;
    const sparkline = nft.value?.data?.sparkline;
    const title = nft.value?.data?.content?.title;
    const description = nft.value?.data?.content?.description;
</script>