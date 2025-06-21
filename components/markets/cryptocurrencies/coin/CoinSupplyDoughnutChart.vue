
<template>
    <div class='my-6'>
        <Doughnut
            :data='chartData'
            :options='chartOptions'
        />
    </div>
</template>

<script lang='ts' setup>
    import { Doughnut } from 'vue-chartjs';
    
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
                labels: ['Total Supply', 'Remaining Supply'],
                data: [coin.value.totalSupply, remainingSupply.value]
            };
        } else {
            // If coin does not have max supply
            return {
                labels: ['Total Supply', 'Circulating Supply'],
                data: [coin.value.totalSupply, coin.value.circulatingSupply]
            };
        }
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