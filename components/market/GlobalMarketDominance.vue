<template>
    <Card class='!w-4/5'>
        <h3 class='text-center'>Market Cap Dominance</h3>
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
            borderRadius: {topRight: 15, bottomRight: 15}
        }
    ]);
    
    const data = {
        labels: ['Market Cap Dominance'],
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