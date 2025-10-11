<template>
    <Card class='bg-background flex flex-col gap-20 p-10 w-full'>
        <!--  Performance  -->
        <CoinPerformance :coin='coin' />
        
        <!--  Explorers  -->
        <CoinExplorers :links='coingecko.links'/>
        
        <!--  Contracts  -->
        <CoinContracts :coin='coingecko' />
        
        <!--  Converter  -->
        <CoinConverter :coin='coin' />
        
        <!--  Community Sentiment  -->
        <CoinSentiment
            :sentimentUp='sentiment_up_percentage'
            :sentimentDown='sentiment_down_percentage'
        />
    </Card>
</template>

<script setup>
    import CoinPerformance from '~/components/market/coin/CoinPerformance.vue';
    import CoinExplorers from '~/components/market/coin/CoinExplorers.vue';
    import CoinContracts from '~/components/market/coin/CoinContracts.vue';
    import CoinSentiment from '~/components/market/coin/CoinSentiment.vue';
    import CoinConverter from '~/components/market/coin/CoinConverter.vue';
    
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