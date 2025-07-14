<template>
    <div v-if='chartData.prices' class='coin-chart w-10/12 my-20 mx-auto'>
        <Line
            v-if='data.datasets?.length'
            :data='data'
            :options='options'
            :height='500'
        />
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    import { Line } from 'vue-chartjs';
    
    import {
        Chart as ChartJS,
        LineController,
        LineElement,
        PointElement,
        LinearScale,
        CategoryScale,
        Filler,
        Title,
        Tooltip,
        Legend,
    } from 'chart.js';
    
    ChartJS.register(
        LineController,
        LineElement,
        PointElement,
        LinearScale,
        CategoryScale,
        Filler,
        Title,
        Tooltip,
        Legend
    );
    
    const props = defineProps({
        chartData: {
            type: Object,
            required: true
        }
    });
    const { chartData } = toRefs(props);
    
    const labels = computed(() => chartData.value?.prices?.map(item => dayjs(item[0]).format('D. MMM')));
    const prices = computed(() => chartData.value?.prices?.map(item => item[1]));
    
    const data = computed(() => ({
        labels: labels.value,
        datasets: [
            {
                label: 'Price',
                data: prices.value,
                borderColor: '#4eec4e',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
                    gradient.addColorStop(0.1, '#1a4d1a');
                    gradient.addColorStop(0.4, '#0d290d');
                    gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
                    return gradient;
                },
                fill: true,
                tension: 0.5,
                pointRadius: 5,
                pointHoverRadius: 10,
            },
        ],
    }));
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: false,
                },
                beginAtZero: false,
                grid: {
                    color: 'oklch(0.274 0.006 286.033)',
                },
            },
        },
    };
</script>