
<template>
    <div class='my-6'>
        <Bar
            :data='chartData'
            :options='chartOptions'
        />
    </div>
</template>

<script lang='ts' setup>
    import { Bar, Doughnut } from 'vue-chartjs';
    
    const props = defineProps({
        totalSupply: {
            type: Number,
            default: 0,
            required: true,
        },
        maxSupply: {
            type: Number,
            default: 0,
            required: true,
        },
    });
    
    const { totalSupply, maxSupply } = toRefs(props);
    const remainingSupply = computed(() => maxSupply.value - totalSupply.value);
    
    const chartData = ref({
        labels: ['Max Supply', 'Total Supply', 'Remaining Supply', ],
        datasets: [
            {
                label: 'Supply',
                backgroundColor: ['#4188da',  '#E46651', '#41B883'],
                data: [maxSupply.value, totalSupply.value, remainingSupply.value],
            }
        ]
    });
    
    const chartOptions = ref({
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    display: true
                }
            },
        },
        plugins: {
            legend: {
                display: true,
            }
        }
    });
</script>