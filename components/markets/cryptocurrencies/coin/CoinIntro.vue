<template>
    <section class='coin-intro flex flex-col xl:flex-row gap-30 xl:gap-0 xl:justify-evenly'>
        <!--  Left  -->
        <div class='left flex flex-col justify-center gap-18'>
            <!--  Overview Table  -->
            <CoinOverviewTable :coin='coin' />
            
            <!--  Community Sentiment  -->
            <CoinSentiment
                :sentimentUp='coingecko.sentiment_votes_up_percentage'
                :sentimentDown='coingecko.sentiment_votes_down_percentage'
            />
            
            <!--  Explorers  -->
            <CoinExplorers :coingeckoLinks='coingecko.links'/>
            
            <!--  Contracts  -->
            <CoinContracts :coin='coingecko' />
            
            <!--  Converter  -->
            <CoinConverter :coin='coin' />
        </div>
        
        <!--  Right  -->
        <div class='right w-10/12 xl:w-1/2 flex flex-col gap-24'>
            <!--  Chart  -->
            <CoinChart :chartData='coin.chart' />
            
            <!--  Delta  -->
            <CoinDelta :marketData='coingecko.market_data' />
        </div>
    </section>
    
    <Separator class='my-4' />
</template>

<script setup>
    import CoinContracts from '@/components/markets/cryptocurrencies/coin/CoinContracts.vue';
    import CoinConverter from '~/components/markets/cryptocurrencies/coin/CoinConverter.vue';
    import CoinExplorers from '~/components/markets/cryptocurrencies/coin/CoinExplorers.vue';
    import CoinSentiment from '~/components/markets/cryptocurrencies/coin/CoinSentiment.vue';
    import CoinChart from '~/components/markets/cryptocurrencies/coin/CoinChart.vue';
    import CoinDelta from '~/components/markets/cryptocurrencies/coin/CoinDelta.vue';
    import CoinOverviewTable from '~/components/markets/cryptocurrencies/coin/CoinOverviewTable.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
</script>