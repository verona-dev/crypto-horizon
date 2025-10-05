<template>
    <div class='mt-12 flex flex-col items-center gap-6'>
        <h3>Top Trending Coins</h3>
        
        <Alert class='flex w-4/ !border-none !shadow-none animate-fadeIn'>
            <Skeleton
                v-if='!trending_coins'
                class='w-full h-full'
            />
            
            <div v-else class='flex flex-col items-start justify-center max-w-6xl h-full'>
                <Carousel
                    class='relative w-full'
                    :plugins='[plugin]'
                    @mouseenter='plugin.stop'
                    @mouseleave='[plugin.reset(), plugin.play()];'
                    :opts='{
                    align: "center",
                    loop: true,
                    startIndex: 1,
                }'
                >
                    <CarouselContent class='ml-3'>
                        <CarouselItem
                            v-for='coin in trending_coins'
                            :key='coin.item.id'
                            class='md:basis-1/2 lg:basis-1/3'
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
    </div>
</template>

<script setup>
    import GlobalMarketTrendingCoinCard from '~/components/market/GlobalMarketTrendingCoinCard.vue';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
    import AutoScroll from 'embla-carousel-auto-scroll';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // const { getCoingeckoGlobalTrending } = MarketStore;
    
    const { globalTrending } = storeToRefs(MarketStore);
    const trending_coins = computed(() => globalTrending.value?.coins);
    
    const plugin = AutoScroll({
        speed: 0.5,
        startDelay: 1000,
    })
    
    // onMounted(() => getCoingeckoGlobalTrending());
</script>

<style scoped>
    button {
        &:hover {
            color: var(--muted-foreground);
        }
        
        margin: 0 -50px;
    }
</style>