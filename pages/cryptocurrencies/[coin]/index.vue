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
            <div v-if='coin'>
                <h2>{{ coin.name }}</h2>
                <img :src='coin.png64' alt='logo'>
                <p>Rank: {{ coin.rank }}</p>
                <p>Price: {{ coin.rate }}</p>
                <p>Symbol {{ coin.symbol }}</p>
                <p>Created {{ coin.age }} days ago</p>
                <p>ATH {{ coin.allTimeHighUSD }}</p>
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