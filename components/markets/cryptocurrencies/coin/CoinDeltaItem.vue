<template>
    <HoverCard
        v-if='delta'
        openDelay='200'
        class='flex'
    >
        <HoverCardTrigger class='info-icon'>
            <Card
                class='text-card-foreground gap-1 py-5 px-0'
                :class='getTrendColor(delta)'
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
                
                <CardFooter>
                    <h6>{{ delta.toFixed(2) }}&#37;</h6>
                </CardFooter>
            </Card>
        </HoverCardTrigger>
        
        <HoverCardContent class='hover-card-content'>
            <span class='text-sm'>{{ description }}</span>
        </HoverCardContent>
    </HoverCard>
</template>

<script setup>
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
