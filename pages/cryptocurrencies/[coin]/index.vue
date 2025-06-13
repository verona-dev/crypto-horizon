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
            <div v-if='coin?.name'>
                <div class='flex items-center'>
                    <h2>{{ coin.name }}</h2>
                    <h2>&nbsp;{{ coin.symbol }}</h2>
                        <MazBadge
                            color='gray'
                            size='1rem'
                            rounded-size='lg'
                            outline
                            class='ml-4'
                        >
                            #{{ coin.rank }}
                        </MazBadge>
                </div>
                
                <img :src='coin.png64' alt='logo'>
                <h3>Price: {{ coin.rate }}</h3>
                <p>Created {{ coin.age }} days ago</p>
                <p>Market Cap: {{ coin.cap }}</p>
                <p>ATH {{ coin.allTimeHighUSD }}</p>
                <p>Circulating Supply: {{ coin.circulatingSupply }}</p>
                <p>Total Supply: {{ coin.totalSupply }}</p>
                <p>Max Supply: {{ coin.maxSupply }}</p>
                <p>Volume: {{ coin.volume }}</p>
                <p>Hour change {{ coin.delta?.hour }}</p>
                <p>Day change {{ coin.delta?.day }}</p>
                <p>Week change {{ coin.delta?.week }}</p>
                <p>Month change {{ coin.delta?.month }}</p>
                <p>Markets {{ coin.markets }}</p>
                <p>Pairs {{ coin.pairs }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    // Router
    import {useRoute} from 'vue-router';
    const route = useRoute();
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    // State
    const { coin, loading } = storeToRefs(CryptocurrenciesStore);
    // Methods
    const { setActiveCoin } = CryptocurrenciesStore;
    
    onMounted(() => {
        setActiveCoin(route.params.coin);
    });
</script>

<style>
    .single-coin {
    
    }
</style>