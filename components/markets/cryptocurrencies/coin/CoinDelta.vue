<template>
    <div
        class='coin-delta flex flex-col items-center justify-center'
    >
        <h6>Rate of Change</h6>
        
        <div class='flex items-center'>
            <!--  24h  -->
            <CoinDeltaItem
                :delta='delta24h'
                title='24h'
                description='Rate of change in the last 24 hours.'
            />
            
            <!--  7d  -->
            <CoinDeltaItem
                :delta='delta7d'
                title='7d'
                description='Rate of change in the last 7 days.'
            />
            
            <!--  30d  -->
            <CoinDeltaItem
                :delta='delta30d'
                title='30d'
                description='Rate of change in the last 30 days.'
            />
            
            <!--  1y  -->
            <CoinDeltaItem
                :delta='delta1y'
                title='1y'
                description='Rate of change in the last 365 days.'
            />
        </div>
    </div>
</template>

<script setup>
    import CoinDeltaItem from '~/components/markets/cryptocurrencies/coin/CoinDeltaItem.vue';
    
    const props = defineProps({
        marketData: {
            type: Object,
            required: true,
        },
    });
    
    const { marketData } = toRefs(props);
    
    const delta24h = marketData.value?.price_change_percentage_24h;
    const delta7d = marketData.value?.price_change_percentage_7d;
    const delta30d = marketData.value?.price_change_percentage_30d;
    const delta1y = marketData.value?.price_change_percentage_1y;
    
    // const delta24h = computed(() => getDeltaPercentage(marketData.value?.livecoinwatch?.delta.day, coin.value?.rate));
    // const delta7d = computed(() => getDeltaPercentage(marketData.value?.livecoinwatch?.delta.week, coin.value?.rate));
    // const delta1m = computed(() => getDeltaPercentage(marketData.value?.livecoinwatch?.delta.month, coin.value?.rate));
    // const delta1y = computed(() => getDeltaPercentage(marketData.value?.livecoinwatch?.delta.year, coin.value?.rate))
</script>