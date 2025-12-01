<template>
    <div class='defi' v-if='globalDefi'>
        <GlobalDefi />
    </div>
</template>

<script setup>
    import GlobalDefi from '~/components/market/GlobalDefi.vue';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { globalDefi } = storeToRefs(MarketStore);
    const { getCoingeckoGlobalDefi } = MarketStore;
    
    // SEO
    const route = useRoute();
    const config = useRuntimeConfig();
    
    const title = 'What is DeFi? Your Complete Guide to Decentralized Finance';
    const description = 'Learn what Decentralized Finance (DeFi) is, how it works, key use cases like lending, borrowing, and yield farming, and why it’s transforming finance without banks.';
    const url = computed(() => `${config.public.site_url}${route.path}`);
    const keywords = 'what is DeFi, DeFi explained, decentralized finance, DeFi basics, how DeFi works, DeFi vs CeFi, DeFi lending, yield farming, liquidity pools, DeFi risks, smart contracts, blockchain finance, crypto lending, DeFi applications';
    
    useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        ogUrl: url,
        keywords,
    });
    
    onMounted(() => getCoingeckoGlobalDefi());
</script>