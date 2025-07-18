<template>
    <div class='single-coin bg-card custom-flex'>
        <div
            v-if='loading'
            class='flex items-center h-[75vh]'
        >
            <MazSpinner
                color='secondary'
                size='3em'
            />
            <h4 class='ml-4 mb-0'>Loading...</h4>
        </div>
        
        <div v-else>
            <Card
                v-if='coin && coin.livecoinwatch.name'
                class='2xl:max-w-[1500px] gap-0 text-card-foreground flex flex-col rounded-none'
            >
                <!--  Header  -->
                <CoinHeader :coin='coin' />
                
                <!--  Intro + Chart  -->
                <CoinIntro :coin='coin'/>
                
                <CardContent class='flex flex-col'>
                    <!--  Links  -->
                    <CoinLinks
                        :livecoinwatchLinks='coin.livecoinwatch.links'
                        :coingeckoLinks='coin.coingecko.links'
                    />
                    
                    <!--  Overview  -->
                    <CoinOverview :coin='coin' />
                </CardContent>
                
                <!--  Supply  -->
                <CoinSupply :coin='coin.livecoinwatch' />
                
                <Separator class='my-4' />
                
                <!--  Info  -->
                <CoinDescription :coin='coin' />
            </Card>
        </div>
    </div>
</template>

<script setup>
    import CoinHeader from '@/components/markets/cryptocurrencies/coin/CoinHeader.vue';
    import CoinIntro from '@/components/markets/cryptocurrencies/coin/CoinIntro.vue';
    import CoinDescription from '@/components/markets/cryptocurrencies/coin/CoinDescription.vue';
    import CoinLinks from '@/components/markets/cryptocurrencies/coin/CoinLinks.vue';
    import CoinOverview from '@/components/markets/cryptocurrencies/coin/CoinOverview.vue';
    import CoinSupply from '@/components/markets/cryptocurrencies/coin/CoinSupply.vue';
    
    // Router
    import {useRoute} from 'vue-router';
    const route = useRoute();
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    import CoinDelta from '~/components/markets/cryptocurrencies/coin/CoinDelta.vue';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    // State
    const { coin, loading } = storeToRefs(CryptocurrenciesStore);
    // Methods
    const { getCoin } = CryptocurrenciesStore;
    
    onMounted(() => {
        getCoin(route.params.coin);
    });
</script>