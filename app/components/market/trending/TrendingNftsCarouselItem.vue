<template>
    <FlipCard
        v-if='nft'
        rotate='x'
        class='w-full md:w-96 md:min-h-110 !rounded-sm'
    
    >
        <!--  Card Front  -->
        <template #default>
            <div class='h-full flex flex-col items-center justify-evenly px-12'>
                <!--  Logo  -->
                <div class='w-40 h-40 px-2'>
                    <NuxtImg
                        :src='image'
                        alt='trending nft logo'
                        class='bg-card size-full rounded-full p-2 border-2 border-border/50'
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
                            class='size-full'
                        />
                    </NuxtImg>
                </div>
                
                <MorphingText
                    :texts='texts'
                    class='lg:text-[2rem] [filter:url(#threshold)_blur(0.005px)]'
                    :morphTime='3.5'
                    :coolDownTime='2.5'
                />
            </div>
        </template>
        
        <!--  Card Back  -->
        <template #back>
            <div class='flex min-h-full flex-col gap-2'>
                <!--  Name + Symbol + Description  -->
                <div class='flex flex-col items-center p-4 gap-3'>
                    <h4 class=' break-words whitespace-normal font-bold uppercase'>
                        {{ name }}
                    </h4>
                    
                    <!--  Description  -->
                    <div class='flex items-center gap-2 text-muted-foreground'>
                        <span class='truncate text-muted-foreground w-full text-center text-sm'>{{ symbol }}</span>
                        
                        <HoverCard v-if='description' :openDelay='200'>
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
                
                <!--  Sparkline + Prices  -->
                <div class='flex flex-col w-full p-2 gap-8 border-t border-b-border'>
                    <!--  Sparkline  -->
                    <div class='w-full h-24 rounded py-8 px-2 flex items-center justify-center select-none'>
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
                                name='my-icons:sparkline-fallback'
                                class='w-full h-full'
                            />
                            
                            <p class='text-xs'>No sparkline available</p>
                        </div>
                    </div>
                    
                    <!--  Floor Price + Trend  -->
                    <div class='flex flex-col items-center gap-1'>
                        <p class='uppercase text-muted-foreground text-sm'>Floor Price</p>
                        
                        <div class='flex items-center gap-3'>
                            <h6>{{ floor_price }}</h6>
                            
                            <div class='flex items-center gap-1' :class='getTrendClass(floor_price_change_percentage_1d)'>
                                <NuxtIcon
                                    :name='getTrendIcon(floor_price_change_percentage_1d)'
                                    size='15'
                                />
                                
                                <span class='flex items-center text-sm'>{{ price_change_percentage_1d_label }}</span>
                                
                                <span class='text-sm'>&#40;24h&#41;</span>
                            </div>
                        </div>
                    
                    </div>
                    
                    <!--  Sale Price + Volume 24h  -->
                    <div class='flex items-center justify-around'>
                        <div class='flex flex-col items-center gap-1'>
                            <p class='uppercase text-muted-foreground text-sm'>Average sale price</p>
                            
                            <h6>{{ average_sale_price_24h }}</h6>
                        </div>
                        
                        <div class='flex flex-col items-center gap-1'>
                            <p class='uppercase text-muted-foreground text-sm'>Volume 24h</p>
                            
                            <h6>{{ volume_24h }}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </FlipCard>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendClass, getTrendIcon } from '~/utils/styleUtils.js';
    import { FlipCard } from '~/components/ui/flip-card';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import { MorphingText } from '~/components/ui/morphing-text';
    import { Skeleton } from '~/components/ui/skeleton';
    import InfoIcon from '~/components/InfoIcon.vue';
    
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
    const texts = [ name, symbol, floor_price ];
</script>