<template>
    <Card
        v-if='nft'
        class='w-full md:w-96 bg-accent-foreground/75 flex flex-col gap-10 shadow-2xl p-0 border border-warning/10 rounded-lg'
    >
        <CardHeader class='h-40 flex flex-col items-center justify-center !p-4 border-b border-warning/10'>
            <div class='flex flex-col items-center gap-4 w-full mt-2'>
                <HoverCard :openDelay='200' v-if='contract_id'>
                    <HoverCardTrigger class='info-icon'>
                        <Badge class='badge w-24 text-md border-muted-foreground' variant='outline'>{{ contract_id }}</Badge>
                    </HoverCardTrigger>
                    
                    <HoverCardContent class='!p-4'>
                        <p class='text-xs'>Contract ID</p>
                    </HoverCardContent>
                </HoverCard>
                
                <h5 class='h-14 text-green-deco break-words whitespace-normal text-center font-bold uppercase'>{{ name }}</h5>
            </div>
        </CardHeader>
        
        <CardContent class='flex flex-col items-center justify-center gap-12'>
            <div class='flex flex-col items-center gap-3'>
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
                
                <div class='flex items-center gap-2 text-muted-foreground'>
                    <h6 class='truncate text-green-deco'>{{ symbol }}</h6>
                    
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
            
            <!--  Prices  -->
            <div class='flex justify-between w-full px-3'>
                <!--  Floor Price  -->
                <div class='flex flex-col items-center gap-1'>
                    <p class='uppercase text-muted-foreground text-sm'>Floor price</p>
                    
                    <h5>{{ floor_price }}</h5>
                    
                    <div
                        class='flex items-center gap-1'
                        :class='getTextColorClass(floor_price_change_percentage_1d)'
                    >
                        <NuxtIcon
                            :name='getTrendIcon(floor_price_change_percentage_1d)'
                            size='12'
                        />
                        
                        <span class='flex items-center text-xs'>{{ price_change_percentage_1d_label }}</span>
                        
                        <span class='text-xs'>&#40;24h&#41;</span>
                    </div>
                </div>
                
                <!--  Sale Price  -->
                <div class='flex flex-col items-center gap-1'>
                    <p class='uppercase text-muted-foreground text-sm'>Average sale price</p>
                    
                    <h5>{{ average_sale_price_24h }}</h5>
                </div>
            </div>
            
            <!--  Sparkline  -->
            <div class='w-full border-t border-warning/10 h-32 rounded py-8 px-2 flex items-center justify-center'>
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
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Badge } from '~/components/ui/badge/index.js';
    
    const props = defineProps({
        nft: {
            type: Object,
        }
    });
    
    const { nft } = toRefs(props);
    
    const slug = nft.value?.id;
    const contract_id = nft.value?.nft_contract_id;
    const name = nft.value?.name;
    const symbol = nft.value?.symbol;
    const image = nft.value?.thumb;
    const price = nft.value?.floor_price_in_native_currency;
    const price_label = formatNumber(price);
    const currency = nft.value?.native_currency;
    
    const floor_price = nft.value?.data?.floor_price;
    const floor_price_change_percentage_1d = nft.value?.data?.floor_price_in_usd_24h_percentage_change;
    const price_change_percentage_1d_label = formatNumber(floor_price_change_percentage_1d, {
        style: 'percent', compact: true, decimals: 2,
    });
    const volume_24h = nft.value?.data?.h24_volume;
    const average_sale_price_24h = nft.value?.data?.h24_average_sale_price;
    const sparkline = nft.value?.data?.sparkline;
    const title = nft.value?.data?.content?.title;
    const description = nft.value?.data?.content?.description;
</script>