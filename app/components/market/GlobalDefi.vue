<template>
    <div
        v-if='globalDefi'
        class='flex flex-col gap-4 p-6'
    >
        <Title :tag='2' :level='5'>Defi Stats</Title>
        
        <div class='flex flex-col gap-16'>
            <div>
                Dominance:
                <span>{{ defi_dominance }}</span>
            </div>
            
            <!--  Market Cap  -->
            <Card v-if='defi_market_cap' class='item-container !w-fit p-12'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='2000'
                >
                    <template #default>
                        <Title :tag='2' :level='5'>{{ market_cap_compact }}</Title>
                    </template>
                </MazCircularProgressBar>
                
                <CardContent class='label-container'>
                    <div class='flex items-center gap-1.5'>
                        <Title :tag='3' :level='5'>Defi {{ glossary.market_cap.label }}</Title>
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger>
                                <InfoIcon size='20' />
                            </HoverCardTrigger>
                            <HoverCardContent>{{ glossary.market_cap.description }}</HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ market_cap_value }}</span>
                </CardContent>
            </Card>
            
            <div>
                Trading Volume (24h):
                <span>{{ trading_volume_24h }}</span>
            </div>
        </div>
        
        <Card>
            <div>
                Defi to ETH Ratio:
                <span>{{ defi_to_eth_ratio }}</span>
            </div>
            
            <div>
                ETH Market Cap:
                <span>{{ eth_market_cap }}</span>
            </div>
        </Card>
        
        <Card>
            <div>
                Top Coin:
                <span>{{ top_coin_name }}</span>
            </div>
            
            <div>
                Top Coin Dominance:
                <span>{{ top_coin_defi_dominance }}</span>
            </div>
        </Card>
    </div>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import Title from '~/components/Title.vue';
    import { Card, CardContent } from '~/components/ui/card';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import InfoIcon from '~/components/InfoIcon.vue';
    import glossary from '~/assets/data/market/glossary.json';
    
    // Market Store
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { globalDefi } = storeToRefs(MarketStore);
    
    const defi_dominance = computed(() => formatNumber(globalDefi.value?.defi_dominance, {
        style: 'percent',
    }));
    
    // Market Cap
    const defi_market_cap = computed(() => globalDefi.value?.defi_market_cap);
    const market_cap_value =formatNumber(defi_market_cap.value);
    const market_cap_compact = computed(() => formatNumber(defi_market_cap.value, {
        compact: true, decimals: 1
    }));
    
    const defi_to_eth_ratio = computed(() => formatNumber(globalDefi.value?.defi_to_eth_ratio, {
        style: 'percent',
    }));
    
    const eth_market_cap = computed(() => formatNumber(globalDefi.value?.eth_market_cap, {
        compact: true,
    }));
    
    const top_coin_name = computed(() => globalDefi.value?.top_coin_name);
    const top_coin_defi_dominance = computed(() => formatNumber(globalDefi.value?.top_coin_defi_dominance, {
        style: 'percent',
    }));
    
    const trading_volume_24h = computed(() => formatNumber(globalDefi.value?.trading_volume_24h, {
        compact: true,
    }));
</script>

<style>
    .item-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        
        @media (min-width: 768px) {
            width: 200px;
        }
        
        /* Desktop */
        @media (min-width: 1024px) {
            width: 250px;
        }
        
        .label-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
</style>