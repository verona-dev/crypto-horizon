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
                
                <CardContent>
                    <p>Created {{ coin.age }} days ago</p>
                    <p>All-time high {{ coin.allTimeHighUSD }}</p>
                    <p>Markets {{ coin.markets }}</p>
                    <p>Pairs {{ coin.pairs }}</p>
                    <p>Exchanges {{ coin.exchanges }}</p>
                    <p>Market Cap {{ coin.marketCapFormatted }}</p>
                </CardContent>
                
                <Separator />
                
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
    import CoinSupply from '~/components/markets/cryptocurrencies/coin/CoinSupply.vue';
    
    // Router
    import {useRoute} from 'vue-router';
    const route = useRoute();
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
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