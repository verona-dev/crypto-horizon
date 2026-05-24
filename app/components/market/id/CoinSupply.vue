<template>
    <Card class='flex flex-col gap-16 p-16 !w-full'>
        <!--  Selector  -->
        <Select v-model='selected' default-value='progress-bars'>
            <SelectTrigger class='w-56 h-13 pl-4 mx-auto' data-size='default'>
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
        
        <!--  Content  -->
        <div>
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
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        },
    });
    
    const { coin } = toRefs(props);
    const selected = ref('progress-bars');
</script>