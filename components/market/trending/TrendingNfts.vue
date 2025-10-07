<template>
    <div class='mt-16 flex flex-col items-center gap-20'>
        <h1 class='text-6xl'>Trending Nft's</h1>
        
        <Alert class='flex w-4/ !border-none !shadow-none animate-fadeIn'>
            <Skeleton
                v-if='!nfts'
                class='w-full h-full'
            />
            
            <div v-else class='flex flex-col items-start justify-center max-w-7xl h-full'>
                <Carousel
                    class='relative w-full'
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
                            v-for='nft in nfts'
                            :key='nft.id'
                            class='md:basis-1/2 lg:basis-1/3'
                        >
                            <TrendingNftCard :nft='nft' />
                        </CarouselItem>
             
                    </CarouselContent>
                </Carousel>
            </div>
        </Alert>
    </div>
</template>

<script setup>
    import TrendingNftCard from '~/components/market/trending/TrendingNftCard.vue'
    import { Skeleton } from '~/components/ui/skeleton/index.ts';
    import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel/index.js';
    import AutoScroll from 'embla-carousel-auto-scroll';
    
    const props = defineProps({
        nfts: {
            type: Object,
        }
    });
    
    const { nfts } = toRefs(props);
    console.log(nfts.value);
    
    const autoScroll = AutoScroll({
        direction: 'backward',
        speed: 0.75,
        startDelay: 1000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
    });
</script>