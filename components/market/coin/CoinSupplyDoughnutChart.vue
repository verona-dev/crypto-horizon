
<template>
    <div class='mt-10 flex items-center justify-center gap-16'>
        <div>
            <Doughnut
                :data='chartData'
                :options='chartOptions'
                class='w-[400px] h-[400px]'
            />
        </div>
        
        <div>
            <Table class='w-96'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount&#40;{{ symbol }}&#41;</TableHead>
                    </TableRow>
                </TableHeader>
                
                <TableBody>
                    <!--  Max Supply  -->
                    <TableRow v-if='max_supply'>
                        <TableCell class='font-medium'>Max Supply</TableCell>
                        <TableCell>{{ max_supply_label }}</TableCell>
                    </TableRow>
                    <!--  Total Supply  -->
                    <TableRow v-if='total_supply'>
                        <TableCell class='font-medium'>Total Supply</TableCell>
                        <TableCell>{{ total_supply_label }}</TableCell>
                    </TableRow>
                    <!--  Circulating Supply  -->
                    <TableRow v-if='circulating_supply'>
                        <TableCell class='font-medium'>Circulating Supply</TableCell>
                        <TableCell>{{ circulating_supply_label }}</TableCell>
                    </TableRow>
                    <!--  Remaining Supply  -->
                    <TableRow v-if='remaining_supply'>
                        <TableCell class='font-medium'>Remaining Supply</TableCell>
                        <TableCell>{{ remaining_supply_label }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    
    </div>
</template>

<script lang='ts' setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    
    import { Doughnut } from 'vue-chartjs';
    import {
        Table,
        TableBody,
        TableCell,
        TableRow,
    } from '@/components/ui/table';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const symbol = computed(() => coin.value?.symbol);
    const market_data = computed(() => coin.value?.coingecko?.market_data);
    const max_supply = computed(() => market_data.value?.max_supply);
    const max_supply_label = market_data.value?.max_supply_label;
    
    const total_supply = computed(() =>  market_data.value?.total_supply);
    const total_supply_label = market_data.value?.total_supply_label;
    const circulating_supply = computed(() => market_data.value?.circulating_supply);
    const circulating_supply_label = market_data.value?.circulating_supply_label;
    const remaining_supply = computed(() => max_supply.value - total_supply.value);
    const remaining_supply_label = computed(() => formatNumber(remaining_supply.value, {
        style: 'decimal'
    }));
    
    const chartContent = computed(() => {
        const labels = [];
        const data = [];
        const backgroundColor = [];
        
        // If coin has max supply
        if (max_supply.value) {
            if(total_supply.value) {
                labels.push('Total Supply');
                data.push(total_supply.value);
                backgroundColor.push('#fef0ca');
            }
            
            if(remaining_supply.value) {
                labels.push('Remaining Supply');
                data.push(remaining_supply.value);
                backgroundColor.push('#41B883');
            }
        } else {
            // If coin does not have max supply
            if(total_supply.value) {
                labels.push('Total Supply');
                data.push(total_supply.value);
                backgroundColor.push('#fef0ca');
            }
            
            if(circulating_supply.value) {
                labels.push('Circulating Supply');
                data.push(circulating_supply.value);
                backgroundColor.push('#e787c0');
            }
        }
        
        return { labels, data, backgroundColor };
    });
    
    const chartData = ref(({
        labels: chartContent.value?.labels,
        datasets: [
            {
                backgroundColor: ['#fef0ca', '#41B883'],
                data: chartContent.value?.data,
                cutout: '50%',
                hoverOffset: 20,
            },
        ],
    }));
    
    const chartOptions = ref({
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18
                    }
                }
            }
        },
    });
</script>