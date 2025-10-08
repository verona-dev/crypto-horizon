<template>
    <div class='mt-16 flex flex-col items-center gap-20'>
        <h1 class='text-5xl xl:text-9xl my-10'>Trending Coins</h1>
        
        <Alert class='flex animate-fadeIn'>
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
                            class='md:ml-10 md:basis-1/2 lg:basis-1/4'
                        >
                            <TrendingCoinCard :coin='coin.item' />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </Alert>
    </div>
</template>

<script setup>
    import TrendingCoinCard from '~/components/market/trending/TrendingCoinCard.vue';
    import { Skeleton } from '~/components/ui/skeleton/index.ts';
    import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel/index.js';
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
