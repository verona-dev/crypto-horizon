<template>
    <HoverCard
        v-if='delta'
        :openDelay='350'
    >
        <HoverCardTrigger>
            <Card
                class='w-36 py-4 flex flex-col items-center gap-2 rounded-xl shadow-2xl shadow-destructive'
                :class="[getTrendClass(delta), getBorderClass(delta)]"
            >
                <CardTitle class='flex flex-col items-center'>
                    <h5>{{title}}</h5>
                </CardTitle>
                
                <CardContent class='flex justify-center py-2'>
                    <NuxtIcon
                        name='ph:chart-scatter-duotone'
                        size='56'
                    />
                </CardContent>
                
                <CardContent class='py-2'>{{ formatNumber(delta, { style: 'percent' }) }}</CardContent>
            </Card>
        </HoverCardTrigger>
        
        <HoverCardContent side='top'>{{ description }}</HoverCardContent>
    </HoverCard>
</template>

<script setup>
    import { getTrendClass, getBorderClass } from '~/utils/styleUtils.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import { Card, CardTitle, CardContent } from '~/components/ui/card';
    
    const props = defineProps({
        delta: {
            type: Number,
            required: true,
            default: 0,
        },
        title: {
            type: String,
            required: true,
            default: '',
        },
        description: {
            type: String,
            required: true,
            default: '-',
        },
    });
    
    const { delta, title, description } = toRefs(props);
</script>
