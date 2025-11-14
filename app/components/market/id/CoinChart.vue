<template>
    <Card class='coin-chart bg-background flex flex-col gap-6 p-8' v-if='chart.prices'>
        <!--  Tabs  -->
        <div class='tabs-container flex flex-col md:flex-row gap-12 md:gap-0 items-center justify-between'>
            <!--  Price + Market Cap  -->
            <Tabs
                v-model='type'
                default-value='price'
            >
                <TabsList>
                    <TabsTrigger
                        value='price'
                        class='py-1.5 px-1.5 text-xs w-16'
                    >
                        Price
                    </TabsTrigger>
                    
                    <TabsTrigger
                        value='mcap'
                        class='py-1.5 px-1.5 text-xs w-24'
                    >
                        Market Cap
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            
            <!--  Supply Drawer  -->
            <Tabs>
                <TabsList>
                    <template v-if='dark_mode'>
                        <RainbowButton
                            @click='show_drawer = true'
                            class='text-xs w-24 flex gap-2'
                        >
                            <NuxtIcon
                                name='ph:chart-pie-slice-light'
                                size='15'
                            />
                            <span>Supply</span>
                        </RainbowButton>
                    </template>
                    
                    <template v-else>
                        <div
                            @click='show_drawer = true'
                            class='rainbow-button group relative h-fit cursor-pointer items-center justify-center rounded-xl border-0 px-3 py-1 font-medium text-foreground transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))] dark:bg-background text-xs w-24 flex gap-2'
                        >
                            <NuxtIcon
                                name='ph:chart-pie-slice-light'
                                size='15'
                            />
                            <span>Supply</span>
                        </div>
                    </template>
                    
                    
                    <!--
                    <TabsTrigger
                        @click='show_drawer = true'
                        value='supply'
                        class='py-1.5 px-1.5 text-xs flex gap-1 bg-transparent'
                    >
                        <NuxtIcon
                            name='mdi-light:chart-pie'
                            size='15'
                        />
                        <span>Supply</span>
                    </TabsTrigger>
                    -->
                </TabsList>
            </Tabs>
            
            <!--  Timeframe  -->
            <Tabs v-model='timeframe'>
                <TabsList>
                    <TabsTrigger
                        v-for='interval in timeframes'
                        :key='interval.timeframe'
                        :value='interval.timeframe'
                        class='py-1.5 px-1.5 text-xs w-10'
                    >
                        {{ interval.label.toUpperCase() }}
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
        
        <!--  Chart  -->
        <div class='chart-container'>
            <div v-if='loading' class='spinner-container'>
                <div class='h-full flex flex-col items-center justify-center gap-2 pb-12'>
                    <Spinner class='size-8 text-secondary' />
                    <!-- <span class='text-muted-foreground'>Please wait a moment.</span> -->
                </div>
            </div>
            
            <div class='w-full'>
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
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { RainbowButton } from '~/components/ui/rainbow-button';
    import { Card } from '~/components/ui/card';
    import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs/index.js';
    import CoinSupply from '@/components/market/id/CoinSupply.vue';
    
    // Dayjs
    import dayjs from 'dayjs';
    import customParseFormat from 'dayjs/plugin/customParseFormat';
    dayjs.extend(customParseFormat);
    
    // Chartjs
    import { Line } from 'vue-chartjs';
    import CustomLineChart from '~/utils/CustomLineChart.js';
    import 'chartjs-adapter-date-fns';
    import annotationPlugin from 'chartjs-plugin-annotation';
    import {
        CategoryScale,
        Chart as ChartJS,
        Filler,
        Legend,
        LinearScale,
        LineController,
        LineElement,
        PointElement,
        TimeScale,
        Title,
        Tooltip
    } from 'chart.js';
    ChartJS.register(
        annotationPlugin,
        CategoryScale,
        CustomLineChart,
        Filler,
        Legend,
        LinearScale,
        LineController,
        LineElement,
        PointElement,
        TimeScale,
        Title,
        Tooltip,
    );
    
    // MarketStore
    import { useMarketStore } from '~/stores/MarketStore.js';
    import { Spinner } from '~/components/ui/spinner/index.js';
    import { storeToRefs } from 'pinia';
    
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
    
    const MarketStore = useMarketStore();
    const { setChartTimeframe, getCoinChart } = MarketStore;
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true
        }
    });
    
    const { coin } = toRefs(props);
    const { getTimeframe } = storeToRefs(MarketStore);
    
    // Tabs
    const type = ref('price');
    
    // Timeframe
    const timeframes = ref(coin.value.timeframes);
    const timeframe = computed({
        get() {
            return coin.value.timeframe;
        },
        async set(value) {
            setChartTimeframe(value);
            await getCoinChart();
        }
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
                borderColor: 'rgba(22,199,132)',
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
    
    const options = computed(() => ({
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
        // borderDash: [ 0.1, 3 ],
        plugins: {
            annotation: {
                annotations: {
/*                    line1: {
                        type: 'line',
                        yMin: chart_data.value[chart_data.value.length - 1],
                        yMax: chart_data.value[chart_data.value.length - 1],
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                    },*/
                    label1: {
                        type: 'label',
                        xValue: timestamps.value[timestamps.value.length - 1],
                        yValue: chart_data.value[chart_data.value.length - 1],
                        backgroundColor: '#2a2f46', // --muted
                        color: '#fff',
                        content: `${formatNumber(chart_data.value[chart_data.value.length - 1])}`,
                        borderRadius: 4,
                        padding: 8,
                        position: 'end',
                        yAdjust: 10,
                        xAdjust: 0,
                    },
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#1f2230', // --popover
                padding: {
                    top: 24,
                    right: 28,
                    bottom: 24,
                    left: 28
                },
                caretPadding: 16,
                caretSize: 0,
                cornerRadius: 8,
                displayColors: false, // disable the color box
                titleMarginBottom: 24,
                titleFont: {
                    size: 14,
                    weight: 'normal',
                },
                bodyFont: {
                    size: 12,
                    weight: 'bolder',
                },
                bodySpacing: 8,
                callbacks: {
                    title: function(context) {
                        return dayjs(context[0]?.parsed.x).format("MMM D, YYYY, HH:mm:ss");
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
                type: 'time',
                title: {
                    display: false,
                },
                ticks: {
                    color: 'oklch(0.705 0.015 286.067)',
                    maxTicksLimit: 7,
                    callback: function(value, index) {
                        const current_timeframe = computed(() => getTimeframe.value?.label);
                        
                        if(current_timeframe.value === '24h') {
                            if(index === 0) {
                                return dayjs(value).format('D. MMM');
                            }
                            return dayjs(value).minute(0).second(0).millisecond(0).format('HH:mm');
                        }
                        else if(current_timeframe.value === '1y') {
                            return dayjs(value).format("MMM 'YY");
                        }
                        
                        return dayjs(value).format('D. MMM');
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
                        return formatNumber(value);
                    }
                },
                offset: true,
            },
        },
    }));
    
    // Drawer
    const show_drawer = ref(false);
    const onHandleDrawer = bool => show_drawer.value = bool;
    watch(show_drawer, () => {
        // Switch to the price type once the supply drawer is closed
        if(type.value === 'supply' && !show_drawer.value) {
            nextTick(() => type.value = 'price');
        }
    });
    
    onMounted(async() => {
        await getCoinChart();
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