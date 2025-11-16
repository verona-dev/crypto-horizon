<template>
    <Card
        v-if='chart.prices'
        class='coin-chart bg-background flex flex-col gap-6 p-8'
        :class='{ "bg-popover/50" : sniper_mode }'
    >
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
            
            <!--  Switch  -->
            <div class="flex items-center space-x-1">
                <Switch
                    id='sniper_mode'
                    :model-value='sniper_mode'
                    @update:model-value='onToggleSniper'
                    :class='{ "shadow-none" : !dark_mode }'
                >
                    <template #thumb>
                        <NuxtIcon
                            v-if='sniper_mode'
                            name='ph:crosshair-simple-light'
                            size='14'
                            class='mb-0.5'
                        />
                    </template>
                </Switch>
                <label for='sniper_mode' class='text-xxs cursor-pointer'>Sniper Mode</label>
            </div>
            
            <!--  Supply Drawer  -->
            <Tabs>
                <TabsList>
                    <template v-if='dark_mode'>
                        <RainbowButton
                            @click='show_drawer = true'
                            class='text-xs w-24 flex gap-2 rounded-md'
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
                <div class='h-full text-foreground flex flex-col items-center justify-center gap-2 pb-16'>
                    <Spinner class='size-8' />
                    
                    <div class='flex flex-col items-center gap-1'>
                        <span class='text-lg'>Loading data</span>
                        <span class='text-sm text-foreground/75'>Please wait a moment.</span>
                    </div>
                </div>
            </div>
            
            <div class='w-full'>
                <Line
                    ref='chart_ref'
                    v-if='chart_config.data?.datasets?.length'
                    :key='`chart-${timeframe.value}`'
                    :data='chart_config.data'
                    :options='chart_config.options'
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
    import { Spinner } from '~/components/ui/spinner/index.js';
    import { Switch } from '@/components/ui/switch';
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
    const { getTimeframe, getCoinPrice } = storeToRefs(MarketStore);
    const loading = ref(false);
    
    // Tabs
    const type = ref('price');
    
    // Switch
    const sniper_mode = ref(false);
    const onToggleSniper = () => sniper_mode.value = !sniper_mode.value;
    
    // Timeframe
    const timeframes = ref(coin.value.timeframes);
    const timeframe = ref(coin.value.timeframe);
    
    watch(timeframe, async(newTimeframe) => {
        loading.value = true;
        
        setChartTimeframe(newTimeframe);
        await getCoinChart();
        
        setTimeout(() => {
            loading.value = false;
        }, 750);
    });
    
    // Chart
    const chart = computed(() => coin.value?.chart);
    const chart_ref = ref(null);
    const timestamps = computed(() => chart.value?.prices?.map(item => item[0]));
    const prices = computed(() => chart.value?.prices?.map(item => item[1]));
    const volumes = computed(() => chart.value?.total_volumes?.map(item => item[1]));
    const m_caps = computed(() => chart.value?.market_caps?.map(item => item[1]));
    const chart_data = computed(() => type.value === 'price' ? prices.value : m_caps.value);
    const first_price = computed(() => chart_data.value[0]);
    const current_price = computed(() => getCoinPrice.value);
    
    Tooltip.positioners.fixed_tooltip = function() {
        return {
            x: 0,
            y: -80
        };
    };
    
    watch(chart_data, () => {
        const chart_instance = chart_ref.value?.chart;
        
        if (chart_instance) {
            chart_instance.update();
        }
    }, { deep: true });
    
    const chart_config = computed(() => {
        const computed_styles = {
            datasets: {
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
                    
                    if(sniper_mode.value) {
                        gradient.addColorStop(0.2, 'rgba(156,163,175, 0.8)'); // --muted-foreground
                        gradient.addColorStop(0.5, 'rgba(156,163,175, 0.6)');
                        gradient.addColorStop(0.9, 'rgba(156,163,175, 0.4)');
                        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    } else {
                        if(first_price.value > current_price.value) {
                            gradient.addColorStop(0.2, 'rgba(201,55,76, 0.7)'); // --red-brick
                            gradient.addColorStop(0.5, 'rgba(201,55,76, 0.5)');
                            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                        } else {
                            gradient.addColorStop(0.2, 'rgba(22,199,132, 0.4)');
                            gradient.addColorStop(0.5, 'rgba(22,199,132, 0.2)');
                            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                        }
                    }
                    
                    return gradient;
                },
                borderWidth: sniper_mode.value ? 0 : 1,
                pointHoverRadius: sniper_mode.value ? 16 : 5,
                pointStyle: sniper_mode.value ? 'crossRot' : 'circle',
                pointBorderColor: sniper_mode.value ? 'oklch(0.985 0 0)' : '',
                pointBorderWidth: sniper_mode.value ? 2 : 0,
            },
            custom_line: {
                color: dark_mode.value ? '#9ca3af' : '#2a2f46',
                dash_length: 1,
                dash_gap: 6,
                width: 1,
            },
            elements: {
                line: {
                    borderDash: sniper_mode.value ? [ 0.1, 3 ] : [],
                },
            },
            lineBorderColor: (first_price.value > current_price.value) ? '#c9374c' : '#00bc7d',
            tooltip: {
                body: {
                    size: sniper_mode.value ? 16 : 14,
                    weight: 'bolder',
                },
                bodySpacing: sniper_mode.value ? 0 : 8,
                caretSize: sniper_mode.value ? 0 : 8,
                padding: {
                    top: sniper_mode.value ? 12 : 20,
                    right: sniper_mode.value ? 16 : 24,
                    bottom: sniper_mode.value ? 12 : 20,
                    left: sniper_mode.value ? 16 : 24,
                },
                position: sniper_mode.value ? 'fixed_tooltip' : 'average',
            },
        };
        
        // Data
        const datasets = [{
            labels: timestamps.value, // x-axis
            data: chart_data.value, // y-axis
            
            // Line
            borderColor: computed_styles.lineBorderColor,
            borderWidth: computed_styles.datasets?.borderWidth,
            backgroundColor: computed_styles.datasets?.backgroundColor,
            fill: true,
            tension: 0.5,
            
            // Point
            pointRadius: 0,
            pointBackgroundColor: 'oklch(0.985 0 0)',
            
            pointHoverRadius: computed_styles.datasets?.pointHoverRadius,
            pointStyle: computed_styles.datasets?.pointStyle,
            pointBorderColor: computed_styles.datasets?.pointBorderColor,
            pointBorderWidth: computed_styles.datasets?.pointBorderWidth,
        }];
        
        // Options
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            // referenced in CustomLineChart.js
            custom_line: {
                color: computed_styles.custom_line.color,
                dash_length: computed_styles.custom_line.dash_length, // separate since CustomLineChart converts the array into a number so only the first one is accessible
                dash_gap: computed_styles.custom_line.dash_gap,
                width: computed_styles.custom_line.width,
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false,
            },
            animation: {
                duration: 750,
                easing: 'easeOutQuint',
            },
            elements: computed_styles.elements,
            plugins: {
                annotation: {
                    annotations: {
                        ...(!sniper_mode.value && {
                            // First price - Horizontal line - in sync with CustomLineChart.js
                            horizontal_line: {
                                type: 'line',
                                yMin: first_price.value,
                                yMax: first_price.value,
                                borderColor: computed_styles.custom_line.color,
                                borderWidth: computed_styles.custom_line.width,
                                borderDash: [ computed_styles.custom_line.dash_length, computed_styles.custom_line.dash_gap ],
                            },
                            
                            // Current Price - Tooltip
                            current_price: {
                                type: 'label',
                                xValue: timestamps.value[timestamps.value.length - 1],
                                yValue: current_price.value,
                                backgroundColor: computed_styles.lineBorderColor,
                                color: '#fff',
                                content: formatNumber(current_price.value, {
                                    style: 'decimal' , decimals: 0,
                                }),
                                borderRadius: 4,
                                padding: 6,
                                position: 'end',
                                yAdjust: 15,
                            },
                        }),
                    },
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#1f2230', // --popover
                    bodyFont: computed_styles.tooltip.body,
                    borderColor: '#393e56', // --border
                    borderWidth: 1,
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
                    caretPadding: 16,
                    caretSize: computed_styles.tooltip.caretSize,
                    cornerRadius: 8,
                    displayColors: false, // disable the color box
                    padding: computed_styles.tooltip.padding,
                    position: computed_styles.tooltip.position,
                    titleFont:  {
                        size: 14,
                        weight: 'normal',
                    },
                    titleMarginBottom: 14,
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
        };
        
        return {
            data: {
                labels: datasets[0].labels,
                datasets,
            },
            options,
        };
    });
    
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
    button[data-state='checked'] {
        background-color: var(--green-shamrock);
    }
    
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