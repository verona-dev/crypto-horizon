<template>
    <HoverCard
        v-if='delta'
        openDelay='350'
    >
        <HoverCardTrigger>
            <Card
                class='w-32 m-4 text-card-foreground bg-accent-foreground'
                :class="[getTextColor(delta), getBorderColor(delta)]"
            >
                <CardTitle class='flex flex-col items-center'>
                    <p>{{title}}</p>
                </CardTitle>
                
                <CardContent class='flex justify-center'>
                    <NuxtIcon
                        name='radix-icons:bar-chart'
                        size='40'
                    />
                </CardContent>
                
                <CardContent>
                    <span>{{ delta.toFixed(2) }}&#37;</span>
                </CardContent>
            </Card>
        </HoverCardTrigger>
        
        <HoverCardContent side='top' class='hover-card-content'>
            <span class='text-sm'>{{ description }}</span>
        </HoverCardContent>
    </HoverCard>
</template>

<script setup>
    import { getBorderColor } from '~/utils/styleUtils.js';
    
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
