<template>
    <div class='single-coin bg-card custom-flex'>
        <div
            v-if='loading'
            class='flex items-center'
        >
            <MazSpinner
                color='secondary'
                size='3em'
            />
            <h4 class='ml-4'>Loading...</h4>
        </div>
        
        <div v-else>
            <Card
                v-if='coin && coin.livecoinwatch.name'
                class='2xl:max-w-[1500px] text-card-foreground flex flex-col gap-6 rounded-xl border py-20 shadow-sm'
            >
                <!--  Header  -->
                <CoinHeader :coin='coin' />
                
                <CardContent class='my-10 flex flex-col lg:flex-row lg:justify-evenly'>
                    <div class='left'>
                        <!--  Links  -->
                        <CoinLinks
                            :livecoinwatchLinks='coin.livecoinwatch.links'
                            :coingeckoLinks='coin.coingecko.links'
                        />
                    </div>
                    
                    <div class='right flex flex-col items-center lg:items-around'>
                        <!--  Market Cap Progress  -->
                        <CoinMarketCap :marketCap='coin.livecoinwatch.marketCap'/>
                        
                        <!--  Overview  -->
                        <CoinOverview
                            :coin='coin'
                            class='my-20'
                        />
                        
                        <!--  Converter  -->
                        <CoinConverter :coin='coin' />
                        
                        <!--  Community Sentiment  -->
                        <CoinSentiment
                            :sentimentUp='coin.coingecko.sentiment_votes_up_percentage'
                            :sentimentDown='coin.coingecko.sentiment_votes_down_percentage'
                        />
                    </div>
                </CardContent>
                
                <Separator class='my-4' />
                
                <!--  Delta  -->
                <CoinDelta :coin='coin.livecoinwatch' />
                
                <!--  Supply  -->
                <CoinSupply :coin='coin.livecoinwatch' />
                
                <Separator class='my-4' />
                
                <!--  Info  -->
                <CoinInfo :coin='coin' />
            </Card>
        </div>
    </div>
</template>

<script setup>
    import CoinConverter from '~/components/markets/cryptocurrencies/coin/CoinConverter.vue';
    import CoinDelta from '~/components/markets/cryptocurrencies/coin/CoinDelta.vue';
    import CoinHeader from '@/components/markets/cryptocurrencies/coin/CoinHeader.vue';
    import CoinInfo from '@/components/markets/cryptocurrencies/coin/CoinInfo.vue';
    import CoinLinks from '@/components/markets/cryptocurrencies/coin/CoinLinks.vue';
    import CoinOverview from '@/components/markets/cryptocurrencies/coin/CoinOverview.vue';
    import CoinSentiment from '@/components/markets/cryptocurrencies/coin/CoinSentiment.vue';
    import CoinSupply from '~/components/markets/cryptocurrencies/coin/CoinSupply.vue';
    
    // Router
    import {useRoute} from 'vue-router';
    const route = useRoute();
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    import CoinMarketCap from '~/components/markets/cryptocurrencies/coin/CoinMarketCap.vue';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    // State
    const { coin, loading } = storeToRefs(CryptocurrenciesStore);
    // Methods
    const { setCoin } = CryptocurrenciesStore;
    
    onMounted(() => {
        setCoin(route.params.coin);
    });
</script>