<template>
    <Card class='!w-[600px] bg-accent flex flex-col gap-4 shadow-2xl'>
        <div class='px-10 flex flex-col gap-6'>
            <!--  Title  -->
            <div class='flex items-center gap-3'>
                <h3>Bitcoin Dominance</h3>
                
                <HoverCard :openDelay='200'>
                    <HoverCardTrigger class='info-icon'>
                        <NuxtIcon
                            name='radix-icons:info-circled'
                            size='25'
                            class='flex mt-1'
                        />
                    </HoverCardTrigger>
                    
                    <HoverCardContent class='hover-card-content flex-col gap-6'>
                        <span>
                            Bitcoin dominance is the market share of BTC compared against the rest of the crypto market.
                            This metric allows traders to identify potential cryptocurrency market trends and
                            decide on trading strategies. By measuring Bitcoin's proportion of the total market,
                            traders and investors can better understand how the cryptocurrency market is performing and
                            where it's headed.
                        </span>
                        
                        <span>
                            Specifically, BTC dominance represents the ratio of Bitcoin’s market capitalization to the
                            global market cap of all cryptocurrencies, where market capitalization is the total value
                            of the coins that are in circulation. Bitcoin dominance is calculated by dividing Bitcoin’s
                            current market capitalization by the global crypto market cap.
                        </span>
                    </HoverCardContent>
                </HoverCard>
            </div>
            
            <!--  Legend  -->
            <div class='flex gap-16'>
                <div
                    v-for='item in dataset'
                    :key='item'
                    class='flex flex-col  gap-2'
                >
                    <div class='flex  space-x-2 w-8 h-8'>
                        <div v-if='!item.displayInfo' class='flex items-center space-x-2'>
                            <span class='w-4 h-4 rounded-full' :style='{ backgroundColor: item.backgroundColor }'></span>
                            <span class='text-muted-foreground'>{{ item.label }}</span>
                        </div>
                        
                        <HoverCard
                            v-else
                            :openDelay='200'
                        >
                            <HoverCardTrigger class='flex items-center gap-2 text-muted-foreground'>
                                <span class='w-4 h-4 rounded-full' :style='{ backgroundColor: item.backgroundColor }'></span>
                                <span>{{ item.label }}</span>
                                
                                <NuxtIcon
                                    name='solar:list-line-duotone'
                                    size='25'
                                />
                            </HoverCardTrigger>
                            
                            <HoverCardContent class='hover-card-content flex items-stretch'>
                                <!--  Others table  -->
                                <Table class='w-60'>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Asset</TableHead>
                                            <TableHead class='flex flex-col justify-center !items-end'>Today</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    
                                    <TableBody>
                                        <TableRow v-for='item in filtered_array'>
                                            <TableCell class='font-medium '>{{ item.label }}</TableCell>
                                            <TableCell class='flex flex-col !items-end'>{{ item.value }}</TableCell>
                                        </TableRow>
                                        
                                        <TableRow class='!border-t-2 !border-t-secondary'>
                                            <TableCell>Total</TableCell>
                                            <TableCell class='flex flex-col !items-end'>{{ others_dominance_label }}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <p class='text-3xl font-bold'>{{ item.data[0] }}%</p>
                </div>
            </div>
        </div>
        
        <!--  Bar chart  -->
        <CardContent>
            <Bar
                :data='chartData'
                :options='chartOptions'
            />
        </CardContent>
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { Card, CardContent } from '~/components/ui/card/index.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    import { Bar } from 'vue-chartjs';
    import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table/index.js';
    
    const props = defineProps({
        mcap_dominance: {
            type: Object,
        }
    });
    const { mcap_dominance } = toRefs(props);
    
    const btc_dominance = computed(() => mcap_dominance.value?.btc.toFixed(1));
    const eth_dominance = computed(() => mcap_dominance.value?.eth.toFixed(1));
    const others_dominance = computed(() => (100 - btc_dominance.value - eth_dominance.value).toFixed(1));
    const others_dominance_label = formatNumber(others_dominance.value, {
        style: 'percent', compact: true, decimals: 2,
    });
    
    const filtered_array = Object.entries(mcap_dominance.value)
        .filter(([key]) => key !== 'btc' && key !== 'eth')
        .map(([key, value]) => ({
            label: key.toUpperCase(),
            value: formatNumber(value, {
                style: 'percent', compact: true, decimals: 2,
            })
        }));
    
    const dataset = ref([
        {
            label: 'Bitcoin',
            data: [btc_dominance.value],
            backgroundColor: '#fbbf24',
            borderRadius: { topLeft: 15, bottomLeft: 15 },
            borderSkipped: 'right',
        },
        {
            label: 'Ethereum',
            data: [eth_dominance.value],
            backgroundColor: '#3b82f6',
        },
        {
            label: 'Others',
            data: [others_dominance.value],
            backgroundColor: '#66686b',
            borderRadius: {
                topRight: 15, bottomRight: 15,
                topLeft: 15, bottomLeft: 15,
                borderSkipped: 'left',
            },
            displayInfo: true,
        }
    ]);
    
    const chartData = {
        labels: [''],
        datasets: dataset.value,
    };
    
    const chartOptions = {
        barThickness: 15,
        indexAxis: 'y',
        animation: {
            duration: 750,
            easing: 'easeInSine',
        },
        scales: {
            x: {
                stacked: true,
                beginAtZero: true,
                max: 100,
                ticks: {
                    display: false,
                },
                title: {
                    display: false,
                },
            },
            y: {
                stacked: true,
                title: {
                    display: false,
                },
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    title: () => '',
                    label: context => {
                        const label = context.dataset.label || '';
                        const value = context.parsed.x || context.parsed.y || 0;
                        return `${label}: ${value}%`;
                    }
                }
            },
            displayValues: {},
        },
    };
</script>

<style scoped>
    canvas {
        height: 50px !important;
        padding-right: 15px !important;
    }
</style>