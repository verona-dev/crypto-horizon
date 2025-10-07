<template>
    <div class='mt-16 flex flex-col items-center gap-20'>
        <h1 class='text-6xl'>Trending Coins</h1>
        
        <Alert class='flex w-4/ !border-none !shadow-none animate-fadeIn'>
            <Skeleton
                v-if='!coins'
                class='w-full h-full'
            />
            
            <div v-else class='flex flex-col items-start justify-center max-w-6xl h-full'>
                <Carousel
                    class='relative w-full'
                    :plugins='[autoPlay, autoScroll]'
                    :opts='{
                        align: "center",
                        loop: true,
                        startIndex: 1,
                        skipSnaps: true,
                        dragThreshold: 1,
                    }'
                >
                    <CarouselContent class='ml-3'>
                        <CarouselItem
                            v-for='coin in coins'
                            :key='coin.item.id'
                            class='md:basis-1/2 lg:basis-1/3'
                        >
                            <TrendingCoinCard
                                :coin='coin.item'
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </Alert>
    </div>
</template>

<script setup>
    import TrendingCoinCard from '~/components/market/trending/TrendingCoinCard.vue';
    import { Skeleton } from '~/components/ui/skeleton/index.ts';
    import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel/index.js';
    import Autoplay from 'embla-carousel-autoplay';
    import AutoScroll from 'embla-carousel-auto-scroll';
    
    const props = defineProps({
        coins: {
            type: Object,
        }
    });
    
    const autoPlay = Autoplay({
        delay: 2000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
    })
    
    const autoScroll = AutoScroll({
        speed: 0.75,
        startDelay: 1000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
    })
</script>
