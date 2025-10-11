<template>
    <CardContent class='coin-body'>
        <!--  Overview  -->
        <CoinOverview :coin='coin' />
        
        <!--  Insights  -->
        <CoinInsights :coin='coin' />
        
        <!--  Links  -->
        <CoinLinks
            :livecoinwatchLinks='livecoinwatch.links'
            :coingeckoLinks='coingecko.links'
        />
        
        <!--  Chart  -->
        <CoinChart :coin='coin' />
        
        <!--  Delta  -->
        <CoinDelta :marketData='coingecko.market_data' />
        
        <!--  Description  -->
        <CoinDescription :coin='coin' />
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