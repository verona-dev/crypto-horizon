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
                class='lg:w-7xl bg-card text-card-foreground flex flex-col gap-6 rounded-xl border my-10 py-6 shadow-sm'
            >
                <!--  Header  -->
                <CoinHeader
                    :coin='coin'
                    :activeSymbol='activeSymbol'
                />
                
                <CardContent class='my-6 flex justify-evenly'>
                    <!--  Market Cap Progress  -->
                    <CoinMarketCap :marketCap='coin.marketCap'/>
                    
                    <!--  Overview Table  -->
                    <CoinOverview :coin='coin' />
                </CardContent>
                
                <Separator class='my-4' />
                
                <!--  Links  -->
                <CoinLinks
                    v-if='coin.links'
                    :links='coin.links'
                />
                
                <!--  Supply  -->
                <CoinSupply :coin='coin' />
            </Card>
        </div>
    </div>
</template>

<script setup>
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