<template>
    <Card
        v-if='chart.prices'
        class='flex flex-col gap-6 p-10'
        :class='{ "" : sniper_mode }'
    >
        <!--  Tabs  -->
        <div class='flex flex-col md:flex-row gap-12 md:gap-0 items-center justify-between'>
            <!--  Price + Market Cap  -->
            <Tabs
                v-model='valuation_tab'
                default-value='price'
            >
                <TabsList class='gap-1'>
                    <TabsTrigger
                        value='price'
                        class='data-[state=active]:bg-primary data-[state=active]:text-background'
                    >
                        Price
                    </TabsTrigger>
                    
                    <TabsTrigger
                        value='mcap'
                        class='data-[state=active]:bg-primary data-[state=active]:text-background'
                    >
                        Market Cap
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            
            <!--  Sniper Mode  -->
            <TooltipProvider>
                <UITooltip>
                    <TooltipTrigger as-child>
                        <Button
                            @click='onToggleSniper'
                            variant='outline'
                            :class='[
                                "h-9.5 relative overflow-hidden hover:bg-transparent",
                                 { "text-primary border-primary/50 hover:text-primary" : sniper_mode },
                            ]'
                        >
                            <GlowBorder
                                v-if='!sniper_mode'
                                :color='["#A07CFE", "#FE8FB5", "#FFBE7B"]'
                                :duration='20'
                                :border-width='1'
                            />
                            
                            <div class='flex items-center gap-2'>
                                <NuxtIcon
                                    name='ph:crosshair-simple-duotone'
                                    :size='20'
                                    :class='[
                                        "text-muted-foreground transition-transform duration-500 ease-in-out will-change-transform",
                                         sniper_mode ? "text-primary rotate-180" : "rotate-0",
                                    ]'
                                />
                                
                                <span :class='sniper_mode ? "text-primary" : "text-muted-foreground"'>Sniper Mode</span>
                            </div>
                        </Button>
                    </TooltipTrigger>
                    
                    <TooltipContent :side-offset='10'>
                        <p>Click to toggle Sniper mode</p>
                    </TooltipContent>
                </UITooltip>
            </TooltipProvider>
            
            <!--  Timeframe  -->
            <Tabs v-model='timeframe'>
                <TabsList>
                    <TabsTrigger
                        v-for='interval in timeframes'
                        :key='interval.timeframe'
                        :value='interval.timeframe'
                        class='data-[state=active]:bg-primary data-[state=active]:text-background'
                    >
                        {{ interval.label }}
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
                        <span class='text-xl'>Loading data</span>
                        <span class='text-foreground/75'>Please wait a moment.</span>
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
                    :height='600'
                    :type='"customLineChart"'
                />
            </div>
        </div>
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { Button } from '@/components/ui/button'
    import { Card } from '~/components/ui/card';
    import { GlowBorder } from '~/components/ui/glow-border';
    import { Spinner } from '~/components/ui/spinner/index.js';
    import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs/index.js';
    import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
    
    // Theme
    import { checkTheme } from '@/composables/checkTheme.js';
    const { isDarkTheme } = checkTheme();
    
    // Dayjs
    import dayjs from 'dayjs';
    import customParseFormat from 'dayjs/plugin/customParseFormat';
    dayjs.extend(customParseFormat);
    
    // Chartjs
    import { Line } from 'vue-chartjs';
    import CustomLineChart from '~/utils/CustomLineChart.js';
    import 'chartjs-adapter-date-fns';
    import annotationPlugin from 'chartjs-plugin-annotation';
    import { CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineController, LineElement, PointElement, TimeScale, Title, Tooltip } from 'chart.js';
    ChartJS.register(annotationPlugin, CategoryScale, CustomLineChart, Filler, Legend, LinearScale, LineController, LineElement, PointElement, TimeScale, Title, Tooltip );
    
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
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
    const valuation_tab = ref('price');
    
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
    const chart_data = computed(() => valuation_tab.value === 'price' ? prices.value : m_caps.value);
    const starting_valuation = computed(() => chart_data.value[0]);
    
    const root = document.documentElement;
    const chart1 = ref('');
    const chart2 = ref('');
    const primary = ref('');
    const accent_foreground = ref('');
    chart1.value = getComputedStyle(root).getPropertyValue('--chart-1').trim();
    chart2.value = getComputedStyle(root).getPropertyValue('--chart-2').trim();
    primary.value = getComputedStyle(root).getPropertyValue('--primary').trim();
    accent_foreground.value = getComputedStyle(root).getPropertyValue('--accent-foreground').trim();
    
    
    // Current
    const current_price = computed(() => getCoinPrice.value);
    const current_m_cap = computed(() => chart_data.value[chart_data.value.length - 1]);
    const current_valuation = computed(() => {
        if(valuation_tab.value === 'price') {
            return current_price.value;
        } else if(valuation_tab.value === 'mcap') {
            return current_m_cap.value;
        }
    });
    const current_timeframe = computed(() => getTimeframe.value?.label);
    
    // Fixed tooltip for sniper mode
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
        // Conditional data
        const computed_styles = {
            annotation: {
                starting_valuation_tooltip: {
                    backgroundColor: isDarkTheme.value ? '#606060' : '#353958', //  light-mode-primary : --secondary
                    content: valuation_tab.value === 'price' ? formatNumber(starting_valuation.value, {
                        style: 'decimal',
                    }) : formatNumber(starting_valuation.value, {
                        compact: true, style: 'decimal', decimals: 3
                    }),
                },
                current_valuation_tooltip: {
                    backgroundColor:  (starting_valuation.value > current_price.value) ? '#EA3943' : '#1f8c4d', // --destructive : random
                    content: valuation_tab.value === 'price' ? formatNumber(current_valuation.value, {
                        style: 'decimal',
                    }) : formatNumber(current_valuation.value, {
                        compact: true, style: 'decimal', decimals: 3
                    }),
                },
                borderRadius: 4,
                color: '#fff',
                padding: 6,
            },
            custom_line: {
                color: () => {
                    if(sniper_mode.value) {
                        return primary.value;
                    }
                    return accent_foreground.value;
                },
                dash_length: 1,
                dash_gap: 6,
                width: 1,
            },
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
                        if(starting_valuation.value > current_price.value) {
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
                pointBorderColor: sniper_mode.value ? primary.value : '', // --primary
                pointBorderWidth: sniper_mode.value ? 2 : 0,
            },
            elements: {
                line: {
                    borderDash: sniper_mode.value ? [ 0.1, 3 ] : [],
                },
            },
            lineBorderColor: (starting_valuation.value > current_price.value) ? '#c9374c' : '#00bc7d', // --red-brick : --progress
            scales: {
                x: {
                    get maxTicksLimit() {
                        if(current_timeframe.value === '24h' || current_timeframe.value === '1y') {
                            return 6;
                        } else if(current_timeframe.value === '7d') {
                            return 7;
                        } else if(current_timeframe.value === '30d') {
                            return 10;
                        }
                        return 8;
                    },
                },
            },
            tooltip: {
                body: {
                    bodyFont: {
                        size: sniper_mode.value ? 17 : 14,
                        weight: 'bolder',
                    },
                },
                caretSize: sniper_mode.value ? 0 : 8,
                position: sniper_mode.value ? 'fixed_tooltip' : 'average',
                titleFont:  {
                    size: sniper_mode.value ? 15 : 14,
                    weight: 'normal',
                },
                titleColor: sniper_mode.value ? '#c9374c' : '#00bc7d',
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
                            // Starting Valuation - Dotted Line - in sync with CustomLineChart.js
                            starting_valuation_line: {
                                type: 'line',
                                yMin: starting_valuation.value,
                                yMax: starting_valuation.value,
                                borderColor: computed_styles.custom_line.color,
                                borderWidth: computed_styles.custom_line.width,
                                borderDash: [ computed_styles.custom_line.dash_length, computed_styles.custom_line.dash_gap ],
                            },
                            
                            // Starting Valuation - Tooltip
                            starting_valuation_tooltip: {
                                type: 'label',
                                xValue: timestamps.value[0],
                                yValue: starting_valuation.value,
                                backgroundColor: computed_styles.annotation.starting_valuation_tooltip.backgroundColor,
                                color: computed_styles.annotation.color,
                                content: computed_styles.annotation.starting_valuation_tooltip.content,
                                borderRadius: computed_styles.annotation.borderRadius,
                                padding: computed_styles.annotation.padding,
                                position: 'start',
                                yAdjust: -15,
                            },
                            
                            // Current Valuation - Tooltip
                            current_valuation_tooltip: {
                                type: 'label',
                                xValue: timestamps.value[timestamps.value.length - 1],
                                yValue: current_valuation.value,
                                backgroundColor: computed_styles.annotation.current_valuation_tooltip.backgroundColor,
                                color: computed_styles.annotation.color,
                                content: computed_styles.annotation.current_valuation_tooltip.content,
                                borderRadius: computed_styles.annotation.borderRadius,
                                padding: computed_styles.annotation.padding,
                                position: 'end',
                                yAdjust: 15,
                            },
                        }),
                    },
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#222222',
                    bodyFont: computed_styles.tooltip.body.bodyFont,
                    bodyColor: '#f3f4f6', // light--muted
                    borderColor: '#333333', // --border
                    bodySpacing: 8,
                    borderWidth: 1,
                    callbacks: {
                        title: function(context) {
                            return dayjs(context[0]?.parsed.x).format("MMM D, YYYY, HH:mm:ss");
                        },
                        label: function(context) {
                            const index = context.dataIndex;
                            const price = formatNumber(prices.value[index]);
                            const volume = formatNumber(volumes.value[index]);
                            const m_cap = formatNumber(m_caps.value[index]);
                            
                            return [
                                `Price: ${price}`,
                                `Market Cap: ${m_cap}`,
                                `Vol: ${volume}`,
                            ];
                        }
                    },
                    caretPadding: 16,
                    caretSize: computed_styles.tooltip.caretSize,
                    cornerRadius: 8,
                    displayColors: false, // disable the color box
                    padding: {
                        top: 20,
                        right: 24,
                        bottom: 20,
                        left: 24,
                    },
                    position: computed_styles.tooltip.position,
                    titleFont:  computed_styles.tooltip.titleFont,
                    titleColor: '#c1c1c1', // --muted-foreground
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
                        maxTicksLimit: computed_styles.scales.x.maxTicksLimit,
                        callback: function(value, index, ticks) {
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
                        },
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
</script>

<style scoped>
    .chart-container {
        position: relative;
        
        .spinner-container {
            backdrop-filter: blur(3px);
            background-color: rgba(0, 0, 0, 0.25);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>