<template>
    <div
        v-if='coin'
        class='flex flex-col items-center justify-center'
    >
        <h4>Rate of Change</h4>
        
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
                :delta='delta1m'
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
        coin: {
            type: Object,
            required: true,
            default: () => ({}),
        },
    });
    
    const { coin } = toRefs(props);
    const delta1h = computed(() => getDeltaPercentage(coin.value?.livecoinwatch?.delta.hour, coin.value?.rate));
    const delta24h = computed(() => getDeltaPercentage(coin.value?.livecoinwatch?.delta.day, coin.value?.rate));
    const delta7d = computed(() => getDeltaPercentage(coin.value?.livecoinwatch?.delta.week, coin.value?.rate));
    const delta1m = computed(() => getDeltaPercentage(coin.value?.livecoinwatch?.delta.month, coin.value?.rate));
    const delta1y = computed(() => getDeltaPercentage(coin.value?.livecoinwatch?.delta.year, coin.value?.rate))
</script>