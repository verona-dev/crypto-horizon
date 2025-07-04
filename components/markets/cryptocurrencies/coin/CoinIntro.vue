<template>
    <section class='coin-intro flex flex-col lg:flex-row justify-around'>
        <!--  Left  -->
        <div class='left flex flex-col justify-center gap-20'>
            <!--  Community Sentiment  -->
            <CoinSentiment
                v-if='coingecko'
                :sentimentUp='coingecko.sentiment_votes_up_percentage'
                :sentimentDown='coingecko.sentiment_votes_down_percentage'
            />
            
            <!--  Converter  -->
            <CoinConverter :coin='coin' />
            
            <!--  Explorers  -->
            <CoinExplorers :coingeckoLinks='coingecko.links'/>
        </div>
        
        <!--  Middle  -->
        <div class='middle'>
            middle
        </div>
        
        <!--  Right  -->
        <div class='right'>
            right side
        </div>
    </section>
    
    <Separator class='my-4' />
</template>

<script setup>
    import CoinConverter from '~/components/markets/cryptocurrencies/coin/CoinConverter.vue';
    import CoinSentiment from '~/components/markets/cryptocurrencies/coin/CoinSentiment.vue';
    import CoinExplorers from '~/components/markets/cryptocurrencies/coin/CoinExplorers.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
</script>