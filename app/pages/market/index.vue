<template>
    <div class='market page flex flex-col items-center justify-center gap-20'>
        <Meteors v-if='dark_mode' :count="30" />
        
        <h1 class='page-title'>Crypto Market</h1>
        
        <div class='flex flex-col xl:flex-row items-center justify-center gap-12 w-screen max-w-7xl'>
            <MarketFearGreed />
            <MarketDominance />
        </div>
        
        <CoinsTable />
    </div>
</template>

<script setup>
    import MarketFearGreed from '~/components/market/MarketFearGreed.vue';
    import MarketDominance from '~/components/market/MarketDominance.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
    import { Meteors } from '@/components/ui/meteors/index.js';
    
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getFearAndGreed } = MarketStore;
    
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
    
    onMounted(() => {
        getFearAndGreed();
    });
</script>