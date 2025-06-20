<template>
    <div class='single-coin custom-flex'>
        <div
            v-if='loading'
            class='flex items-center'
        >
            <MazSpinner
                color='secondary'
                size='4em'
            />
            <h3 class='ml-4'>Loading...</h3>
        </div>
        
        <div v-else>
            <Card
                v-if='coin && coin?.name'
                class='w-7xl bg-card text-card-foreground flex flex-col gap-6 rounded-xl border my-10 py-6 shadow-sm'
            >
                <!--  Header  -->
                <CoinHeader
                    :coin='coin'
                    :activeSymbol='activeSymbol'
                />
                
                <!--  Links  -->
                <CoinLinks
                    v-if='coin.links'
                    :links='coin.links'
                />
                
                <!--  Supply  -->
                <CoinSupply :coin='coin' />
                
                <CardContent>
                    <p>Created {{ coin.age }} days ago</p>
                    <p>Market Cap: {{ coin.cap }}</p>
                    <p>ATH {{ coin.allTimeHighUSD }}</p>
                    <p>Circulating Supply: {{ coin.circulatingSupply }} {{ activeSymbol }}</p>
                    <p>Total Supply: {{ coin.totalSupply }}   {{ activeSymbol }}</p>
                    <p>Max Supply: {{ coin.maxSupply }}  {{ activeSymbol }}</p>
                </CardContent>
                
                <CardContent>
                    <p>Volume: {{ coin.volume }}</p>
                    <p>Hour change {{ coin.delta?.hour }}</p>
                    <p>Day change {{ coin.delta?.day }}</p>
                    <p>Week change {{ coin.delta?.week }}</p>
                    <p>Month change {{ coin.delta?.month }}</p>
                </CardContent>
                
                <CardContent>
                    <p>Markets {{ coin.markets }}</p>
                    <p>Pairs {{ coin.pairs }}</p>
                </CardContent>
            </Card>
        </div>
    </div>
</template>

<script setup>
    import CoinLinks from '@/components/markets/cryptocurrencies/coin/CoinLinks.vue';
    import CoinHeader from '@/components/markets/cryptocurrencies/coin/CoinHeader.vue';
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