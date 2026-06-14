<template>
    <div
        v-if='globalDefi'
        class='flex flex-col gap-4 p-6'
    >
        <Title :tag='2' :level='5'>Defi Stats</Title>
        
        <div>
            Dominance:
            <span>{{ defi_dominance }}</span>
        </div>
        
        <div class='flex flex-wrap gap-16'>
            <!--  Market Cap  -->
            <Card v-if='defi_market_cap' class='item-container p-12'>
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
            
            <!--  Volume 24h  -->
            <Card v-if='trading_volume_24h' class='item-container p-12'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='3000'
                >
                    <template #default>
                        <h5>{{ trading_volume_compact }}</h5>
                    </template>
                </MazCircularProgressBar>
                
                <div class='label-container'>
                    <div class='flex items-center'>
                        <Title :tag='3' :level='5' class='!min-w-full'>{{ glossary.volume.label }}</Title>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger>
                                <InfoIcon size='28' />
                            </HoverCardTrigger>
                            <HoverCardContent>{{ glossary.volume.description }}</HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ trading_volume_value }}</span>
                </div>
            </Card>
            
            <!--  Eth Market Cap  -->
            <Card v-if='defi_market_cap' class='item-container p-12'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='2000'
                >
                    <template #default>
                        <Title :tag='2' :level='5'>{{ eth_market_cap_compact }}</Title>
                    </template>
                </MazCircularProgressBar>
                
                <CardContent class='label-container'>
                    <div class='flex items-center gap-1.5'>
                        <Title :tag='3' :level='5'>ETH {{ glossary.market_cap.label }}</Title>
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger>
                                <InfoIcon size='20' />
                            </HoverCardTrigger>
                            <HoverCardContent>{{ glossary.market_cap.description }}</HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ eth_market_cap_value }}</span>
                </CardContent>
            </Card>
            
            <!--  Defi to Eth ratio  -->
            <Card class='item-container p-12 !gap-2'>
                <Title :tag='3' :level='5'>Defi to Eth ratio {{ defi_to_eth_ratio_percent }}</Title>
                
                <Progress
                    v-if='defi_to_eth_ratio'
                    v-model='defi_to_eth_ratio'
                    class='h-3'
                />
            </Card>
        </div>
        
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
    import { Progress } from '~/components/ui/progress';
    
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
    
    // Trading Volume
    const trading_volume_24h = computed(() => globalDefi.value?.trading_volume_24h);
    const trading_volume_value = formatNumber(trading_volume_24h.value);
    const trading_volume_compact = computed(() => formatNumber(trading_volume_24h.value, {
        compact: true, decimals: 1
    }));
    
    // Eth Market Cap
    const eth_market_cap = computed(() => globalDefi.value?.eth_market_cap);
    const eth_market_cap_value =formatNumber(eth_market_cap.value);
    const eth_market_cap_compact = computed(() => formatNumber(eth_market_cap.value, {
        compact: true, decimals: 1
    }));
    
    // Defi to Eth ratio
    const defi_to_eth = computed(() => globalDefi.value?.defi_to_eth_ratio);
    const defi_to_eth_ratio = computed(() => Number(defi_to_eth.value));
    const defi_to_eth_ratio_percent = formatNumber(defi_to_eth.value, {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }) || 0;
    
    
    
    const top_coin_name = computed(() => globalDefi.value?.top_coin_name);
    const top_coin_defi_dominance = computed(() => formatNumber(globalDefi.value?.top_coin_defi_dominance, {
        style: 'percent',
    }));
</script>

<style>
    .item-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        border: 0.1px solid var(--primary);
        width: 360px !important;
        
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