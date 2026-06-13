<template>
    <div class='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-24 justify-items-center p-6 !h-full'>
        <!--  Market Cap  -->
        <div v-if='market_cap' class='item-container'>
            <MazCircularProgressBar
                :percentage='100'
                :duration='2000'
            >
                <template #default>
                    <h5>{{ market_cap_compact }}</h5>
                </template>
            </MazCircularProgressBar>
            
            <div class='label-container'>
                <div class='flex items-center'>
                    <Title :tag='3' :level='5' class='!min-w-full'>{{ glossary.market_cap.label }}</Title>
                    
                    <HoverCard :openDelay='200'>
                        <HoverCardTrigger>
                            <InfoIcon size='28' />
                        </HoverCardTrigger>
                        <HoverCardContent>{{ glossary.market_cap.description }}</HoverCardContent>
                    </HoverCard>
                </div>
                
                <span class='mt-2'>{{ market_cap_value }}</span>
            </div>
        </div>
        
        <!--  Fully Diluted Valuation  -->
        <div v-if='fully_diluted_valuation' class='item-container'>
            <MazCircularProgressBar
                :percentage='100'
                :duration='2500'
            >
                <template #default>
                    <h5>{{ fully_diluted_valuation_compact }}</h5>
                </template>
            </MazCircularProgressBar>
            
            <div class='label-container'>
                <div class='flex items-center'>
                    <Title :tag='3' :level='5' class='!min-w-full'>{{ glossary.fully_diluted_valuation.label }}</Title>
                    
                    <HoverCard :openDelay='200'>
                        <HoverCardTrigger>
                            <InfoIcon size='28' />
                        </HoverCardTrigger>
                        <HoverCardContent>{{ glossary.fully_diluted_valuation.description }}</HoverCardContent>
                    </HoverCard>
                </div>
                
                <span class='mt-2'>{{ fully_diluted_valuation_value }}</span>
            </div>
        </div>
        
        <!--  Volume 24h  -->
        <div v-if='volume' class='item-container'>
            <MazCircularProgressBar
                :percentage='100'
                :duration='3000'
            >
                <template #default>
                    <h5>{{ volume_compact }}</h5>
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
                
                <span class='mt-2'>{{ volume_value }}</span>
            </div>
        </div>
        
        <!--  Circulating Supply  -->
        <div v-if='circulating_supply' class='item-container'>
            <MazCircularProgressBar
                :percentage='circulating_supply_percentage'
                :duration='2000'
                suffix='%'
            >
                <template #default>
                    <h5 v-if='max_supply'>{{ Math.floor(circulating_supply_percentage) }}&#37;</h5>
                    <h5 v-else>{{ circulating_supply_compact }}</h5>
                </template>
            </MazCircularProgressBar>
            
            <div class='label-container'>
                <div class='flex items-center'>
                    <Title :tag='3' :level='5' class='!min-w-full'>{{ glossary.circulating_supply.label }}</Title>
                    
                    <HoverCard :openDelay='200' class='flex'>
                        <HoverCardTrigger>
                            <InfoIcon size='28' />
                        </HoverCardTrigger>
                        <HoverCardContent>{{ glossary.circulating_supply.description }}</HoverCardContent>
                    </HoverCard>
                </div>
                
                <span class='mt-2'>{{ circulating_supply_value }} {{ symbol }}</span>
            </div>
        </div>
        
        <!--  Total Supply  -->
        <div v-if='total_supply' class='item-container'>
            <MazCircularProgressBar
                :percentage='total_supply_percentage'
                :duration='2500'
                suffix='%'
            >
                <template #default>
                    <h5 v-if='max_supply'>{{ total_supply_percentage }}&#37;</h5>
                    <h5 v-else>{{ total_supply_compact }}</h5>
                </template>
            </MazCircularProgressBar>
            
            <div class='label-container'>
                <div class='flex items-center'>
                    <Title :tag='3' :level='5' class='!min-w-full'>{{ glossary.total_supply.label }}</Title>
                    
                    <HoverCard
                        :openDelay='200'
                        class='flex'
                    >
                        <HoverCardTrigger>
                            <InfoIcon size='28' />
                        </HoverCardTrigger>
                        <HoverCardContent>{{ glossary.total_supply.description }}</HoverCardContent>
                    </HoverCard>
                </div>
                
                <span class='mt-2'>{{ total_supply_value }} {{ symbol }}</span>
            </div>
        </div>
        
        <!--  Max Supply  -->
        <div v-if='max_supply' class='item-container'>
            <MazCircularProgressBar
                :percentage='100'
                :duration='3000'
            >
                <template #default>
                    <h5>{{ max_supply_compact }}</h5>
                </template>
            </MazCircularProgressBar>
            
            <div class='label-container'>
                <div class='flex items-center'>
                    <Title :tag='3' :level='5' class='!min-w-full'>{{ glossary.max_supply.label }}</Title>
                    
                    <HoverCard
                        :openDelay='200'
                        class='flex'
                    >
                        <HoverCardTrigger>
                            <InfoIcon size='28' />
                        </HoverCardTrigger>
                        <HoverCardContent>{{ glossary.max_supply.description }}</HoverCardContent>
                    </HoverCard>
                </div>
                
                <span class='mt-2'>{{ max_supply_value }} {{ symbol }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import InfoIcon from '~/components/InfoIcon.vue';
    import glossary from '~/assets/data/market/glossary.json';
    import Title from '~/components/Title.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            default: (() => {}),
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const market_data = computed(() => coin.value?.coingecko?.market_data);
    
    const market_cap = computed(() => market_data.value?.market_cap?.usd);
    const market_cap_value =formatNumber(market_cap.value);
    const market_cap_compact = computed(() => formatNumber(market_cap.value, {
        compact: true, decimals: 1
    }));
    
    const fully_diluted_valuation = computed(() => market_data.value?.fully_diluted_valuation?.usd);
    const fully_diluted_valuation_value = computed(() => formatNumber(fully_diluted_valuation.value));
    const fully_diluted_valuation_compact = computed(() => formatNumber(fully_diluted_valuation.value, {
        compact: true, decimals: 1
    }));
    
    const volume = computed(() => market_data.value?.total_volume?.usd);
    const volume_value = formatNumber(volume.value);
    const volume_compact = computed(() => formatNumber(volume.value, {
        compact: true, decimals: 1
    }));
    
    const circulating_supply = computed(() => market_data.value?.circulating_supply);
    const circulating_supply_value = computed(() => formatNumber(circulating_supply.value, {
        style: 'decimal',
    }));
    const circulating_supply_compact = computed(() => formatNumber(circulating_supply.value, {
        compact: true, style: 'decimal', decimals: 1
    }));
    const circulating_supply_percentage = computed(() => (circulating_supply.value / max_supply.value) * 100);
    
    const total_supply = computed(() =>  market_data.value?.total_supply);
    const total_supply_value = computed(() => formatNumber(total_supply.value, {
        style: 'decimal',
    }));
    const total_supply_compact = computed(() => formatNumber(total_supply.value, {
        compact: true, style: 'decimal', decimals: 1
    }));
    const total_supply_percentage = computed(() => Math.floor((total_supply.value / max_supply.value) * 100));
    
    const max_supply = computed(() => market_data.value?.max_supply);
    const max_supply_value = computed(() => formatNumber(market_data.value?.max_supply, {
        style: 'decimal',
    }));
    const max_supply_compact = computed(() => formatNumber(max_supply.value, {
        compact: true, style: 'decimal', decimals: 1
    }));
    
    const symbol = computed(() => coin.value?.symbol || coin.value?.name);
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