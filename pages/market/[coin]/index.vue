<template>
    <div class='single-coin bg-background custom-flex'>
        <div v-if='loading' class='flex items-center h-[55vh]'>
            <MazSpinner
                color='secondary'
                size='3em'
            />
            <h4 class='ml-4 mb-0'>Loading...</h4>
        </div>
        
        <div v-else>
            <Card
                v-if='coin && coin.livecoinwatch.name'
                class='bg-background flex flex-col pb-40 mb-40'
            >
                <CoinHeader :coin='coin' />
                
                <CoinBody :coin='coin'/>
                
                <CoinFooter :coin='coin' />
            </Card>
        </div>
    </div>
</template>

<script setup>
    import CoinHeader from '~/components/market/coin/CoinHeader.vue';
    import CoinBody from '~/components/market/coin/CoinBody.vue';
    import CoinFooter from '~/components/market/coin/CoinFooter.vue';
    
    // Router
    import { useRoute } from 'vue-router';
    const route = useRoute();
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // State
    const { coin, loading } = storeToRefs(MarketStore);
    // Methods
    const { getCoin } = MarketStore;
    
    onMounted(async() => {
        await getCoin(route.params.coin);
    });
</script>