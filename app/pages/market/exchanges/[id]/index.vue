<template>
    <div class='page'>
        this is single exchange page
        
        <PageLoadingSpinner v-if='loading' />
        
        <template v-else>
            {{ exchange.id }}
        </template>
    </div>
</template>

<script setup>
    import { Card  } from '~/components/ui/card';
    import PageLoadingSpinner from '@/components/PageLoadingSpinner.vue';
    
    // Router
    const route = useRoute();
    
    // LoadingStore
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/LoadingStore.js';
    const LoadingStore = useLoadingStore();
    const { loading } = storeToRefs(LoadingStore);
    
    // MarketStore
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getExchange } = MarketStore;
    
    // State
    const { exchange } = storeToRefs(MarketStore);
    const id = computed(() => route.params?.id);
    
    onMounted(async() => {
        await getExchange(id.value);
        console.log(id.value);
    });
</script>