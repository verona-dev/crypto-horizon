<template>
    <Card
        v-if='nft'
        class='w-full md:w-84 flex flex-col gap-6 p-0 border'
    >
        <CardHeader class='h-24 !pb-0 flex items-center border-b'>
            <!--  Contract ID  -->
            <!--
            <HoverCard :openDelay='200' v-if='contract_id'>
                <HoverCardTrigger>
                    <Badge class='badge h-12 w-24 text-base border-muted-foreground flex items-center justify-center' variant='outline'>{{ contract_id }}</Badge>
                </HoverCardTrigger>
                <HoverCardContent>
                    <p class='text-xs'>Contract ID</p>
                </HoverCardContent>
            </HoverCard>
            -->
            
            <!--  Name + Symbol  -->
            <h6 class='flex flex-col flex-grow text-green-deco break-words whitespace-normal text-center font-bold uppercase overflow-hidden'>
                {{ name }}
                <span class='truncate text-muted-foreground w-full text-center text-sm'>{{ symbol }}</span>
            </h6>
            
            <!--  Description  -->
            <div class='flex items-center gap-2 text-muted-foreground'>
                <HoverCard :openDelay='200' v-if='description'>
                    <HoverCardTrigger class='cursor-default'>
                        <InfoIcon />
                    </HoverCardTrigger>
                    
                    <HoverCardContent class='flex flex-col !gap-3'>
                        <span>{{ title }}</span>
                        <span class='text-muted-foreground'>{{ description }}</span>
                    </HoverCardContent>
                </HoverCard>
            </div>
        </CardHeader>
        
        <CardContent class='flex flex-col items-center justify-center gap-10 !px-0'>
            <!--  Logo  -->
            <NuxtImg
                :src='image'
                alt='trending nft logo'
                class='w-32 h-32 rounded-md rounded-b-none select-none'
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
                    class='w-32 h-32'
                />
            </NuxtImg>
            
            <div class='flex flex-col w-full px-2 gap-8'>
                <div class='flex flex-col items-center gap-1'>
                    <p class='uppercase text-muted-foreground text-sm'>Floor price</p>
                    
                    <div class='flex items-center gap-3'>
                        <!--  Floor Price  -->
                        <h6>{{ floor_price }}</h6>
                        
                        <!--  Trend  -->
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='cursor-default'>
                                <div
                                    class='flex items-center gap-1'
                                    :class='getTextColorClass(floor_price_change_percentage_1d)'
                                >
                                    <NuxtIcon
                                        :name='getTrendIcon(floor_price_change_percentage_1d)'
                                        size='15'
                                    />
                                    
                                    <span class='flex items-center text-sm'>{{ price_change_percentage_1d_label }}</span>
                                    
                                    <span class='text-sm'>&#40;24h&#41;</span>
                                </div>
                            </HoverCardTrigger>
                            
                            <HoverCardContent class='flex flex-col !gap-3'>
                                <p class='text-xs'>Floor Price 24h Percentage Change</p>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                
                </div>
                
                <div class='flex items-center justify-around'>
                    <!--  Sale Price  -->
                    <div class='flex flex-col items-center gap-1'>
                        <p class='uppercase text-muted-foreground text-sm'>Average sale price</p>
                        
                        <h6>{{ average_sale_price_24h }}</h6>
                    </div>
                    
                    <!--  Volume 24h  -->
                    <div class='flex flex-col items-center gap-1'>
                        <p class='uppercase text-muted-foreground text-sm'>Volume 24h</p>
                        
                        <h6>{{ volume_24h }}</h6>
                    </div>
                </div>
            </div>
            
            <!--  Sparkline  -->
            <div class='w-full h-24 rounded py-8 px-2 flex items-center justify-center border-t border-warning/10 select-none'>
                <NuxtImg
                    v-if='sparkline'
                    :src='sparkline'
                    alt='trending nft logo'
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
    import { getTextColorClass, getTrendIcon } from '~/utils/styleUtils.js';
    // import { Badge } from '~/components/ui/badge/index.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import { Skeleton } from '~/components/ui/skeleton';
    import InfoIcon from '~/components/InfoIcon.vue';
    import { Card, CardHeader, CardContent } from '~/components/ui/card';
    
    const props = defineProps({
        nft: {
            type: Object,
        }
    });
    
    const { nft } = toRefs(props);
    
    // const slug = nft.value?.id;
    // const contract_id = nft.value?.nft_contract_id;
    const name = nft.value?.name;
    const symbol = nft.value?.symbol;
    const image = nft.value?.thumb;
    const floor_price = nft.value?.data?.floor_price;
    const floor_price_change_percentage_1d = nft.value?.data?.floor_price_in_usd_24h_percentage_change;
    const price_change_percentage_1d_label = formatNumber(floor_price_change_percentage_1d, {
        style: 'percent',
    });
    const volume_24h = nft.value?.data?.h24_volume;
    const average_sale_price_24h = nft.value?.data?.h24_average_sale_price;
    const sparkline = nft.value?.data?.sparkline;
    const title = nft.value?.data?.content?.title;
    const description = nft.value?.data?.content?.description;
</script>