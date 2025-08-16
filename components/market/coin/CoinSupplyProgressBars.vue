<template>
    <div class='xl:w-[1200px] mx-auto'>
        <div class='coin-supply-progress-bars grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center my-10'>
            <!--  Market Cap  -->
            <div v-if='market_cap' class='item-container'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='2500'
                    size='125px'
                >
                    <template #default>
                        <p>{{ market_cap_bar_label }}</p>
                    </template>
                </MazCircularProgressBar>
                
                <div class='label-container'>
                    <div class='flex items-start'>
                        <h5 class='break-words text-center'>Market Cap</h5>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2 mt-1'
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
            
            <!--  Fully Diluted Valuation  -->
            <div v-if='fully_diluted_valuation' class='item-container'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='3500'
                    size='125px'
                >
                    <template #default>
                        <p>{{ fully_diluted_bar_valuation }}</p>
                    </template>
                </MazCircularProgressBar>
                
                <div class='label-container'>
                    <div class='flex items-start'>
                        <h5 class='break-words text-center'>Diluted Valuation</h5>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2 mt-1'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                    <span class='text-sm'>
                                        Coin fully diluted valuation (FDV) in currency.
                                        FDV and market cap of a crypto coin can be the same number when the total supply
                                        of tokens is equal to the circulating supply of tokens.
                                    </span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ fully_diluted_valuation_label }}</span>
                </div>
            </div>
            
            <!--  Volume 24h  -->
            <div v-if='volume' class='item-container'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='3500'
                    size='125px'
                >
                    <template #default>
                        <p>{{ volume_bar_label }}</p>
                    </template>
                </MazCircularProgressBar>
                
                <div class='label-container'>
                    <div class='flex items-start'>
                        <h5 class='break-words text-center'>Volume 24h</h5>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2 mt-1'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>A measure of how much of a cryptocurrency was traded in the last 24 hours.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ volume_label }}</span>
                </div>
            </div>
            
            <!--  Circulating Supply  -->
            <div v-if='circulating_supply' class='item-container'>
                <MazCircularProgressBar
                    :percentage='circulating_supply_percentage'
                    :duration='3000'
                    suffix='%'
                    size='125px'
                >
                    <template #default>
                        <p v-if='max_supply'>{{ Math.floor(circulating_supply_percentage) }}&#37;</p>
                        <p v-else>{{ formatNumber(circulating_supply, { compact: true, style: 'decimal', decimals: 2 }) }}</p>
                    </template>
                </MazCircularProgressBar>
                
                <div class='label-container'>
                    <div class='flex items-start'>
                        <h5 class='break-words text-center'>Circulating Supply</h5>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2 mt-1'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                            <span class='text-sm'>
                                The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.
                            </span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <span class='mt-2'>{{ circulating_supply_label }} {{ symbol }}</span>
                </div>
            </div>
            
            <!--  Max Supply  -->
            <div v-if='max_supply' class='item-container'>
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='2500'
                    size='125px'
                >
                    <template #default>
                        <p>{{ max_supply_bar_label }}</p>
                    </template>
                </MazCircularProgressBar>
                
                <div class='label-container'>
                    <div class='flex items-start'>
                        <h5 class='break-words text-center'>Max Supply</h5>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2 mt-1'
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
            <div v-if='total_supply' class='item-container'>
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
                
                <div class='label-container'>
                    <div class='flex items-start'>
                        <h5 class='break-words text-center'>Total Supply</h5>
                        
                        <HoverCard
                            :openDelay='200'
                            class='flex'
                        >
                            <HoverCardTrigger>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2 mt-1'
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
                    
                    <span class='mt-2'>{{ total_supply_label }} {{ symbol }}</span>
                </div>
            </div>
        </div>
    </div>
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
    
    const total_supply = computed(() =>  market_data.value?.total_supply);
    const total_supply_label = computed(() => formatNumber(total_supply.value, {
        style: 'decimal'
    }));
    const total_supply_percentage = computed(() => (total_supply.value / max_supply.value) * 100);
    
    const circulating_supply = computed(() => market_data.value?.circulating_supply);
    const circulating_supply_label = computed(() => formatNumber(circulating_supply.value, {
        style: 'decimal'
    }));
    const circulating_supply_percentage = computed(() => (circulating_supply.value / max_supply.value) * 100);
    
    const volume = computed(() => market_data.value?.total_volume?.usd);
    const volume_label = computed(() => formatNumber(volume.value));
    const volume_bar_label = computed(() => formatNumber(volume.value, {
        compact: true, decimals: 1
    }));
    
    const fully_diluted_valuation = computed(() => market_data.value?.fully_diluted_valuation?.usd);
    const fully_diluted_valuation_label = computed(() => formatNumber(fully_diluted_valuation.value));
    const fully_diluted_bar_valuation = computed(() => formatNumber(fully_diluted_valuation.value, {
        compact: true, decimals: 1
    }));
    
    const symbol = computed(() => coin.value?.symbol || coin.value?.name);
</script>

<style>
    .coin-supply-progress-bars {
        a {
            color: var(--maz-color-muted);
        }
        
        .item-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            
            @media (min-width: 768px) {
                width: 300px;
            }
            
            /* Desktop */
            @media (min-width: 1024px) {
                width: 350px;
            }
            
            @media (min-width: 1280px) {
                width: 400px;
            }
            
            .label-container {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    }
    
    [data-slot='drawer-content'] {
        margin-top: 0 !important;
        
        @media (min-width: 768px) {
            margin-top: calc(var(--spacing) * 24);
        }
    }
</style>