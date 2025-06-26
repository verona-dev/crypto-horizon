<template>
    <CardContent class='px-20 my-10 flex justify-around'>
        This is coin delta
        
        <!-- 24h  -->
        <Card class='text-card-foreground gap-1 py-5 px-0'>
            
            <CardTitle class='flex flex-col items-center'>
                <NuxtIcon
                    name='radix-icons:bar-chart'
                    size='40'
                    :class='getTrendColor(delta24h)'
                />
            </CardTitle>
            
            <CardContent class='flex justify-center'>
                <p>24h</p>
                
                <HoverCard
                    openDelay='200'
                    class='flex'
                >
                    <HoverCardTrigger class='info-icon'>
                        <NuxtIcon
                            name='radix-icons:info-circled'
                            size='25'
                            class='flex ml-2'
                        />
                    </HoverCardTrigger>
                    <HoverCardContent class='hover-card-content'>
                        <span class='text-sm'>Rate of change in the last 24 hours.</span>
                    </HoverCardContent>
                </HoverCard>
            </CardContent>
            
            <CardFooter :class='getTrendColor(delta24h)'>
                <h6>{{ delta24h.toFixed(2) }}&#37;</h6>
            </CardFooter>
        </Card>
    </CardContent>
    
    <Separator class='my-4' />
</template>

<script setup>
    import { getDeltaPercentage } from '~/utils/formatUtils.js';
    import { getTrendColor } from '~/utils/styleUtils.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
            default: () => ({}),
        },
    });
    
    const { coin } = toRefs(props);
    const delta24h = computed(() => {
        return getDeltaPercentage(coin.value.delta.day, coin.value.rate);
    });
</script>