<template>
    <div class='page'>
        <PageLoadingSpinner v-if='loading' />
        
        <GlobalDefi v-else />
    </div>
</template>

<script setup>
    import GlobalDefi from '~/components/market/GlobalDefi.vue';
    import PageLoadingSpinner from '@/components/PageLoadingSpinner.vue';
    
    // LoadingStore
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/LoadingStore.js';
    const LoadingStore = useLoadingStore();
    const { loading } = storeToRefs(LoadingStore);
    
    // DefiStore
    import { useDefiStore } from '~/stores/DefiStore.js';
    const DefiStore = useDefiStore();
    const { getCoingeckoGlobalDefi } = DefiStore;
    
    
    // SEO
    const title = 'Global DeFi - Your Complete Guide to Decentralized Finance';
    const description = 'Learn what Decentralized Finance (DeFi) is, how it works, key use cases like lending, borrowing, and yield farming, and why it’s transforming finance without banks.';
    
    definePageMeta({
        title,
        description,
    });
    
    onMounted(async() => await getCoingeckoGlobalDefi());
</script>