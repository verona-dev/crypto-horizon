<template>
    <MazAnimatedElement
        direction='up'
        :duration='2000'
        class=''
    >
        <div class='flex flex-wrap items-start justify-evenly pt-6 pb-20'>
            <!--  Market Cap  -->
            <div v-if='market_cap' class='progress-bar-container'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='2500'
                    size='125px'
                >
                    <template #default>
                        <p>{{ market_cap_bar_label }}</p>
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
                    
                    <span class='mt-2'>{{ market_cap_label }}</span>
                </div>
            </div>
            
            <!--  Max Supply  -->
            <div v-if='max_supply' class='progress-bar-container'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='2500'
                    size='125px'
                >
                    <template #default>
                        <p>{{ max_supply_bar_label }}</p>
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
                    
                    <span class='mt-2'>{{ max_supply_label }} {{ symbol }}</span>
                </div>
            </div>
            
            <!--  Total Supply  -->
            <div v-if='total_supply' class='progress-bar-container'>
                <MazCircularProgressBar
                    :percentage='total_supply_percentage'
                    :duration='3000'
                    suffix='%'
                    size='125px'
                >
                    <template #default>
                        <p v-if='max_supply'>{{ Math.floor(total_supply_percentage) }}&#37;</p>
                        <p v-else>{{ formatNumber(total_supply, { compact: true, style: 'decimal', decimals: 2 }) }}</p>
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
                    
                    <span class='mt-2'>{{ formatNumber(total_supply, { style: 'decimal' }) }} {{ symbol }}</span>
                </div>
            </div>
            
            <!--  Circulating Supply  -->
            <div v-if='circulating_supply' class='progress-bar-container'>
                <MazCircularProgressBar
                    :percentage='circulating_supply_percentage'
                    :duration='3000'
                    suffix='%'
                    size='125px'
                >
                    <template #default>
                        <p v-if='max_supply'>{{ Math.floor(circulating_supply_percentage) }}&#37;</p>
                        <p v-else>{{
                                formatNumber(circulating_supply, { compact: true, style: 'decimal', decimals: 2 })
                                  }}</p>
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
                    
                    <span class='mt-2'>{{ formatNumber(circulating_supply, { style: 'decimal' }) }} {{ symbol }}</span>
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
    } from '~/components/ui/hover-card/index.js';
    import { formatNumber } from '~/utils/formatUtils.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            default: (() => {}),
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const market_data = computed(() => coin.value?.coingecko?.market_data);
    console.log(JSON.parse(JSON.stringify(market_data.value?.market_cap?.usd)));
    
    const market_cap = computed(() => market_data.value?.market_cap?.usd);
    const market_cap_label = computed(() => formatNumber(market_cap.value));
    const market_cap_bar_label = computed(() => formatNumber(market_cap.value, {
        compact: true, decimals: 1
    }));
    
    const max_supply = computed(() => market_data.value?.max_supply);
    const max_supply_label = computed(() => formatNumber(max_supply.value, {
        style: 'decimal'
    }));
    const max_supply_bar_label = computed(() => formatNumber(max_supply.value, {
        compact: true, style: 'decimal'
    }))
    
    const total_supply = computed(() => coin.value?.totalSupply);
    const total_supply_percentage = computed(() => (coin.value?.totalSupply / coin.value?.maxSupply) * 100);
    
    const circulating_supply = computed(() => coin.value?.circulatingSupply);
    const circulating_supply_percentage = computed(() => (coin.value?.circulatingSupply / coin.value?.maxSupply) * 100);
    
    const volume = computed(() => coin.value?.volume);
    const liquidity = computed(() => coin.value?.liquidity);
    
    const symbol = computed(() => coin.value?.symbol || coin.value?.name);
</script>

<style scoped>
    a {
        color: var(--maz-color-muted);
    }
</style>