<template>
    <div
        v-if='sentimentUp'
        class='coin-sentiment'
    >
        <div class='flex items-center'>
            <NuxtIcon
                name='iconoir:user-love'
                size='50'
                class='mr-4 mb-5'
            />
            <h6>Community sentiment</h6>
        </div>
        
        <div class='flex items-center'>
            <div class='flex items-center text-chart-2'>
                <NuxtIcon
                    name='iconoir:thumbs-up'
                    size='35'
                    class='mr-2'
                />
                <p>{{ Math.floor(sentimentUp) || 0 }}&#37;</p>
            </div>
            
            <Progress
                v-model='sentimentUp'
                class='mx-4'
            />
            
            <div class='flex items-center text-chart-5'>
                <p>{{ Math.ceil(sentimentDown) }}&#37;</p>
                <NuxtIcon
                    name='iconoir:thumbs-down'
                    size='35'
                    class='ml-2'
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { Progress } from '@/components/ui/progress';
    
    const props = defineProps({
        sentimentUp: {
            type: Number,
        },
        sentimentDown: {
            type: Number,
        },
    });
    
    const { sentimentUp, sentimentDown } = toRefs(props);
</script>

<style>
    .coin-sentiment {
        .progress-root {
            background-color: var(--chart-5);
        }
        
        .progress-indicator {
            background-color: var(--chart-2);
        }
    }
</style>