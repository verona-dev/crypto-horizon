
<template>
    <div class='my-6'>
        <Bar
            :data='chartData'
            :options='chartOptions'
        />
    </div>
</template>

<script lang='ts' setup>
    import { Bar } from 'vue-chartjs';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const market_data = computed(() => coin.value?.coingecko?.market_data);
    const max_supply = computed(() => market_data.value?.max_supply);
    const total_supply = computed(() =>  market_data.value?.total_supply);
    const circulating_supply = computed(() => market_data.value?.circulating_supply);
    const remaining_supply = computed(() => max_supply.value - total_supply.value);
    
    const chartContent = computed(() => {
        const labels = [];
        const data = [];
        const backgroundColor = [];
        
        // If coin has max supply
        if (max_supply.value) {
            labels.push('Max Supply');
            data.push(max_supply.value);
            backgroundColor.push('#00b1f5');
            
            if(total_supply.value) {
                labels.push('Total Supply');
                data.push(total_supply.value);
                backgroundColor.push('#fef0ca');
            }
            
            if(circulating_supply.value) {
                labels.push('Circulating Supply');
                data.push(circulating_supply.valu);
                backgroundColor.push('#e787c0');
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
                data.push(circulating_supply.valu);
                backgroundColor.push('#e787c0');
            }
        }
        
        return { labels, data, backgroundColor };
    });
    
    const chartData = ref({
        labels: chartContent.value?.labels,
        datasets: [
            {
                label: 'Supply',
                backgroundColor: chartContent.value?.backgroundColor,
                data: chartContent.value?.data,
            }
        ],
    });
    
    const chartOptions = ref({
        barThickness: 70,
        indexAxis: 'y',
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18
                    },
                }
            },
        },
    });
</script>