<template>
    <Card class='!w-fit bg-accent-foreground flex flex-col gap-4 shadow-2xl p-6' v-if='globalDefi'>
        this is global Defi
    </Card>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { globalDefi } = storeToRefs(MarketStore);
</script>