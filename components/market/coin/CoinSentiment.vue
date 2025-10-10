<template>
    <div v-if='sentimentUp' class='coin-sentiment flex flex-col gap-8'>
        <!--  Sentiment Title  -->
        <div class='flex items-center gap-3'>
            <NuxtIcon
                name='iconoir:community'
                size='25'
            />
            <h3>Community sentiment</h3>
        </div>
        
        <HoverCard :openDelay='200'>
            <HoverCardTrigger>
                <div class='w-full flex items-center justify-between'>
                    <div class='flex items-center gap-2 text-progress'>
                        <NuxtIcon
                            name='iconoir:stat-up'
                            size='30'
                        />
                        <p>{{ sentiment_up_label }}</p>
                    </div>
                    
                    <Progress
                        v-model='sentimentUp'
                        class='h-3 mx-4 bg-destructive'
                    />
                    
                    <div class='flex items-center gap-2 text-destructive'>
                        <p>{{ sentiment_down_label }}</p>
                        <NuxtIcon
                            name='iconoir:stat-down'
                            size='30'
                        />
                    </div>
                </div>
            </HoverCardTrigger>
            
            <HoverCardContent class='hover-card-content'>
                Community market sentiment is measured by tallying bullish and bearish votes from users            </HoverCardContent>
        </HoverCard>
    </div>
</template>

<script setup>
    import { Progress } from '~/components/ui/progress/index.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    
    const props = defineProps({
        sentimentUp: {
            type: Number,
        },
        sentimentDown: {
            type: Number,
        },
    });
    
    const { sentimentUp, sentimentDown } = toRefs(props);
    
    const sentiment_up_label = formatNumber(sentimentUp.value, {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }) || 0;
    
    const sentiment_down_label = formatNumber(sentimentDown.value, {
        style: 'percent',
        roundingMode: 'ceil',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
</script>

<style>
    .coin-sentiment {
        .progress-indicator {
            background-color: var(--color-progress) !important;
        }
    }
</style>