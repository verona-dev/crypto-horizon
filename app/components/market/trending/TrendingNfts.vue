<template>
    <div class='flex flex-col items-center gap-20'>
        <h1 class='text-5xl xl:text-9xl my-10'>Trending Nft's</h1>
        
        <div class='flex animate-fadeIn'>
            <Skeleton
                v-if='!nfts'
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
                            v-for='nft in nfts'
                            :key='nft.id'
                            class='md:basis-1/2 lg:basis-1/3'
                        >
                            <TrendingNftItem :nft='nft' />
                        </CarouselItem>
             
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script setup>
    import TrendingNftItem from '@/components/market/trending/TrendingNftItem.vue'
    import { Skeleton } from '~/components/ui/skeleton';
    import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
    import AutoScroll from 'embla-carousel-auto-scroll';
    
    const props = defineProps({
        nfts: {
            type: Object,
        }
    });
    
    const { nfts } = toRefs(props);
    
    const autoScroll = AutoScroll({
        direction: 'backward',
        speed: 0.75,
        startDelay: 1000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
    });
</script>