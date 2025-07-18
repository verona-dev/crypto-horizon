<template>
    <div v-if='chartData.prices' class='coin-chart'>
        <Tabs
            v-model='activeTab'
            default-value='price'
            class='mb-10'
        >
            <TabsList class='mx-auto w-72 py-6'>
                <TabsTrigger value='price'>Price</TabsTrigger>
                <TabsTrigger value='mcap'>Market Cap</TabsTrigger>
            </TabsList>
        </Tabs>
        
        <div class='chart-container'>
            <div v-if='loading' class='spinner-container'>
                <MazSpinner class='spinner' />
            </div>
            
            <div>
                <Line
                    ref='chartRef'
                    v-if='data.datasets?.length'
                    :data='data'
                    :options='options'
                    :height='400'
                    :type='"customLineChart"'
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    const prices = computed(() => chartData.value?.prices?.map(item => item[1]));
    const volumes = computed(() => chartData.value?.total_volumes?.map(item => item[1]));
    const mCaps = computed(() => chartData.value?.market_caps?.map(item => item[1]));
    
    const activeTab = ref('price');
    const activeData = computed(() => activeTab.value === 'price' ? prices.value : mCaps.value);
    const loading = ref(false);
    const chartRef = ref(null);
    
    const data = computed(() => ({
        labels: timestamps.value, // x-axis
        datasets: [
            {
                label: 'Last 7 days',
                data: activeData.value, // y-axis
                
                // Line
                borderColor: '#3fc45a',
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
    
    watch(activeData, () => {
        const chartInstance = chartRef.value.chart;
        
        if (chartInstance) {
            loading.value = true;
            
            chartInstance.update();
            
            setTimeout(() => {
                loading.value = false;
            }, 600);
        }
    }, { deep: true })
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
        animation: {
            duration: 1000,
        },
        plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: 'oklch(0.21 0.006 285.885)',
                padding: {
                    top: 24,
                    right: 28,
                    bottom: 24,
                    left: 28
                },
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
                bodySpacing: 6,
                callbacks: {
                    title: function(context) {
                        const timestamps = Number(context[0]?.label); // scales.x.ticks.callback() this.getLabelForValue converted it to String
                        return dayjs(timestamps).format('MMM D, YYYY, HH:mm:ss');
                    },
                    label: function(context) {
                        const index = context.dataIndex;
                        const amount = formatNumber(context.parsed.y, {
                            truncate: true,
                        });
                        const volume = formatNumber(volumes.value[index]);
                        const label = activeTab.value === 'price' ? 'Price' : 'Market Cap';
                        
                        return [
                            `${label}: ${amount}`,
                            `Vol: ${volume}`,
                        ];
                    }
                },
            },
            legend: {
                labels: {
                    color: 'oklch(0.705 0.015 286.067)',
                }
            },
        },
        scales: {
            x: {
                title: {
                    display: false,
                },
                ticks: {
                    color: 'oklch(0.705 0.015 286.067)',
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
                    color: 'oklch(0.705 0.015 286.067)',
                    callback: function(value) {
                        return formatNumberWithOptions(value);
                    }
                },
                offset: true,
            },
        },
    };
</script>

<style scoped>
    .chart-container {
        position: relative;
        
        .spinner-container {
            background-color: rgba(0, 0, 0, 0.75);
            border-radius: 12px;
            height: 400px;
            
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
    }
</style>