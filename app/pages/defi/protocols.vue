<template>
    <div class='page'>
        <PageLoadingSpinner v-if='loading' />
        
        <template v-else>
            <div>
<!--                <Title>Defi Protocols</Title>-->
                
                <ProtocolsTable :protocols='protocols'/>
            </div>
        </template>
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
    const title = 'DeFi Platforms: Lending, DEXs & Yield Aggregators';
    const description = 'Compare DeFi platforms by TVL, yields, risks, and chain support. Discover leading protocols like Aave, Uniswap, Compound, and emerging DeFi apps.';
    
    definePageMeta({
        title,
        description,
    });
    
    onMounted(async() => await getDefillamaProtocols());
</script>