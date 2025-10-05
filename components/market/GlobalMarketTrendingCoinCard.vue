<template>
    <Card
        v-if='coin'
        class='!w-64 bg-accent-foreground shadow-2xl !py-6 !px-0 !border-warning/10'
    >
        <CardHeader class='flex items-center justify-center gap-4 border-b text-warning border-warning/10 px-0 !pb-4'>
            <Badge class='select-none text-sm text-warning border-warning' variant='outline'>{{ rank }}</Badge>
            
            <h6>{{ name }}</h6>
        </CardHeader>
        
        <CardContent class='flex flex-col items-center justify-center gap-8 px-0'>
            <div class='flex flex-col items-center gap-3'>
                <NuxtImg
                    :src='image'
                    alt='trending coin logo'
                    class='w-20 h-20 rounded-md rounded-b-none select-none'
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
                        class='w-20 h-20'
                    />
                </NuxtImg>
                
                <div class='flex items-center gap-2 text-muted-foreground'>
                    <p>#{{ mcap_rank }}</p>
                    
                    <p>{{ symbol }}</p>
                    
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
                            <p class='text-xs'>{{ description }}</p>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
            
            <div class='flex flex-col items-center gap-1'>
                <h4>{{ price_label }}</h4>
                
                <div class='flex items-center gap-1 mr-2'>
                    <NuxtIcon
                        :name='getTrendIcon(price_change_percentage_1d)'
                        size='15'
                        :class='getTextColorClass(price_change_percentage_1d)'
                    />
                    
                    <span
                        :class='[getTextColorClass(price_change_percentage_1d)]'
                        class='flex items-center'
                    >
                    {{ price_change_percentage_1d_label }}
                </span>
                </div>
            </div>
            
            <!--  Sparkline  -->
            <NuxtImg
                :src='sparkline'
                alt='trending coin logo'
                class='w-2/3'
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
                    class='h-[100px] w-full'
                />
            </NuxtImg>
        </CardContent>
    </Card>
</template>

<script setup>
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.ts';
    import { Badge } from '@/components/ui/badge';
    
    const props = defineProps({
        coin: {
            type: Object
        }
    });
    
    const { coin } = toRefs(props);
    
    const rank = coin.value?.score + 1;
    const image = coin.value?.large;
    const mcap_rank = coin.value?.market_cap_rank;
    const name = coin.value?.name;
    const symbol = coin.value?.symbol;
    const price = coin.value?.data?.price;
    const price_label = formatNumber(price, {
    });
    const price_change_percentage_1d = coin.value?.data?.price_change_percentage_24h?.usd;
    const price_change_percentage_1d_label = formatNumber(price_change_percentage_1d, {
        style: 'percent', compact: true, decimals: 2,
    });
    const sparkline = coin.value?.data?.sparkline;
    const title = coin.value?.data?.content?.title;
    const description = coin.value?.data?.content?.description;
</script>