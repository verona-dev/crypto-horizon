<template>
    <div class='coin-delta flex flex-col items-center justify-center'>
        <h6 class='mb-6'>Rate of Change</h6>
        
        <div class='flex items-center'>
            <!--  1h  -->
            <CoinDeltaItem
                :delta='delta1h'
                title='1h'
                description='Rate of change in the last hour.'
            />
            
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
    import CoinDeltaItem from '~/components/markets/coin/CoinDeltaItem.vue';
    
    const props = defineProps({
        marketData: {
            type: Object,
            required: true,
        },
    });
    
    const { marketData } = toRefs(props);
    const delta1h = marketData.value?.price_change_percentage_1h_in_currency?.usd;
    const delta24h = marketData.value?.price_change_percentage_24h;
    const delta7d = marketData.value?.price_change_percentage_7d;
    const delta30d = marketData.value?.price_change_percentage_30d;
    const delta1y = marketData.value?.price_change_percentage_1y;
</script>