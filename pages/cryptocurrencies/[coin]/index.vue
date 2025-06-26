<template>
    <div class='single-coin custom-flex'>
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
                v-if='coin && coin?.name'
                class='lg:w-6xl bg-card text-card-foreground flex flex-col gap-6 rounded-xl border my-10 py-6 shadow-sm'
            >
                <!--  Header  -->
                <CoinHeader
                    :coin='coin'
                    :activeSymbol='activeSymbol'
                />
                
                <CardContent class='px-20 my-10 flex justify-around'>
                    <div class='left'>
                        <!--  Links  -->
                        <CoinLinks
                            v-if='coin.links'
                            :links='coin.links'
                        />
                    </div>
                    
                    <div class='right flex flex-col'>
                        <!--  Market Cap Progress  -->
                        <CoinMarketCap :marketCap='coin.marketCap'/>
                        
                        <!--  Overview Table  -->
                        <CoinOverview
                            :coin='coin'
                            class='my-20'
                        />
                        
                        <!--  Converter  -->
                        <CoinConverter
                            :coin='coin'
                            :activeSymbol='activeSymbol'
                        />
                    </div>
                </CardContent>
                
                <Separator class='my-4' />
                
                <!--  Delta  -->
                <CoinDelta :coin='coin' />
                
                <!--  Supply  -->
                <CoinSupply :coin='coin' />
            </Card>
        </div>
    </div>
</template>

<script setup>
    import CoinConverter from '~/components/markets/cryptocurrencies/coin/CoinConverter.vue';
    import CoinDelta from '~/components/markets/cryptocurrencies/coin/CoinDelta.vue';
    import CoinHeader from '@/components/markets/cryptocurrencies/coin/CoinHeader.vue';
    import CoinLinks from '@/components/markets/cryptocurrencies/coin/CoinLinks.vue';
    import CoinOverview from '@/components/markets/cryptocurrencies/coin/CoinOverview.vue';
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
    const activeSymbol = computed(() => route.params.coin);
    // Methods
    const { setActiveCoin } = CryptocurrenciesStore;
    
    onMounted(() => {
        setActiveCoin(route.params.coin);
    });
</script>