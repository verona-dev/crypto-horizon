<template>
    <CardContent class='coin-body grid grid-cols-1 xl:grid-cols-[1fr_3fr] gap-6'>
        <!-- Left -->
        <div class='flex flex-col space-y-6'>
            <CoinOverview :coin='coin' />
            <CoinInsights :coin='coin' />
        </div>
        
        <!-- Right -->
        <div class='flex flex-col space-y-6'>
            <CoinChart :coin='coin' />
            <CoinLinks
                :livecoinwatchLinks='livecoinwatch.links'
                :coingeckoLinks='coingecko.links'
            />
            <CoinDelta :marketData='coingecko.market_data' />
            <CoinDescription :coin='coin' />
        </div>
    </CardContent>
</template>

<script setup>
    import CoinOverview from '~/components/market/coin/CoinOverview.vue';
    import CoinInsights from '~/components/market/coin/CoinInsights.vue';
    import CoinLinks from '~/components/market/coin/CoinLinks.vue';
    import CoinChart from '~/components/market/coin/CoinChart.vue';
    import CoinDelta from '~/components/market/coin/CoinDelta.vue';
    import CoinDescription from '~/components/market/coin/CoinDescription.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
    const livecoinwatch = toRef(coin.value?.livecoinwatch);
</script>