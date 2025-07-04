<template>
    <section class='coin-intro lg:flex-row lg:items-baseline'>
        <!--  Left  -->
        <div class='left flex flex-col justify-center gap-16'>
            <!--  Market Cap Progress  -->
            <CoinMarketCap :marketCap='livecoinwatch.marketCap'/>
            
            <!--  Community Sentiment  -->
            <CoinSentiment
                v-if='coingecko'
                :sentimentUp='coingecko.sentiment_votes_up_percentage'
                :sentimentDown='coingecko.sentiment_votes_down_percentage'
            />
            
            <!--  Explorers  -->
            <CoinExplorers :coingeckoLinks='coingecko.links'/>
            
            <!--  Converter  -->
            <CoinConverter :coin='coin' />
        </div>
        
        <!--  Right  -->
        <div class='right'>
            Coin chart
        </div>
    </section>
    
    <Separator class='my-4' />
</template>

<script setup>
    import CoinConverter from '~/components/markets/cryptocurrencies/coin/CoinConverter.vue';
    import CoinExplorers from '~/components/markets/cryptocurrencies/coin/CoinExplorers.vue';
    import CoinSentiment from '~/components/markets/cryptocurrencies/coin/CoinSentiment.vue';
    import CoinMarketCap from '~/components/markets/cryptocurrencies/coin/CoinMarketCap.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
    const livecoinwatch = toRef(coin.value.livecoinwatch);
</script>