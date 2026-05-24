<template>
    <div v-if='sentimentUp' class='flex flex-col gap-8'>
        <!--  Sentiment Title  -->
        <div class='text-primary flex items-center gap-3'>
            <NuxtIcon
                name='ph:users-three'
                size='48'
            />
            
            <Title :tag='3'>Community sentiment</Title>
        </div>
        
        <HoverCard :openDelay='200'>
            <HoverCardTrigger>
                <div class='flex items-center justify-between'>
                    <div class='flex items-center gap-3 text-progress'>
                        <NuxtIcon
                            name='ph:trend-up-light'
                            size='32'
                        />
                        <h6>{{ sentiment_up_label }}</h6>
                    </div>
                    
                    <Progress
                        v-model='sentimentUp'
                        class='progress-indicator h-3 mx-4'
                    />
                    
                    <div class='flex items-center gap-3 text-destructive'>
                        <h6>{{ sentiment_down_label }}</h6>
                        <NuxtIcon
                            name='ph:trend-down-light'
                            size='32'
                        />
                    </div>
                </div>
            </HoverCardTrigger>
            
            <HoverCardContent>Community market sentiment is measured by tallying bullish and bearish votes from users.</HoverCardContent>
        </HoverCard>
    </div>
</template>

<script setup>
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import { Progress } from '~/components/ui/progress';
    import Title from '~/components/Title.vue';
    
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

<style scoped>
    /*   .progress-indicator {
           background-color: var(--color-progress) !important;
        }
   */
</style>