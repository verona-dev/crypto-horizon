<template>
    <LoadingContent v-if='loading' />
    
    <div v-else class='page'>
        <h6>Coming Soon...</h6>
        
        <div
            v-for='exchange in exchanges'
            :key='exchange.id'
        >
            <p>{{ exchange.id }}</p>
            <p>{{ exchange.country }}</p>
            <p>{{ exchange.description }}</p>
            <p>{{ exchange.image }}</p>
            <p>{{ exchange.name }}</p>
            <p>{{ exchange.trade_volume_24h_btc }}</p>
            <p>{{ exchange.trust_score }}</p>
            <p>{{ exchange.trust_score_rank }}</p>
            <p>{{ exchange.url }}</p>
            <p>{{ exchange.year_established }}</p>
        </div>
    </div>
</template>

<script setup>
    import LoadingContent from '~/components/LoadingContent.vue';
    
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { loading, exchanges } = storeToRefs(MarketStore);
    const { getExchanges } = MarketStore;
    
    // SEO
    const title = 'Crypto Exchanges: Ranked by Volume & Trust Score';
    const description = 'Compare crypto exchanges by trading volume, trust score, supported coins, fees, and more. Find the best CEX and DEX platforms for trading Bitcoin, Ethereum, and altcoins.';
    
    onMounted(async() => {
        if(!exchanges.value.length) await getExchanges();
    })
    
    definePageMeta({
        layout: 'market',
        title,
        description,
    });
</script>