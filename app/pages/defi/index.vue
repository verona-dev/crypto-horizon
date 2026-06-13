<template>
    <LoadingContent v-if='loading' />
    
    <div v-else class='page'>
        <Title>DeFi Market Data</Title>
        
        <GlobalDefi />
    </div>
</template>

<script setup>
    import GlobalDefi from '~/components/market/GlobalDefi.vue';
    import LoadingContent from '~/components/LoadingContent.vue';
    import Title from '~/components/Title.vue';
    
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { loading, globalDefi } = storeToRefs(MarketStore);
    const { getCoingeckoGlobalDefi } = MarketStore;
    
    // SEO
    const title = 'Global DeFi? Your Complete Guide to Decentralized Finance';
    const description = 'Learn what Decentralized Finance (DeFi) is, how it works, key use cases like lending, borrowing, and yield farming, and why it’s transforming finance without banks.';
    
    definePageMeta({
        title,
        description,
    });
    
    onMounted(() => getCoingeckoGlobalDefi());
</script>