<template>
    <div v-if='chart.prices' class='coin-chart'>
        <div class='tabs-container flex items-center justify-between'>
            <!--  Price + Market Cap  -->
            <Tabs
                v-model='type'
                default-value='price'
                class='inline'
            >
                <TabsList class='my-10 gap-x-0.5 py-5 px-1'>
                    <TabsTrigger
                        value='price'
                        class='py-4 px-4
                               dark:data-[state=active]:bg-tertiary dark:text-muted-foreground dark:hover:text-foreground
                               rounded-md
                               focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xl
                        '
                    >
                        Price
                    </TabsTrigger>
                    
                    <TabsTrigger
                        value='mcap'
                        class='py-4 px-4
                               dark:data-[state=active]:bg-tertiary dark:text-muted-foreground dark:hover:text-foreground
                               rounded-md
                               focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xl
                        '
                    >
                        Market Cap
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            
            <!--  Supply Drawer  -->
            <Tabs v-model='type'>
                <TabsList class='my-10 gap-x-0.5 py-5 px-1 w-36'>
                    <TabsTrigger
                        @click='show_drawer = true'
                        value='supply'
                        class='py-4 px-4
                               dark:data-[state=active]:bg-accent dark:text-muted-foreground dark:hover:text-foreground
                               rounded-lg
                               focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xl
                        '
                    >
                        <NuxtIcon
                            name='mdi-light:chart-pie'
                            size='25'
                        />
                        Supply
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            
            <!--  Range  -->
            <Tabs
                v-if='ranges.length'
                v-model='timeframe'
                class='inline'
            >
                <TabsList class='my-10 gap-x-0.5 py-5 px-1'>
                    <TabsTrigger
                        v-for='range in ranges'
                        :key='range.timeframe'
                        :value='range.timeframe'
                        class='py-4 px-4
                               dark:data-[state=active]:bg-tertiary dark:text-muted-foreground dark:hover:text-foreground
                               rounded-md
                               focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xl
                        '
                    >
                        {{ range.label }}
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
        
        <div class='chart-container'>
            <div v-if='loading' class='spinner-container'>
                <div class='h-full flex flex-col items-center justify-center gap-2 pb-12'>
                    <MazSpinner size='2em' />
                    <!-- <span class='text-muted-custom'>Please wait a moment.</span> -->
                </div>
            </div>
            
            <div class='max-w-[500px] md:max-w-[650px] lg:max-w-[800px] mx-auto'>
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
                v-if='show_drawer'
                :coin='coin'
                :showDrawer='show_drawer'
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
    
    // MarketStore
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // Methods
    const {
        setTimeframe,
        getCoingeckoCoinChart,
    } = MarketStore;
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true
        }
    });
    
    const { coin } = toRefs(props);
    
    // Tabs
    const type = ref('price');
    
    // Range/Timeframe
    const ranges = toRef(MarketStore.coin, 'ranges');
    const current_range = computed(() => ranges.value?.find(range => range.timeframe === timeframe.value));
    const timeframe = toRef(MarketStore.coin, 'timeframe');
    
    watch(timeframe, async () => {
        loading.value = true;
        
        await setTimeframe(timeframe.value);
        await nextTick();
        await getCoingeckoCoinChart(timeframe.value);
        
        loading.value = false;
    });
    
    // Chart
    const chart = computed(() => coin.value?.chart);
    const chartRef = ref(null);
    const timestamps = computed(() => chart.value?.prices?.map(item => item[0]));
    const prices = computed(() => chart.value?.prices?.map(item => item[1]));
    const volumes = computed(() => chart.value?.total_volumes?.map(item => item[1]));
    const m_caps = computed(() => chart.value?.market_caps?.map(item => item[1]));
    const chart_data = computed(() => type.value === 'price' ? prices.value : m_caps.value);
    const loading = ref(false);
    
    watch(chart_data, () => {
        const chartInstance = chartRef.value?.chart;
        
        if (chartInstance) {
            chartInstance.update();
        }
    }, { deep: true });
    
    const data = computed(() => ({
        labels: timestamps.value, // x-axis
        datasets: [
            {
                data: chart_data.value, // y-axis
                
                // Line
                borderColor: 'rgba(22,199,132, 0.9)',
                borderWidth: 2,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
                    gradient.addColorStop(0.2, 'rgba(22,199,132, 0.4)');
                    gradient.addColorStop(0.5, 'rgba(22,199,132, 0.2)');
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    return gradient;
                },
                fill: true,
                tension: 0.5,
                
                // Point
                pointRadius: 0,
                pointHoverRadius: 5,
                pointBackgroundColor: 'oklch(0.985 0 0)',
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
        animation: {
            duration: 1000,
            easing: 'easeOutSine',
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
                        const label = type.value === 'price' ? 'Price' : 'Market Cap';
                        
                        return [
                            `${label}: ${amount}`,
                            `Vol: ${volume}`,
                        ];
                    }
                },
            },
            legend: {
                display: false,
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
                    maxTicksLimit: 7,
                    callback: function(value, index) {
                        const label = this.getLabelForValue(value);
                        
                        if(current_range.value.name === 'Day') {
                            if(index === 0) {
                                return dayjs().format('D. MMM');
                            }
                            return dayjs(label).minute(0).second(0).millisecond(0).format('HH:mm');
                        }
                        
                        else if(current_range.value.name === 'Year') {
                            return dayjs(label).format("MMM 'YY");
                        }
                        
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
    
    // Drawer
    const show_drawer = ref(false);
    const onHandleDrawer = bool => show_drawer.value = bool;
    watch(show_drawer, () => {
        // Switch to the price type once the supply drawer is closed
        if(type.value === 'supply' && !show_drawer.value) {
            nextTick(() => type.value = 'price');
        }
    });
</script>

<style scoped>
    .chart-container {
        position: relative;
        
        .spinner-container {
            backdrop-filter: blur(3px);
            background-color: rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>