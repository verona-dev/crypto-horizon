<template>
    <section class='single-coin max-w-7xl'>
        <div v-if='loading' class='flex items-center gap-4'>
            <Spinner class='size-10 text-secondary' />

            <h4>Loading...</h4>
        </div>
        
        <div v-else>
            <Card
                v-if='coin && coin.livecoinwatch.name'
                class='bg-background border-none flex flex-col items-center gap-4'
            >
                <CoinHeader :coin='coin' />
                
                <CoinBody :coin='coin'/>
                
                <CoinFooter :coin='coin' />
            </Card>
        </div>
    </section>
</template>

<script setup>
    import CoinHeader from '~/components/market/coin/CoinHeader.vue';
    import CoinBody from '~/components/market/coin/CoinBody.vue';
    import CoinFooter from '~/components/market/coin/CoinFooter.vue';
    import { Spinner } from '~/components/ui/spinner';
    
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