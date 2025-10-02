<template>
    <div v-if='fear_and_greed' class='fear-and-greed'>
        {{ fear_and_greed }}
    </div>
</template>

<script setup>
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { getCmcFearAndGreed } = MarketStore;
    
    const fear_and_greed = toRef(MarketStore.globalMarket, 'fearAndGreed');
    
    onMounted(() => getCmcFearAndGreed());
</script>