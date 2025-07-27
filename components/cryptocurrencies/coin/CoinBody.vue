<template>
    <CardContent class='coin-body px-0'>
        <section class='mt-0 coin-intro flex flex-col 2xl:flex-row items-center xl:items-start gap-20 xl:gap-8'>
            <!--  Left  -->
            <div class='left flex flex-col gap-24 2xl:gap-18 2xl:border-r pt-0 2xl:py-10 px-20 lg:w-[800px] 2xl:w-auto'>
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
                    :livecoinwatchLinks='coin.livecoinwatch.links'
                    :coingeckoLinks='coin.coingecko.links'
                />
            </div>
            
            <!--  Right  -->
            <div class='right flex flex-col gap-20 pl-0 2xl:pl-10 w-800px 2xl:w-[900px]'>
                <!--  Chart  -->
                <CoinChart :coin='coin' />
                
                <!--  Delta  -->
                <CoinDelta :marketData='coingecko.market_data' />
                
                <!--  Description Accordion  -->
                <CoinDescription :coin='coin' />
            </div>
        </section>
        
        <Separator />
    </CardContent>
</template>

<script setup>
    import CoinContracts from '~/components/cryptocurrencies/coin/CoinContracts.vue';
    import CoinConverter from '~/components/cryptocurrencies/coin/CoinConverter.vue';
    import CoinExplorers from '~/components/cryptocurrencies/coin/CoinExplorers.vue';
    import CoinSentiment from '~/components/cryptocurrencies/coin/CoinSentiment.vue';
    import CoinChart from '~/components/cryptocurrencies/coin/CoinChart.vue';
    import CoinDelta from '~/components/cryptocurrencies/coin/CoinDelta.vue';
    import CoinOverview from '~/components/cryptocurrencies/coin/CoinOverview.vue';
    import CoinLinks from '~/components/cryptocurrencies/coin/CoinLinks.vue';
    import CoinDescription from '~/components/cryptocurrencies/coin/CoinDescription.vue';
    
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