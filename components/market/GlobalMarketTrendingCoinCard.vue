<template>
    <Card
        v-if='coin'
        class='!w-60 bg-accent-foreground flex items-center gap-4 shadow-2xl p-6'
    >
        <h5>{{ rank }}</h5>
        
        <NuxtImg
            :src='image'
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
            <p class='text-xs'>#{{ mcap_rank }}</p>
            <p class='text-xs'>{{ name }}</p>
            <p class='text-xs'>{{ symbol }}</p>
        </div>
        
        <p class='text-xs'>{{ price_label }}</p>
    </Card>
</template>

<script setup>
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    
    const props = defineProps({
        coin: {
            type: Object
        }
    });
    
    const { coin } = toRefs(props);
    
    const rank = coin.value?.score;
    const image = coin.value?.large;
    const mcap_rank = coin.value?.market_cap_rank;
    const name = coin.value?.name;
    const symbol = coin.value?.symbol;
    const price = coin.value?.data?.price;
    const price_label = formatNumber(price, {
        maximumFractionDigits: 4,
    });
</script>

<style scoped>

</style>