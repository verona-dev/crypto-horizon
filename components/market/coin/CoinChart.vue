<template>
    <div v-if='chartData.prices' class='coin-chart'>
        <div class='tabs-container flex items-center justify-between'>
            <Tabs
                v-model='tab'
                @update:model-value='onUpdate'
                default-value='price'
                class='inline'
            >
                <TabsList class='my-10 gap-x-1 py-6.5 px-1'>
                    <TabsTrigger
                        value='price'
                        class='py-5 px-4
                               dark:data-[state=active]:bg-tertiary dark:text-muted-foreground dark:hover:text-foreground
                               rounded-md
                               focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xl
                        '
                    >
                        Price
                    </TabsTrigger>
                    
                    <TabsTrigger
                        value='mcap'
                        class='py-5.5 px-4
                               dark:data-[state=active]:bg-tertiary dark:text-muted-foreground dark:hover:text-foreground
                               rounded-md
                               focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xl
                        '
                    >
                        Market Cap
                    </TabsTrigger>
                    
                    <TabsTrigger
                        @click='showDrawer = true'
                        value='supply'
                        class='py-5.5 px-4
                               dark:data-[state=active]:bg-tertiary dark:text-muted-foreground dark:hover:text-foreground
                               rounded-md
                               focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xl
                        '
                    >
                        <NuxtIcon
                            name='mdi-light:chart-pie'
                            size='30'
                        />
                        Supply
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            
            <Tabs
                v-model='range'
                @update:model-value='onUpdate'
                default-value='price'
                class='inline'
            >
                <TabsList class='my-10 gap-x-1 py-6.5 px-1'>
                    <TabsTrigger
                        value='1'
                        class='py-5 px-4
                               dark:data-[state=active]:bg-tertiary dark:text-muted-foreground dark:hover:text-foreground
                               rounded-md
                               focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xl
                        '
                    >
                        1D
                    </TabsTrigger>
                    
                    <TabsTrigger
                        value='7'
                        class='py-5 px-4
                               dark:data-[state=active]:bg-tertiary dark:text-muted-foreground dark:hover:text-foreground
                               rounded-md
                               focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xl
                        '
                    >
                        7D
                    </TabsTrigger>
                    
                    <TabsTrigger
                        value='30'
                        class='py-5 px-4
                               dark:data-[state=active]:bg-tertiary dark:text-muted-foreground dark:hover:text-foreground
                               rounded-md
                               focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xl
                        '
                    >
                        30D
                    </TabsTrigger>
                    
                    <TabsTrigger
                        value='365'
                        class='py-5 px-4
                               dark:data-[state=active]:bg-tertiary dark:text-muted-foreground dark:hover:text-foreground
                               rounded-md
                               focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xl
                        '
                    >
                        1Y
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
        
        <div class='chart-container'>
            <div v-if='loading' class='spinner-container flex flex-col gap-2'>
                <MazSpinner class='spinner' color='primary' size='3em' />
                <p class='mt-2'>Recalculating</p>
                <span class='text-muted-custom mb-6'>This might take a few seconds</span>
            </div>
            
            <div class='max-w-[450px] md:max-w-[650px] lg:max-w-[900px] mx-auto'>
                <Line
                    ref='chartRef'
                    v-if='data.datasets?.length'
                    :data='data'
                    :options='options'
                    :height='400'
                    :type='"customLineChart"'
                />
            </div>
            
            <CoinSupply
                v-if='showDrawer'
                :coin='coin'
                :showDrawer='showDrawer'
                @handleDrawer='onHandleDrawer'
            />
        </div>
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs/index.js';
    import CoinSupply from '~/components/market/coin/CoinSupply.vue';
    
    import { Line } from 'vue-chartjs';
    import CustomLineChart from '~/utils/CustomLineChart.js';
    import { Chart as ChartJS, CategoryScale, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';
    ChartJS.register(CustomLineChart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Title, Tooltip, Legend);
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true
        }
    });
    
    const { coin } = toRefs(props);
    
    const onUpdate = (value) => {
        console.log(value);
    };
    
    const chartData = ref(coin.value?.chart);
    const timestamps = computed(() => chartData.value?.prices?.map(item => item[0]));
    const prices = computed(() => chartData.value?.prices?.map(item => item[1]));
    const volumes = computed(() => chartData.value?.total_volumes?.map(item => item[1]));
    const mCaps = computed(() => chartData.value?.market_caps?.map(item => item[1]));
    
    const tab = ref('price');
    const range = ref('1d');
    const activeData = computed(() => tab.value === 'price' ? prices.value : mCaps.value);
    const loading = ref(false);
    const chartRef = ref(null);
    
    const showDrawer = ref(false);
    const onHandleDrawer = bool => showDrawer.value = bool;
    watch(showDrawer, () => {
        // Switch to the price tab once the supply drawer is closed
        if(tab.value === 'supply' && !showDrawer.value) {
            nextTick(() => tab.value = 'price');
        }
    });
    
    const data = computed(() => ({
        labels: timestamps.value, // x-axis
        datasets: [
            {
                label: '24H',
                data: activeData.value, // y-axis
                
                // Line
                borderColor: 'oklch(0.657 0.163 153.606)',
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
                pointBackgroundColor: '#3fc45a',
            },
        ],
    }));
    
    watch(activeData, () => {
        const chartInstance = chartRef.value?.chart;
        
        if (chartInstance) {
            loading.value = true;
            
            chartInstance.update();
            
            setTimeout(() => {
                loading.value = false;
            }, 600);
        }
    }, { deep: true });
    
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
                        const label = tab.value === 'price' ? 'Price' : 'Market Cap';
                        
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
                        return formatNumber(value, {
                            compact: true,
                            decimals: 1,
                        });
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
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(1px);
            border-radius: 12px;
            height: 400px;
            
            position: absolute;
            left: 0;
            right: 0;
            
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>