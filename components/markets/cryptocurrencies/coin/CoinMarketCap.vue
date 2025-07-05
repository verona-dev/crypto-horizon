<template>
    <div
        v-if='marketCap'
        class='coin-market-cap-progress-bar flex items-center'
    >
        <MazCircularProgressBar
            :percentage='100'
            :duration='1500'
        >
            <template #default>
                <h6 class='m-0'>{{ formatNumberWithOptions(marketCap, true) }}</h6>
            </template>
        </MazCircularProgressBar>
        
        <div class='ml-6 flex flex-col'>
            <div class='flex items-center'>
                <h5>Market Cap</h5>
                
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
                                    Market cap = Current price x Circulating supply
                                </span>
                    </HoverCardContent>
                </HoverCard>
            </div>
            
            <p class='mt-2'>&#36;{{ marketCap.toLocaleString() }}</p>
        </div>
    </div>
</template>

<script setup>
    import { formatNumberWithOptions } from '~/utils/formatUtils.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    
    const props = defineProps({
        marketCap: Number,
        default: 0,
        required: true,
    });
    
    const { marketCap } = toRefs(props);
</script>