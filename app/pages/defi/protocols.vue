<template>
    <div class='page'>
        <Title>Defi Platforms</Title>
        <h6>Coming Soon...</h6>
    </div>
</template>

<script setup>
    import Title from '~/components/Title.vue';
    
    // DefiStore
    import { useDefiStore } from '~/stores/DefiStore.js';
    const DefiStore = useDefiStore();
    const { getCoingeckoGlobalDefi } = DefiStore;
    
    // SEO
    const title = 'DeFi Platforms: Lending, DEXs & Yield Aggregators';
    const description = 'Compare DeFi platforms by TVL, yields, risks, and chain support. Discover leading protocols like Aave, Uniswap, Compound, and emerging DeFi apps.';
    
    definePageMeta({
        title,
        description,
    });
</script>