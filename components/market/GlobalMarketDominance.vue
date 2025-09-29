<template>
    <Card class='!w-4/5'>
        <div class='flex items-center justify-center gap-2'>
            <h3>Market Cap Dominance</h3>
            
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
        <Separator />
        
        <CardContent>
            <div class='w-full'>
                <Bar
                    :data='data'
                    :options='options'
                />
            </div>
        </CardContent>
    </Card>
</template>

<script setup>
    import { Separator } from '~/components/ui/separator/index.js';
    import { Card, CardContent, CardDescription } from '~/components/ui/card/index.js';
    import { formatNumber } from '~/utils/formatUtils.js';
    import { Bar } from 'vue-chartjs';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    
    const props = defineProps({
        mcap_dominance: {
            type: Object,
        }
    });
    const { mcap_dominance } = toRefs(props);
    console.log(JSON.parse(JSON.stringify( mcap_dominance.value )));
    
    const btc_dominance = computed(() => mcap_dominance.value?.btc.toFixed(1));
    const eth_dominance = computed(() => mcap_dominance.value?.eth.toFixed(1));
    const bnb_dominance = computed(() => mcap_dominance.value?.bnb.toFixed(1));
    const others_dominance = computed(() => 100 - btc_dominance.value - eth_dominance.value);
    
    const dominance_data = ref([
        {
            label: 'BTC',
            data: [btc_dominance.value],
            backgroundColor: '#fbbf24',
            borderRadius: { topLeft: 15, bottomLeft: 15 }
        },
        {
            label: 'Ethereum',
            data: [eth_dominance.value],
            backgroundColor: '#3b82f6',
        },
        {
            label: 'Others',
            data: [others_dominance.value],
            backgroundColor: '#9ca3af',
            borderRadius: {
                topRight: 15, bottomRight: 15,
                topLeft: 15, bottomLeft: 15,
            }
        }
    ]);
    
    const data = {
        labels: ['Bitcoin Dominance'],
        datasets: dominance_data.value,
    };
    
    const options = {
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
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 30,
                    padding: 30,
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
            }
        }
    };
</script>