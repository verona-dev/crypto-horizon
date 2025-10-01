<template>
    <Card class='!w-fit bg-accent-foreground flex flex-col gap-4 shadow-2xl p-6' v-if='globalDefi'>
        <h4>Defi</h4>
        
        <CardContent>
            Dominance:
            <span>{{ defi_dominance }}</span>
        </CardContent>
        
        <CardContent>
            Market Cap:
            <span>{{ defi_market_cap }}</span>
        </CardContent>
        
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    import { CardContent } from '~/components/ui/card/index.js';
    const MarketStore = useMarketStore();
    
    const { globalDefi } = storeToRefs(MarketStore);
    console.log(JSON.parse(JSON.stringify(globalDefi.value)));
    
    const defi_dominance = computed(() => formatNumber(globalDefi.value?.defi_dominance, {
        style: 'percent', decimals: 2
    }));
    const defi_market_cap = computed(() => formatNumber(globalDefi.value?.defi_market_cap, {
        compact: true, decimals: 2
    }));
    console.log(defi_dominance.value);
</script>

<style scoped>
    [data-slot='card-content'] {
        //display: flex !important;
        //flex-direction: column !important;
        //align-items: center !important;
    }
</style>