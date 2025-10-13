<template>
    <div v-if='loading' class='flex items-center gap-4 mb-40'>
        <Spinner class='size-10 text-secondary' />
        
        <h4>Loading...</h4>
    </div>
</template>

<script setup>
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    import { Spinner } from '@/components/ui/spinner/index.js';
    const MarketStore = useMarketStore();
    
    // State
    const { loading } = storeToRefs(MarketStore);
</script>