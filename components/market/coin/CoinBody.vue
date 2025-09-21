<template>
    <CardContent class='coin-body my-10'>
        <section class='mt-0 flex flex-col 2xl:flex-row items-center 2xl:items-start'>
            <!--  Left  -->
            <div class='left flex flex-col
                gap-24 2xl:gap-24
                2xl:py-10 pr-0 xl:pr-10
                2xl:border-r
            '>
                <!--  Overview  -->
                <CoinOverview :coin='coin' />
                
                <!--  Explorers  -->
                <CoinExplorers :links='coingecko.links'/>
                
                <!--  Contracts  -->
                <CoinContracts :coin='coingecko' />
                
                <!--  Community Sentiment  -->
                <CoinSentiment
                    :sentimentUp='sentiment_up_percentage'
                    :sentimentDown='sentiment_down_percentage'
                />
                
                <!--  Converter  -->
                <CoinConverter :coin='coin' />
                
                <!--  Links  -->
                <CoinLinks
                    :livecoinwatchLinks='livecoinwatch.links'
                    :coingeckoLinks='coingecko.links'
                />
            </div>
            
            <!--  Right  -->
            <div class='right flex flex-col gap-28'>
                <!--  Chart  -->
                <CoinChart :coin='coin' />
                
                <!--  Delta  -->
                <CoinDelta :marketData='coingecko.market_data' />
                
                <!--  Description  -->
                <CoinDescription :coin='coin' />
            </div>
        </section>
    </CardContent>
</template>

<script setup>
    import CoinContracts from '~/components/market/coin/CoinContracts.vue';
    import CoinConverter from '~/components/market/coin/CoinConverter.vue';
    import CoinExplorers from '~/components/market/coin/CoinExplorers.vue';
    import CoinSentiment from '~/components/market/coin/CoinSentiment.vue';
    import CoinChart from '~/components/market/coin/CoinChart.vue';
    import CoinDelta from '~/components/market/coin/CoinDelta.vue';
    import CoinOverview from '~/components/market/coin/CoinOverview.vue';
    import CoinLinks from '~/components/market/coin/CoinLinks.vue';
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
    
    const sentiment_up_percentage = coingecko.value?.sentiment_votes_up_percentage;
    const sentiment_down_percentage = coingecko.value?.sentiment_votes_down_percentage;
</script>