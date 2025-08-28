<template>
    <div v-if='sentimentUp' class='coin-sentiment'>
        <div class='flex items-center mb-4'>
            <NuxtIcon
                name='bitcoin-icons:podcast-outline'
                size='45'
                class='mr-3 min-w-14'
            />
            <h5>Community sentiment</h5>
        </div>
        
        <div class='flex items-center'>
            <div class='flex items-center text-chart-2'>
                <NuxtIcon
                    name='bitcoin-icons:rocket-outline'
                    size='40'
                    class='mr-2'
                />
                <p>{{ sentiment_up_label }}</p>
            </div>
            
            <Progress
                v-model='sentimentUp'
                class='mx-4'
            />
            
            <div class='flex items-center text-chart-5'>
                <p>{{ sentiment_down_label }}</p>
                <NuxtIcon
                    name='iconoir:thumbs-down'
                    size='30'
                    class='ml-2'
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { Progress } from '~/components/ui/progress/index.js';
    
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
        .progress-root {
            background-color: var(--destructive-radical);
        }
        
        .progress-indicator {
            background-color: var(--color-progress);
        }
    }
</style>