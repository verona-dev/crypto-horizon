
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
        labels: ['Total Supply', 'Remaining Supply'],
        datasets: [
            {
                backgroundColor: ['#E46651', '#41B883'],
                data: [totalSupply.value, remainingSupply.value],
                cutout: '50%',
            }
        ],
    });
    
    const chartOptions = ref({
        responsive: true,
        maintainAspectRatio: true,
    });
</script>