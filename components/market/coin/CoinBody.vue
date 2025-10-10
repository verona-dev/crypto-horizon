<template>
    <CardContent class='coin-body'>
        <div class='flex flex-col 2xl:flex-row items-center 2xl:items-start gap-10'>
            <!--  Left  -->
            <Card class='bg-background left flex flex-col gap-24 2xl:gap-28 w-full 2xl:w-md p-10'>
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
            </Card>
            
            <!--  Right  -->
            <div class='right flex flex-col gap-10 w-full 2xl:w-4xl'>
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