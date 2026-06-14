<template>
    <div
        v-if='globalDefi'
        class='flex flex-col gap-24 max-w-5xl'
    >
        <div class='flex flex-col gap-8'>
            <Title class='self-center'>Global DeFi Stats</Title>
            
            <!--  Defi Dominance -->
            <Card class='item-container border-primary/25 justify-between !w-full'>
                <Title :tag='3' :level='5' class='mt-0'>Defi Dominance</Title>
                
                <Progress
                    v-if='defi_dominance_ratio'
                    v-model='defi_dominance_ratio'
                    class='h-3'
                />
                
                <Title :tag='3' :level='3' class='!my-0 text-primary'>{{ defi_dominance_ratio_percent }}</Title>
            </Card>
            
            <div class='flex flex-wrap justify-center gap-8'>
                <!--  Market Cap  -->
                <Card v-if='defi_market_cap' class='item-container flex-1 border-primary/25'>
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
                        
                        <span class='mt-2 text-muted-foreground'>{{ market_cap_value }}</span>
                    </CardContent>
                </Card>
                
                <!--  Volume 24h  -->
                <Card v-if='trading_volume_24h' class='item-container flex-1 border-primary/25'>
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
                                    <InfoIcon size='20' />
                                </HoverCardTrigger>
                                <HoverCardContent>{{ glossary.volume.description }}</HoverCardContent>
                            </HoverCard>
                        </div>
                        
                        <span class='mt-2 text-muted-foreground'>{{ trading_volume_value }}</span>
                    </div>
                </Card>
            </div>
        </div>
        
        <div class='flex flex-col gap-8'>
            <Title class='self-center'>Top Coin Stats</Title>
            
            <!--  Top coin dominance -->
            <Card class='item-container border-primary/25 justify-between !w-full'>
                <Title :tag='3' :level='5' class='mt-0'>Top Coin Dominance</Title>
                
                <Title :tag='3' :level='6' class='!my-0 uppercase'>{{ top_coin_name }}</Title>
                
                <Title :tag='3' :level='3' class='!my-0 text-primary'>{{ top_coin_defi_dominance }}</Title>
            
            </Card>
            
            <div class='flex flex-wrap justify-center gap-8'>
                <!--  Defi to Eth ratio  -->
                <Card class='item-container flex-1 border-primary/25'>
                    <Title :tag='3' :level='5' class='mt-0'>Defi to Eth ratio</Title>
                    
                    <MazCircularProgressBar :percentage="defi_to_eth_ratio"  suffix="%" />
                </Card>
                
                <!--  Eth Market Cap  -->
                <Card v-if='defi_market_cap' class='item-container flex-1 border-primary/25'>
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
                        
                        <span class='mt-2 text-muted-foreground'>{{ eth_market_cap_value }}</span>
                    </CardContent>
                </Card>
            </div>
        </div>
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
    import MazCircularProgressBar from 'maz-ui/components/MazCircularProgressBar';
    
    // Market Store
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { globalDefi } = storeToRefs(MarketStore);
    
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
    
    // Defi Dominance
    const defi_dominance = computed(() => globalDefi.value?.defi_dominance);
    console.log(defi_dominance.value);
    const defi_dominance_ratio = computed(() => Number(defi_dominance.value));
    const defi_dominance_ratio_percent = formatNumber(defi_dominance.value, {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }) || 0;
    
    // Defi to Eth ratio
    const defi_to_eth = computed(() => globalDefi.value?.defi_to_eth_ratio);
    const defi_to_eth_ratio = computed(() => Number(defi_to_eth.value));
    
    // Top Coin
    const top_coin_name = computed(() => globalDefi.value?.top_coin_name);
    const top_coin_defi_dominance = computed(() => formatNumber(globalDefi.value?.top_coin_defi_dominance, {
        style: 'percent',
    }));
</script>

<style scoped>
    .item-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 48px !important;
        
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