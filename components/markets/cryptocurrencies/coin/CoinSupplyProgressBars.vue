<template>
    <MazAnimatedElement
        direction='up'
        :duration='2000'
        class=''
    >
        <div class='flex flex-wrap items-start justify-evenly pt-6 pb-20'>
            <!--  Market Cap  -->
            <div v-if='marketCap' class='progress-bar-container'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='2500'
                    size='125px'
                >
                    <template #default>
                        <p>{{ formatNumber(marketCap, { compact: true, decimals: 2 }) }}</p>
                    </template>
                </MazCircularProgressBar>
                
                <div class='ml-6 flex flex-col'>
                    <div class='flex items-start'>
                        <h6>Market Cap</h6>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>
                                    The total market value of a cryptocurrency's circulating supply.
                                    It is analogous to the free-float capitalization in the stock market.
                                    Market cap = Current price x Circulating supply.
                                </span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ formatNumber(marketCap) }}</span>
                </div>
            </div>
            
            <!--  Max Supply  -->
            <div v-if='maxSupply' class='progress-bar-container'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='2500'
                    size='125px'
                >
                    <template #default>
                        <p>{{ formatNumber(maxSupply, { compact: true, style: 'decimal' }) }}</p>
                    </template>
                </MazCircularProgressBar>
                
                <div class='ml-6 flex flex-col'>
                    <div class='flex items-start'>
                        <h6>Max Supply</h6>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>The best approximation of the maximum amount of coins that will exist in the forthcoming
                                   lifespan of the cryptocurrency, minus any coins that have been verifiably burned. This is
                                   also known as the theoretical max number of coins that can be minted, minus any coins
                                   that have been verifiably burned.
                                </span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ formatNumber(maxSupply, { style: 'decimal' }) }} {{ symbol }}</span>
                </div>
            </div>
            
            <!--  Total Supply  -->
            <div v-if='totalSupply' class='progress-bar-container'>
                <MazCircularProgressBar
                    :percentage='totalSupplyPercentage'
                    :duration='3000'
                    suffix='%'
                    size='125px'
                >
                    <template #default>
                        <p v-if='maxSupply'>{{ Math.floor(totalSupplyPercentage) }}&#37;</p>
                        <p v-else>{{ formatNumber(totalSupply, { compact: true, style: 'decimal', decimals: 2  }) }}</p>
                    </template>
                </MazCircularProgressBar>
                
                <div class='ml-6 flex flex-col'>
                    <div class='flex items-start'>
                        <h6>Total Supply</h6>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                            <span class='text-sm'>
                                Total supply = Total coins created - coins that have been burned (if any)
                                It is comparable to outstanding shares in the stock market.
                            </span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ formatNumber(totalSupply, { style: 'decimal' }) }} {{ symbol }}</span>
                </div>
            </div>
            
            <!--  Circulating Supply  -->
            <div v-if='circulatingSupply' class='progress-bar-container'>
                <MazCircularProgressBar
                    :percentage='circulatingSupplyPercentage'
                    :duration='3000'
                    suffix='%'
                    size='125px'
                >
                    <template #default>
                        <p v-if='maxSupply'>{{ Math.floor(circulatingSupplyPercentage) }}&#37;</p>
                        <p v-else>{{ formatNumber(circulatingSupply, { compact: true, style: 'decimal', decimals: 2  }) }}</p>
                    </template>
                </MazCircularProgressBar>
                
                <div class='ml-6 flex flex-col'>
                    <div class='flex items-start'>
                        <h6>Circulating Supply</h6>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                            <span class='text-sm'>
                                The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.
                            </span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ formatNumber(circulatingSupply, { style: 'decimal' }) }} {{ symbol }}</span>
                </div>
            </div>
            
            <!--  Volume 24h  -->
            <div v-if='volume' class='progress-bar-container'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='3500'
                    size='125px'
                >
                    <template #default>
                        <p>{{ formatNumber(volume, { compact: true, decimals: 2 }) }}</p>
                    </template>
                </MazCircularProgressBar>
                
                <div class='ml-6 flex flex-col'>
                    <div class='flex items-start'>
                        <h6>Volume 24h</h6>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>A measure of how much of a cryptocurrency was traded in the last 24 hours.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ formatNumber(volume) }}</span>
                </div>
            </div>
            
            <!--  Liquidity 24h  -->
            <div v-if='liquidity' class='progress-bar-container'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='3500'
                    size='125px'
                >
                    <template #default>
                        <p>{{ formatNumber(liquidity, { compact: true, decimals: 2 }) }}</p>
                    </template>
                </MazCircularProgressBar>
                
                <div class='ml-6 flex flex-col'>
                    <div class='flex items-start'>
                        <h6>Liquidity 24h</h6>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>
                                    How easily you can buy or sell a cryptocurrency without significantly affecting its price.
                                    A ±2% orderbook depth.
                                </span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ formatNumber(liquidity) }}</span>
                </div>
            </div>
        </div>
    </MazAnimatedElement>
</template>

<script setup>
    import {
        HoverCard,
        HoverCardContent,
        HoverCardTrigger,
    } from '@/components/ui/hover-card';
    import { formatNumber } from '~/utils/formatUtils.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            default: (() => {}),
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    
    const marketCap = computed(() => coin.value?.marketCap);
    const maxSupply = computed(() => coin.value?.maxSupply);
    
    const totalSupply = computed(() => coin.value?.totalSupply);
    const totalSupplyPercentage = computed(() => (coin.value?.totalSupply / coin.value?.maxSupply) * 100);
    
    const circulatingSupply = computed(() => coin.value?.circulatingSupply);
    const circulatingSupplyPercentage = computed(() => (coin.value?.circulatingSupply / coin.value?.maxSupply) * 100);
    
    const volume = computed(() => coin.value?.volume);
    const liquidity = computed(() => coin.value?.liquidity);
    
    const symbol = computed(() => coin.value?.symbol || coin.value?.name);
</script>

<style scoped>
    a {
        color: var(--maz-color-muted);
    }
</style>