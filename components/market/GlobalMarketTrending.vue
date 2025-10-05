<template>
    <Alert class='!bg-background w-4/5 !shadow-none animate-fadeIn'>
        <Skeleton
            v-if='!trending_coins'
            class='w-full h-full'
        />
        
        <div v-else class='flex'>
            <Card
                v-for='coin in trending_coins'
                :key='coin.item.id'
                class='!w-fit bg-accent-foreground flex items-center gap-4 shadow-2xl p-6'
            >
                <NuxtImg
                    :src='coin.item?.large'
                    alt='trending coin logo'
                    class='rounded-md rounded-b-none'
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
                        class='h-[100px] w-full'
                    />
                </NuxtImg>
                
                <div class='flex items-center gap-2'>
                    <p class='text-xs'>#{{ coin.item?.market_cap_rank }}</p>
                    <p class='text-xs'>{{ coin.item?.name }}</p>
                </div>
                
                <p class='text-xs'>{{ coin.item?.data?.price }}</p>
            </Card>
        </div>
    </Alert>
</template>

<script setup>
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // const { getCoingeckoGlobalTrending } = MarketStore;
    
    const { globalTrending } = storeToRefs(MarketStore);
    const trending_coins = computed(() => globalTrending.value?.coins);
    console.log(trending_coins.value);
    
    // onMounted(() => getCoingeckoGlobalTrending());
</script>