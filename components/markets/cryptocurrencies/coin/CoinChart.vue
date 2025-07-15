<template>
    <div v-if='chartData.prices' class='coin-chart w-10/12 my-20 mx-auto'>
        <Line
            v-if='data.datasets?.length'
            :data='data'
            :options='options'
            :height='400'
            :type='"customLineChart"'
        />
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    import { Line } from 'vue-chartjs';
    import CustomLineChart from '~/utils/CustomLineChart.js';
    
    import {
        CategoryScale,
        Chart as ChartJS,
        Filler,
        Legend,
        LinearScale,
        LineController,
        LineElement,
        PointElement,
        Title,
        Tooltip,
    } from 'chart.js';
    
    ChartJS.register(
        CustomLineChart,
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
    
    const timestamps = computed(() => chartData.value?.prices?.map(item => item[0]));
    // const labels = computed(() => chartData.value?.prices?.map(item => dayjs(item[0]).format('D. MMM')));
    const prices = computed(() => chartData.value?.prices?.map(item => item[1]));
    
    const data = computed(() => ({
        labels: timestamps.value, // x-axis
        datasets: [
            {
                label: 'Price',
                data: prices.value, // y-axis
                
                // Line
                borderColor: '#01c929',
                borderWidth: 2,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
                    gradient.addColorStop(0.05, '#006200');
                    gradient.addColorStop(0.1, '#1a4d1a');
                    gradient.addColorStop(0.5, '#0d290d');
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    return gradient;
                },
                fill: true,
                tension: 0.5,
                
                // Point
                pointRadius: 0,
                pointHoverRadius: 5,
                pointBackgroundColor: '#01c929',
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
                backgroundColor: 'oklch(0.21 0.006 285.885)',
                padding: 24,
                caretPadding: 8,
                caretSize: 8,
                cornerRadius: 8,
                displayColors: false, // disable the color box
                titleMarginBottom: 16,
                titleFont: {
                    size: 14,
                    weight: 'normal',
                },
                bodyFont: {
                    size: 14,
                    weight: 'bold',
                },
                callbacks: {
                    title: function(context) {
                        const timestampMs = Number(context[0]?.label); // scales.x.ticks.callback() this.getLabelForValue converted it to String
                        return dayjs(timestampMs).format('MMM D, YYYY, HH:mm:ss');
                    },
                    label: function(context) {
                        const price = formatPrice(context.parsed.y, {
                            truncate: true,
                        });
                        return `Price: ${price}`;
                        
                    }
                },
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
                ticks: {
                    maxTicksLimit: 8,
                    callback: function(value) {
                        const label = this.getLabelForValue(value);
                        return dayjs(label).format('D. MMM');
                    }
                },
            },
            y: {
                position: 'right',
                title: {
                    display: false,
                },
                beginAtZero: false,
                grid: {
                    color: 'rgba(78,135,176,0.35)',
                },
                ticks: {
                    callback: function(value) {
                        return formatNumberWithOptions(value);
                    }
                },
                offset: true,
            },
        },
    };
</script>