<template>
    <section class='coin-intro'>
        <!--  Left  -->
        <div class='left max-w-[350px] flex flex-col justify-center gap-20'>
            <!--  Explorers  -->
            <CoinExplorers :coingeckoLinks='coingecko.links'/>
            
            <!--  Converter  -->
            <CoinConverter :coin='coin' />
            
            <!--  Community Sentiment  -->
            <CoinSentiment
                v-if='coingecko'
                :sentimentUp='coingecko.sentiment_votes_up_percentage'
                :sentimentDown='coingecko.sentiment_votes_down_percentage'
            />
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
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
</script>