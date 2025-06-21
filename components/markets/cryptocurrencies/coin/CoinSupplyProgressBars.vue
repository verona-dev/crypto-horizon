<template>
    <MazAnimatedElement
        direction='up'
        :duration='2000'
        class='my-6 flex flex-col'
    >
        <!--  Max Supply  -->
        <div class='my-6 flex items-center justify-center'>
            <MazCircularProgressBar
                :percentage='100'
                :duration='3500'
            >
                <template #default>
                    <h6>
                        {{ formatNumberWithOptions(coin.maxSupply, false) }}
                    </h6>
                </template>
            </MazCircularProgressBar>
            
            <div class='ml-6 flex flex-col w-[350px]'>
                <div class='flex items-center'>
                    <h5>Max Supply</h5>
                    
                    <HoverCard
                        openDelay='200'
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
                
                <p class='mt-2'>
                    <span class='mr-2'>{{ symbol }}</span>{{ coin.maxSupply?.toLocaleString() }}
                </p>
            </div>
        </div>
        
        <div class='my-6 flex flex-col lg:flex-row justify-evenly'>
            <!--  Total Supply  -->
            <div class='flex items-center justify-center'>
                <MazCircularProgressBar
                    :percentage='totalSupplyPercentage'
                    :duration='2500'
                    suffix='%'
                    auto-color
                />
                
                <div class='ml-6 flex flex-col w-[350px]'>
                    <div class='flex items-center'>
                        <h4>Total Supply</h4>
                        
                        <HoverCard
                            openDelay='200'
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
                    
                    <p class='mt-2'><span class='mr-2'>{{ symbol }}</span>{{ coin.totalSupply?.toLocaleString() }}</p>
                </div>
            </div>
            
            <!--  Circulating Supply  -->
            <div class='my-6 flex items-center justify-center'>
                <MazCircularProgressBar
                    :percentage='circulatingSupplyPercentage'
                    :duration='2500'
                    suffix='%'
                    auto-color
                />
                
                <div class='ml-6 flex flex-col w-[375px]'>
                    <div class='flex items-center'>
                        <h5>Circulating Supply</h5>
                        
                        <HoverCard
                            openDelay='200'
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
                    
                    <p class='mt-2'><span class='mr-2'>{{ symbol }}</span>{{ coin.circulatingSupplyChart?.toLocaleString() }}</p>
                </div>
            </div>
        </div>
    
    </MazAnimatedElement>
</template>

<script setup>
    import { formatNumberWithOptions } from '~/utils/formatUtils.js';
    import {
        HoverCard,
        HoverCardContent,
        HoverCardTrigger,
    } from '@/components/ui/hover-card';
    
    const props = defineProps({
        coin: {
            type: Object,
            default: (() => {}),
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    
    const totalSupplyPercentage = computed(() => (coin.value.totalSupply / coin.value.maxSupply) * 100);
    const circulatingSupplyPercentage = computed(() => (coin.value.circulatingSupplyChart / coin.value.maxSupply) * 100);
    const symbol = computed(() => coin.value?.symbol || coin.value?.name);
</script>

<style>
    .hover-card-content {
        background: var(--input) !important;
    }
</style>

<style scoped>
    a {
        color: var(--maz-color-muted);
    }
</style>