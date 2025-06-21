<template>
    <MazAnimatedElement
        direction='up'
        :duration='2000'
        class='my-6 flex flex-col'
    >
        <div class='flex flex-col lg:flex-row flex-wrap justify-center'>
            <!--  Max Supply  -->
            <div
                v-if='coin.maxSupply'
                class='my-10 flex items-center justify-center'
            >
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='2000'
                >
                    <template #default>
                        <h6>{{ formatNumberWithOptions(coin.maxSupply, false) }}</h6>
                    </template>
                </MazCircularProgressBar>
                
                <div class='ml-6 flex flex-col w-[375px]'>
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
                    
                    <p class='mt-2'>{{ coin.maxSupply?.toLocaleString() }} {{ symbol }}</p>
                </div>
            </div>
            
            <!--  Volume  -->
            <div
                v-if='coin.volume'
                class='my-10 flex items-center justify-center'
            >
                <MazCircularProgressBar
                    :percentage='100'
                    :duration='2500'
                >
                    <template #default>
                        <h6>{{ formatNumberWithOptions(coin.volume, true) }}</h6>
                    </template>
                </MazCircularProgressBar>
                
                <div class='ml-6 flex flex-col w-[375px]'>
                    <div class='flex items-center'>
                        <h5>Volume 24h</h5>
                        
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
                                <span class='text-sm'>A measure of how much of a cryptocurrency was traded in the last 24 hours.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <p class='mt-2'>&#36;{{ coin.volume?.toLocaleString() }}</p>
                </div>
            </div>
        </div>
        
        <div class='flex flex-col lg:flex-row flex-wrap justify-center'>
            <!--  Total Supply  -->
            <div class='my-10 flex items-center justify-center'>
                <MazCircularProgressBar
                    v-if='coin.maxSupply'
                    :percentage='totalSupplyPercentage'
                    :duration='3000'
                    suffix='%'
                    auto-color
                />
                
                <div class='ml-6 flex flex-col w-[375px]'>
                    <div class='flex items-center'>
                        <h5>Total Supply</h5>
                        
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
                    
                    <p class='mt-2'>{{ coin.totalSupplyFormatted }} {{ symbol }}</p>
                </div>
            </div>
            
            <!--  Circulating Supply  -->
            <div
                v-if='coin.circulatingSupply'
                class='my-10 flex items-center justify-center'
            >
                <MazCircularProgressBar
                    v-if='coin.maxSupply'
                    :percentage='circulatingSupplyPercentage'
                    :duration='3500'
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
                    
                    <p class='mt-2'>{{ coin.circulatingSupplyFormatted }} {{ symbol }}</p>
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
    console.log(coin.value);
    
    const totalSupplyPercentage = computed(() => (coin.value?.totalSupply / coin.value?.maxSupply) * 100);
    const circulatingSupplyPercentage = computed(() => (coin.value?.circulatingSupply / coin.value?.maxSupply) * 100);
    const symbol = computed(() => coin.value?.symbol || coin.value?.name);
</script>

<style scoped>
    a {
        color: var(--maz-color-muted);
    }
</style>