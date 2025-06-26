<template>
    <CardContent class='px-20 my-10 flex justify-around'>
        This is coin delta
        
        <!-- 1h  -->
        <CoinDeltaItem
            :delta='delta1h'
            title='1h'
            description='Rate of change in the last hour.'
        />
        
        <!-- 24h  -->
        <CoinDeltaItem
            :delta='delta24h'
            title='24h'
            description='Rate of change in the last 24 hours.'
        />
    </CardContent>
    
    <Separator class='my-4' />
</template>

<script setup>
    import { getDeltaPercentage } from '~/utils/formatUtils.js';
    import { getTrendColor } from '~/utils/styleUtils.js';
    import CoinDeltaItem from '~/components/markets/cryptocurrencies/coin/CoinDeltaItem.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
            default: () => ({}),
        },
    });
    
    const { coin } = toRefs(props);
    const delta1h = computed(() => getDeltaPercentage(coin.value?.delta.hour, coin.value?.rate))
    const delta24h = computed(() => getDeltaPercentage(coin.value?.delta.day, coin.value?.rate));
</script>