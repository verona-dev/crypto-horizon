<template>
    <div class='page market'>
        <PageLoadingSpinner v-if='loading' />
        
        <ProtocolsTable v-else :protocols='protocols'/>
    </div>
</template>

<script setup>
    import PageLoadingSpinner from '~/components/PageLoadingSpinner.vue';
    import ProtocolsTable from '~/components/defi/ProtocolsTable.vue';
    import Title from '~/components/Title.vue';
    
    // LoadingStore
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/LoadingStore.js';
    const LoadingStore = useLoadingStore();
    const { loading } = storeToRefs(LoadingStore);
    
    // DefiStore
    import { useDefiStore } from '~/stores/DefiStore.js';
    const DefiStore = useDefiStore();
    const { getDefillamaProtocols } = DefiStore;
    const { protocols } = storeToRefs(DefiStore);
    
    // SEO
    const title = 'DeFi Protocols: Lending, DEXs & Yield Aggregators, Live TVL Data & Chain-Specific Metrics';
    const description = 'Compare DeFi protocols by TVL, yields, risks, and chain support. Stay updated on the fastest-growing projects in decentralized finance like Aave, Uniswap, Compound, and emerging DeFi apps.';
    
    definePageMeta({
        title,
        description,
    });
    
    onMounted(async() => await getDefillamaProtocols());
</script>