<template>
    <div class='flex flex-col items-center gap-20'>
        <h2 class='page-title'>Trending Coins</h2>
        
        <div class='animate-fadeIn'>
            <Skeleton
                v-if='!coins'
                class='w-full h-full'
            />
            
            <div v-else class='flex flex-col items-start justify-center max-w-7xl h-full'>
                <Carousel
                    class='w-full cursor-grab'
                    :plugins='[autoScroll]'
                    :opts='{
                        align: "center",
                        loop: true,
                        startIndex: 1,
                        skipSnaps: true,
                    }'
                >
                    <CarouselContent class='ml-3'>
                        <CarouselItem
                            v-for='coin in coins'
                            :key='coin.item.id'
                            class='md:ml-10 basis-1/2 lg:basis-1/3'
                        >
                            <TrendingCoinsCarouselItem :coin='coin.item' />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script setup>
    import TrendingCoinsCarouselItem from '@/components/market/trending/TrendingCoinsCarouselItem.vue';
    import { Skeleton } from '~/components/ui/skeleton';
    import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
    import AutoScroll from 'embla-carousel-auto-scroll';
    
    const props = defineProps({
        coins: {
            type: Object,
        }
    });
    
    const autoScroll = AutoScroll({
        speed: 0.75,
        startDelay: 1000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
    });
</script>
