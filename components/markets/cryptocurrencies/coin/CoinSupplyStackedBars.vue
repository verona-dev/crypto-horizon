
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
            default: (() => {}),
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const remainingSupply = computed(() => coin.value.maxSupply - coin.value.totalSupply);
    
    const chartContent = computed(() => {
        // If coin has max supply
        if (coin.value.maxSupply) {
            return {
                labels: ['Max Supply', 'Total Supply', 'Circulating Supply', 'Remaining Supply'],
                data: [coin.value.maxSupply, coin.value.totalSupply, coin.value.circulatingSupply, remainingSupply.value],
                backgroundColor: ['#00b1f5',  '#fef0ca', '#e787c0', '#41B883'],
            };
        } else {
            // If coin does not have max supply
            return {
                labels: ['Total Supply', 'Circulating Supply'],
                data: [coin.value.totalSupply, coin.value.circulatingSupply],
                backgroundColor: ['#fef0ca', '#e787c0'],
            };
        }
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