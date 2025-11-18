<template>
    <HoverCard
        v-if='delta'
        :openDelay='350'
    >
        <HoverCardTrigger>
            <Card
                class='w-20 m-4 py-4 flex flex-col items-center gap-2 rounded-lg'
                :class="[getTrendClass(delta), getBorderClass(delta)]"
            >
                <CardTitle class='flex flex-col items-center'>
                    <p>{{title}}</p>
                </CardTitle>
                
                <CardContent class='flex justify-center py-2'>
                    <NuxtIcon
                        name='ph:chart-scatter-light'
                        size='25'
                    />
                </CardContent>
                
                <CardContent class='py-2 text-sm'>{{ formatNumber(delta, { style: 'percent' }) }}</CardContent>
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
