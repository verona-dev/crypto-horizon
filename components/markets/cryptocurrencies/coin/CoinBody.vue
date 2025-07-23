<template>
    <CardContent class='coin-body'>
        <section class='coin-intro flex flex-col xl:flex-row gap-30 xl:gap-0 justify-evenly xl:items-start'>
            <!--  Left  -->
            <div class='left flex flex-col gap-24 xl:gap-18 xl:border-r pt-0 xl:py-10 px-20 md:w-[800px] xl:w-auto'>
                <!--  Overview  -->
                <CoinOverview :coin='coin' />
                
                <!--  Explorers  -->
                <CoinExplorers :links='coingecko.links'/>
                
                <!--  Contracts  -->
                <CoinContracts :coin='coingecko' />
                
                <!--  Links  -->
                <CoinLinks
                    :livecoinwatchLinks='coin.livecoinwatch.links'
                    :coingeckoLinks='coin.coingecko.links'
                />
            </div>
            
            <!--  Right  -->
            <div class='right flex flex-col gap-20'>
                <!--  Chart  -->
                <CoinChart :coin='coin' />
                
                <!--  Delta  -->
                <CoinDelta :marketData='coingecko.market_data' />
                
                <!--  Community Sentiment  -->
                <CoinSentiment
                    :sentimentUp='sentiment_up_percentage'
                    :sentimentDown='sentiment_down_percentage'
                />
                
                <!--  Converter  -->
                <CoinConverter :coin='coin' />
            </div>
        </section>
        
        <Separator />
        
        <!--  Supply  -->
        <CoinSupply :coin='coin.livecoinwatch' />
    </CardContent>
    
<!--    <Separator class='my-4' />-->
</template>

<script setup>
    import CoinContracts from '@/components/markets/cryptocurrencies/coin/CoinContracts.vue';
    import CoinConverter from '~/components/markets/cryptocurrencies/coin/CoinConverter.vue';
    import CoinExplorers from '~/components/markets/cryptocurrencies/coin/CoinExplorers.vue';
    import CoinSentiment from '~/components/markets/cryptocurrencies/coin/CoinSentiment.vue';
    import CoinChart from '~/components/markets/cryptocurrencies/coin/CoinChart.vue';
    import CoinDelta from '~/components/markets/cryptocurrencies/coin/CoinDelta.vue';
    import CoinOverview from '~/components/markets/cryptocurrencies/coin/CoinOverview.vue';
    import CoinLinks from '~/components/markets/cryptocurrencies/coin/CoinLinks.vue';
    import CoinSupply from '~/components/markets/cryptocurrencies/coin/CoinSupply.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
    
    const sentiment_up_percentage = coingecko.value?.sentiment_votes_up_percentage;
    const sentiment_down_percentage = coingecko.value?.sentiment_votes_down_percentage;
</script>