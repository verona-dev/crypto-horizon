<template>
    <Alert class='!bg-background flex w-4/ h-96 !border-none !shadow-none animate-fadeIn'>
        <Skeleton
            v-if='!trending_coins'
            class='w-full h-full'
        />
        
        <div v-else class='flex items-start justify-center mx-auto max-w-6xl h-full'>
            <Carousel
                class='relative w-full'
                :plugins='[plugin]'
                @mouseenter='plugin.stop'
                @mouseleave='[plugin.reset(), plugin.play()];'
                :opts='{
                    align: "center",
                    loop: true,
                    skipSnaps: true,
                    duration: 1500,
                    startIndex: 1,
                    dragThreshold: 1,
                }'
            >
                <CarouselContent class='ml-3'>
                    <CarouselItem
                        v-for='coin in trending_coins'
                        :key='coin.item.id'
                        class='md:basis-1/2 lg:basis-1/4'
                    >
                        <GlobalMarketTrendingCoinCard
                            :coin='coin.item'
                        />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    </Alert>
</template>

<script setup>
    import GlobalMarketTrendingCoinCard from '~/components/market/GlobalMarketTrendingCoinCard.vue';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
    import Autoplay from 'embla-carousel-autoplay';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // const { getCoingeckoGlobalTrending } = MarketStore;
    
    const { globalTrending } = storeToRefs(MarketStore);
    const trending_coins = computed(() => globalTrending.value?.coins);
    console.log(trending_coins.value);
    
    const plugin = Autoplay({
        delay: 2000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
    })
    
    // onMounted(() => getCoingeckoGlobalTrending());
</script>