<template>
    <Card
        v-if='fear_and_greed_data'
        class='bg-background flex flex-col items-center shadow-2xl h-96 p-12 relative !w-[500px]'
    >
        <!--  Title  -->
        <div class='mt-4 flex items-center gap-3'>
            <h5>CMC Crypto Fear and greed Index</h5>
            
            <HoverCard :openDelay='200'>
                <HoverCardTrigger class='info-icon'>
                    <NuxtIcon
                        name='radix-icons:info-circled'
                        size='15'
                        class='flex mt-1'
                    />
                </HoverCardTrigger>
                
                <HoverCardContent class='hover-card-content flex-col gap-6'>
                    <span>
                        The CMC Fear and Greed Index is a proprietary tool developed by CoinMarketCap that measures
                        the prevailing sentiment in the cryptocurrency market.
                    </span>
                    
                    <span>
                        This index ranges from 0 to 100,
                        where a lower value indicates extreme fear, and a higher value indicates extreme greed.
                        It helps investors understand the emotional state of the market, which can influence
                        buying and selling behaviors.
                    </span>
                    
                    <span>
                        The index provides insights into whether the market may be
                        undervalued (extreme fear) or overvalued (extreme greed).
                    </span>
                </HoverCardContent>
            </HoverCard>
        </div>
        
        <!--  Doughnut chart  -->
        <CardContent class='w-96 h-96'>
            <Doughnut
                :data='data'
                :options='options'
            />
        </CardContent>
        
        <!--  Fear and Greed labels  -->
        <div class='labels-container great-font flex flex-col items-center gap-2'>
            <h2 class='text-7xl'>{{ fear_and_greed_data }}</h2>
            <p class='text-muted-foreground'>{{ fear_and_greed_label }}</p>
        </div>
    </Card>
</template>

<script setup>
    import { Doughnut } from 'vue-chartjs';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    const MarketStore = useMarketStore();
    
    const { fearAndGreed } = storeToRefs(MarketStore);
    // const { getCmcFearAndGreed } = MarketStore;
    
    // const fear_and_greed_data = ref(100);
    const fear_and_greed_data = computed(() => fearAndGreed.value?.value);
    const fear_and_greed_label = computed(() => fearAndGreed.value?.value_classification);
    
    const data = ref(({
        labels: ['Fear and Greed'],
        datasets: [
            {
                data: [ 20, 20, 20, 20, 20 ],
                backgroundColor: [
                    '#f44336', // Extreme Fear
                    '#ff9800', // Fear
                    '#ffeb3b', // Neutral
                    '#8bc34a', // Greed
                    '#31b00e', // Extreme Greed
                ],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
                cutout: '95%',
                borderRadius: 24,
                spacing: 16,
            },
        ],
    }));
    
    function drawDataPointPlugin(chart) {
        const ctx = chart.ctx;
        const data = chart.data;
        
        const datasetMeta = chart.getDatasetMeta(0);
        
        const xCenter = datasetMeta.data[0].x;
        const yCenter = datasetMeta.data[0].y;
        const outerRadius = datasetMeta.data[0].outerRadius;
        
        const pointerValue = fear_and_greed_data.value;
        const angle = Math.PI / 180;
        
        function sumArray(arr) {
            return arr.reduce((acc, current) => acc + current, 0);
        }
        
        const dataPointArray = data.datasets[0].data.map(datapoint => {
            return datapoint;
        });
        
        const totalSum = sumArray(dataPointArray);
        const targetPointerRotation = (pointerValue / totalSum * 180) - 90;
        
        ctx.save();
        ctx.translate(xCenter, yCenter);
        ctx.rotate(angle * targetPointerRotation);
        
        const circleRadius = 12;
        const circleX = 0;
        const circleY = -outerRadius - 5;
        
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.restore();
    }
    
    const options = ref({
        aspectRatio: 2,
        responsive: true,
        maintainAspectRatio: false,
        pointerValue: fear_and_greed_data.value,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        animation: {
            animateScale: true,
            duration: 2000,
            onProgress: (animation) => {
                const chart = animation.chart;
                drawDataPointPlugin(chart);
            },
            onComplete: (animation) => {
                const chart = animation.chart;
                drawDataPointPlugin(chart);
            }
        }
    });
    
    // onMounted(() => getCmcFearAndGreed());
</script>

<style scoped>
    .labels-container {
        position: absolute;
        width: 100%;
        top: 60%;
        left: 0;
        text-align: center;
        transform: translateY(-60%);
        pointer-events: none;
        user-select: none;
    }
</style>