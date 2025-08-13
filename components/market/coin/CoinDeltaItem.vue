<template>
    <HoverCard
        v-if='delta'
        :openDelay='350'
    >
        <HoverCardTrigger>
            <Card
                class='w-28 m-4 py-4 gap-2 text-card-foreground bg-accent-foreground'
                :class="[getTextColor(delta), getBorderColor(delta)]"
            >
                <CardTitle class='flex flex-col items-center'>
                    <p>{{title}}</p>
                </CardTitle>
                
                <CardContent class='flex justify-center'>
                    <NuxtIcon
                        name='radix-icons:bar-chart'
                        size='30'
                    />
                </CardContent>
                
                <CardContent>
                    <span>{{ formatNumber(delta, { style: 'percent', truncate: true }) }}</span>
                </CardContent>
            </Card>
        </HoverCardTrigger>
        
        <HoverCardContent side='top' class='hover-card-content'>
            <span class='text-sm'>{{ description }}</span>
        </HoverCardContent>
    </HoverCard>
</template>

<script setup>
    import { getTextColor } from '~/utils/styleUtils.js';
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
