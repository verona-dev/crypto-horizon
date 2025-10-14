<template>
    <div class='single-coin page'>
        <LoadingSpinner v-if='loading' />
        
        <div v-else>
            <Card
                v-if='coin && coin.livecoinwatch.name'
                class='bg-background border-none shadow-none flex flex-col items-center'
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
    import LoadingSpinner from '~/components/LoadingSpinner.vue';
    import { Card  } from '~/components/ui/card';
    
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