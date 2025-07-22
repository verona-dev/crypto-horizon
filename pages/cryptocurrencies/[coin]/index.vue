<template>
    <div class='single-coin custom-flex'>
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
                class='2xl:max-w-[1500px] bg-background border-none flex flex-col rounded-none'
            >
                <!--  Header  -->
                <CoinHeader :coin='coin' />
                
                <!--  Intro + Chart + Links  -->
                <CoinBody :coin='coin'/>
                
                <!--  Supply  -->
                <CoinSupply :coin='coin.livecoinwatch' />
                
                <Separator class='my-4' />
                
                <!--  Info  -->
                <CoinFooter :coin='coin' />
            </Card>
        </div>
    </div>
</template>

<script setup>
    import CoinHeader from '@/components/markets/cryptocurrencies/coin/CoinHeader.vue';
    import CoinBody from '~/components/markets/cryptocurrencies/coin/CoinBody.vue';
    import CoinSupply from '@/components/markets/cryptocurrencies/coin/CoinSupply.vue';
    import CoinFooter from '~/components/markets/cryptocurrencies/coin/CoinFooter.vue';
    
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
    const { getCoin } = CryptocurrenciesStore;
    
    onMounted(() => {
        getCoin(route.params.coin);
    });
</script>