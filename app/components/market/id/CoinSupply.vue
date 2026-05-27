<template>
    <Card class='flex flex-col gap-24 py-20'>
        <div class='flex flex-col items-center gap-8 relative'>
            <!--  Title  -->
            <div class='text-primary flex items-center gap-3'>
                <NuxtIcon
                    name='ph:chart-donut-duotone'
                    size='72'
                />
                
                <Title :tag='2'>Supply </Title>
            </div>
            
            <!--  Selector  -->
            <Select v-model='selected' default-value='progress-bars'>
                <SelectTrigger class='w-56 h-13 pl-4 border-primary/50 xl:absolute xl:top-0 xl:right-20' data-size='default'>
                    <SelectValue />
                </SelectTrigger>
                
                <SelectContent class='w-56'>
                    <SelectGroup>
                        <SelectItem value='progress-bars' class='h-11 cursor-pointer'>Progress Bars</SelectItem>
                        <SelectItem value='doughnut-chart' class='h-11 cursor-pointer'>Doughnut Chart</SelectItem>
                        <SelectItem value='stacked-bars' class='h-11 cursor-pointer'>Stacked Bars</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        
        <!--  Content  -->
        <div class='min-h-160'>
            <CoinSupplyCircularProgressBars
                v-if='selected === "progress-bars"'
                :coin='coin'
            />
            
            <CoinSupplyDoughnutChart
                v-else-if='selected === "doughnut-chart"'
                :coin='coin'
            />
            
            <CoinSupplyStackedBars
                v-else-if='selected === "stacked-bars"'
                :coin='coin'
            />
            
            <div v-else>
                <h6>Something went wrong. Please refresh the page and try again.</h6>
            </div>
        </div>
    </Card>
</template>

<script setup>
    import { Card } from '~/components/ui/card';
    import CoinSupplyCircularProgressBars from '@/components/market/id/CoinSupplyCircularProgressBars.vue';
    import CoinSupplyDoughnutChart from '@/components/market/id/CoinSupplyDoughnutChart.vue';
    import CoinSupplyStackedBars from '@/components/market/id/CoinSupplyStackedBars.vue';
    import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
    import Title from '~/components/Title.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        },
    });
    
    const { coin } = toRefs(props);
    const selected = ref('progress-bars');
</script>