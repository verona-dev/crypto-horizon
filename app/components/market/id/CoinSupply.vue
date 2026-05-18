<template>
    <div>
        <!--  Title container  -->
        <div class='flex flex-col items-center gap-4'>
            <div class='text-4xl'>Coin Supply</div>
            
            <div>Exploring Key Metrics</div>
            
            <Select v-model='selected' default-value='progress-bars'>
                <SelectTrigger class='w-56 h-13 mt-4 pl-4 hover:bg-popover focus:ring-0 rounded-lg' data-size='default'>
                    <SelectValue />
                </SelectTrigger>
                
                <SelectContent class='rounded-lg'>
                    <SelectGroup>
                        <SelectItem value='progress-bars' class='h-12 rounded-lg'>Progress Bars</SelectItem>
                        <SelectItem value='doughnut-chart' class='h-12 rounded-lg'>Doughnut Chart</SelectItem>
                        <SelectItem value='stacked-bars' class='h-12 rounded-lg'>Stacked Bars</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        
        <div class='mt-6 overflow-y-auto select-text'>
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
    </div>
</template>

<script setup>
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