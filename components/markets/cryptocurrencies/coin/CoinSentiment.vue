<template>
    <section class='my-20'>
        <h6>Community sentiment</h6>
        
        <div class='flex items-center w-96 mt-5'>
            <p>{{ Math.floor(sentimentUp) }}&#37;</p>
            <Progress
                v-model='sentiment'
                class='mx-4'
            />
            <p>{{ Math.ceil(sentimentDown) }}&#37;</p>
        </div>
        
    </section>
</template>

<script setup>
    import { Progress } from '@/components/ui/progress';
    
    const props = defineProps({
        sentimentUp: {
            type: Number,
            required: true,
        },
        sentimentDown: {
            type: Number,
            required: true,
        },
    });
    
    const { sentimentUp, sentimentDown } = toRefs(props);
    const sentiment = computed(() => sentimentUp.value || 50);
</script>

<style>
    .progress-root {
        background-color: var(--chart-5);
    }
    
    .progress-indicator {
        background-color: var(--chart-2);
    }
</style>