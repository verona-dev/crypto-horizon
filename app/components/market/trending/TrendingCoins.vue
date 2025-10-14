<template>
    <div class='flex flex-col items-center gap-20'>
        <h1 class='page-title'>Trending Coins</h1>
        
        <Alert class='flex animate-fadeIn border-none'>
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
    import { Skeleton } from '~/components/ui/skeleton';
    import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
    import AutoScroll from 'embla-carousel-auto-scroll';
    import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
    
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
