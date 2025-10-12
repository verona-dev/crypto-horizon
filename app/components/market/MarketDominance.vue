<template>
    <Card class='h-78 w-4/5 xl:!w-[650px]'>
        <Skeleton
            v-if='!updated_at'
            class='w-full h-full'
        />
        
        <CardContent
            v-else
            class='flex flex-col justify-between w-full h-full p-8 animate-fadeIn-2000'
        >
            <!--  Title  -->
            <div class='flex gap-3 self-center'>
                <h5>Bitcoin Dominance</h5>
                
                <HoverCard :openDelay='200'>
                    <HoverCardTrigger class='info-icon flex items-center'>
                        <NuxtIcon
                            name='radix-icons:info-circled'
                            size='15'
                        />
                    </HoverCardTrigger>
                    
                    <HoverCardContent class='hover-card-content flex-col gap-6'>
                    <span>
                        Bitcoin dominance is the market share of BTC compared against the rest of the crypto market.
                        This metric allows traders to identify potential cryptocurrency market trends and
                        decide on trading strategies.
                    </span>
                        
                        <span>
                        By measuring Bitcoin's proportion of the total market,
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
            
            <div class='flex flex-col gap-4'>
                <!--  Legend  -->
                <div class='flex justify-around'>
                    <div
                        v-for='item in dataset'
                        :key='item'
                        class='flex flex-col gap-2'
                    >
                        <div class='flex h-8'>
                            <!--  Btc, Eth  -->
                            <div v-if='!item.displayInfo && !item.stablecoins' class='flex items-center xl:space-x-2'>
                                <span class='w-3 h-3 rounded-full' :style='{ backgroundColor: item.backgroundColor }'></span>
                                <span class='text-muted-foreground text-xs'>{{ item.name }}</span>
                            </div>
                            
                            <!--  Stablecoins  -->
                            <div v-else-if='!item.displayInfo && item.stablecoins' class='flex items-center xl:space-x-2'>
                                <HoverCard :openDelay='200'>
                                    <HoverCardTrigger class='flex items-center gap-2'>
                                        <span class='w-3 h-3 rounded-full' :style='{ backgroundColor: item.backgroundColor }'></span>
                                        
                                        <span class='text-muted-foreground text-xs'>{{ item.name }}</span>
                                        
                                        <NuxtIcon
                                            name='solar:list-line-duotone'
                                            size='15'
                                        />
                                    </HoverCardTrigger>
                                    
                                    <HoverCardContent class='hover-card-content flex flex-col justify-stretch gap-8'>
                                        <p class='underline text-sm'>Stablecoins</p>
                                        
                                        <Table class='w-60'>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Asset</TableHead>
                                                    <TableHead class='flex flex-col justify-center !items-end'>Today</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            
                                            <TableBody>
                                                <TableRow v-for='item in stablecoins_array'>
                                                    <TableCell class='text-xs'>{{ item.name }}</TableCell>
                                                    <TableCell class='flex flex-col !items-end'>{{ item.value }}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            
                            <!--  Others  -->
                            <HoverCard
                                v-else
                                :openDelay='200'
                            >
                                <HoverCardTrigger class='flex items-center gap-2'>
                                    <span class='w-3 h-3 rounded-full' :style='{ backgroundColor: item.backgroundColor }'></span>
                                    
                                    <span class='text-xs'>{{ item.name }}</span>
                                    
                                    <NuxtIcon
                                        name='solar:list-line-duotone'
                                        size='15'
                                    />
                                </HoverCardTrigger>
                                
                                <HoverCardContent class='hover-card-content flex flex-col justify-stretch gap-8'>
                                    <p class='underline text-sm'>Other Assets</p>
                                    
                                    <Table class='w-60'>
                                        <TableCaption class='text-xs'>Minor values not included.</TableCaption>
                                        
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Asset</TableHead>
                                                <TableHead class='flex flex-col justify-center !items-end'>Today</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        
                                        <TableBody>
                                            <TableRow v-for='item in others_array'>
                                                <TableCell class='text-xs'>{{ item.name }}</TableCell>
                                                <TableCell class='flex flex-col !items-end'>{{ item.value }}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        
                        <p class='text-sm lg:text-lg font-bold'>{{ item.label }}</p>
                    </div>
                </div>
                
                <!--  Bar chart  -->
                <CardContent class='px-0 pb-0'>
                    <Bar
                        :data='chartData'
                        :options='chartOptions'
                    />
                </CardContent>
            </div>
            
            <p class='text-xs self-center'>Coingecko data updated on {{ updated_at }}</p>
        </CardContent>
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { Card, CardContent } from '~/components/ui/card';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Bar } from 'vue-chartjs';
    import { Table, TableBody, TableCell, TableRow, TableCaption } from '~/components/ui/table/index.js';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime);
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { globalMarket } = storeToRefs(MarketStore);
    
    const mcap_dominance = computed(() => globalMarket.value?.market_cap_percentage);
    const updated_at = computed(() => dayjs.unix(globalMarket.value?.updated_at).format('MMM D YYYY [at] HH:mm[h]'));
    
    const btc = computed(() => mcap_dominance.value?.btc);
    const btc_label = computed(() => formatNumber(btc.value , {
        style: 'percent', decimals: 2,
    }));
    const eth = computed(() => mcap_dominance.value?.eth);
    const eth_label = computed(() => formatNumber(eth.value, {
        style: 'percent', decimals: 2,
    }));
    const usdc = computed(() => mcap_dominance.value?.usdc);
    const usdt = computed(() => mcap_dominance.value?.usdt);
    const stablecoins = computed(() => usdc.value + usdt.value);
    const stablecoins_label = computed(() => formatNumber(stablecoins.value, {
        style: 'percent', decimals: 2,
    }));
    const others_dominance = computed(() => (100 - btc.value - eth.value - stablecoins.value));
    const others_dominance_label = computed(() => formatNumber(others_dominance.value, {
        style: 'percent', decimals: 2,
    }));
    
    const others_array = computed(() => Object.entries(mcap_dominance.value)
        .filter(([key]) => key !== 'btc' && key !== 'eth' && key !== 'usdc' && key !== 'usdt')
        .map(([key, value]) => ({
            name: key.toUpperCase(),
            value: formatNumber(value, {
                style: 'percent', decimals: 2,
            })
        })));
    
    const stablecoins_array = computed(() => Object.entries(mcap_dominance.value)
        .filter(([key]) => key === 'usdc' || key === 'usdt')
        .map(([key, value]) => ({
            name: key.toUpperCase(),
            value: formatNumber(value, {
                style: 'percent', decimals: 2,
            })
        })));
    
    const dataset = computed(() => [
        {
            name: 'Bitcoin',
            data: [formatNumber(btc.value, {
                style: 'decimal', decimals: 2
            })],
            label: btc_label.value,
            backgroundColor: '#fbbf24',
            borderRadius: { topLeft: 15, bottomLeft: 15 },
            borderSkipped: 'right',
        },
        {
            name: 'Ethereum',
            data: [formatNumber(eth.value, {
                style: 'decimal', decimals: 2
            })],
            label: eth_label.value,
            backgroundColor: '#3b82f6',
        },
        {
            name: 'Stablecoins',
            data: [formatNumber(stablecoins.value, {
                style: 'decimal', decimals: 2
            })],
            label: stablecoins_label.value,
            backgroundColor: '#2f9331',
            stablecoins: true,
        },
        {
            name: 'Others',
            data: [formatNumber(others_dominance.value, {
                style: 'decimal', decimals: 2
            })],
            label: others_dominance_label.value,
            backgroundColor: '#66686b',
            borderRadius: {
                topRight: 15, bottomRight: 15,
                topLeft: 15, bottomLeft: 15,
                borderSkipped: 'left',
            },
            displayInfo: true,
        }
    ]);
    
    const chartData = computed(() => ({
        labels: [''],
        datasets: dataset.value,
    }));
    
    const chartOptions = computed(() => ({
        barThickness: 10,
        indexAxis: 'y',
        animation: {
            duration: 1500,
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
                        const label = context.dataset.name || '';
                        const value = context.parsed.x || context.parsed.y || 0;
                        return `${label}: ${value}%`;
                    }
                }
            },
            displayValues: {},
        },
    }));
</script>

<style scoped>
    canvas {
        height: 40px !important;
        padding-right: 20px !important;
    }
</style>