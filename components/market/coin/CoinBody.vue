<template>
    <CardContent class='coin-body'>
        <div class='flex flex-col xl:flex-row items-center xl:items-start gap-6 xl:gap-10'>
            <!--  Left w-full 2xl:w-md -->
            <div class='left flex flex-col items-center gap-24 xl:gap-10 w-1/2 sm:w-2/3 lg:w-full xl:w-1/3'>
                <!--  Overview  -->
                <CoinOverview :coin='coin' />
                
                <!--  Insights  -->
                <CoinInsights :coin='coin' />
                
                <!--  Links  -->
                <CoinLinks
                    :livecoinwatchLinks='livecoinwatch.links'
                    :coingeckoLinks='coingecko.links'
                />
            </div>
            
            <!--  Right w-full 2xl:w-4xl -->
            <div class='right flex flex-col gap-10 xl:w-2/3'>
                <!--  Chart  -->
                <CoinChart :coin='coin' />
                
                <!--  Delta  -->
                <CoinDelta :marketData='coingecko.market_data' />
                
                <!--  Description  -->
                <CoinDescription :coin='coin' />
            </div>
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