<template>
    <Card class='!w-fit flex flex-col gap-4 p-6' v-if='globalDefi'>
        <h4>Defi</h4>
        
        <CardContent>
            Dominance:
            <span>{{ defi_dominance }}</span>
        </CardContent>
        
        <CardContent>
            Market Cap:
            <span>{{ defi_market_cap }}</span>
        </CardContent>
        
        <CardContent>
            Defi to ETH Ratio:
            <span>{{ defi_to_eth_ratio }}</span>
        </CardContent>
        
        <CardContent>
            ETH Market Cap:
            <span>{{ eth_market_cap }}</span>
        </CardContent>
        
        <CardContent>
            Top Coin:
            <span>{{ top_coin_name }}</span>
        </CardContent>
        
        <CardContent>
            Top Coin Dominance:
            <span>{{ top_coin_defi_dominance }}</span>
        </CardContent>
        
        <CardContent>
            Trading Volume (24h):
            <span>{{ trading_volume_24h }}</span>
        </CardContent>
        
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '../../../stores/MarketStore.js';
    import { CardContent } from '~/components/ui/card/index.js';
    const MarketStore = useMarketStore();
    
    const { globalDefi } = storeToRefs(MarketStore);
    
    const defi_dominance = computed(() => formatNumber(globalDefi.value?.defi_dominance, {
        style: 'percent', decimals: 2
    }));
    const defi_market_cap = computed(() => formatNumber(globalDefi.value?.defi_market_cap, {
        compact: true, decimals: 2
    }));
    const defi_to_eth_ratio = computed(() => formatNumber(globalDefi.value?.defi_to_eth_ratio, {
        style: 'percent', decimals: 2
    }));
    const eth_market_cap = computed(() => formatNumber(globalDefi.value?.eth_market_cap, {
        compact: true, decimals: 2
    }));
    const top_coin_name = computed(() => globalDefi.value?.top_coin_name);
    const top_coin_defi_dominance = computed(() => formatNumber(globalDefi.value?.top_coin_defi_dominance, {
        style: 'percent', decimals: 2
    }));
    const trading_volume_24h = computed(() => formatNumber(globalDefi.value?.trading_volume_24h, {
        compact: true, decimals: 2
    }));
</script>

<style scoped>
    [data-slot='card-content'] {
        //display: flex !important;
        //flex-direction: column !important;
        //align-items: center !important;
    }
</style>