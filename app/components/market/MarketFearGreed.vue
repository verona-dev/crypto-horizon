<template>
    <Card class='h-78 !w-4/5 xl:!w-[400px]'>
        <Skeleton
            v-if='!fearAndGreed'
            class='w-full h-full'
        />
        
        <CardContent
            v-else
            class='flex flex-col items-center justify-around h-full relative p-8 animate-fadeIn-2000'
        >
            <!--  Title  -->
            <div class='flex items-center gap-3'>
                <h5>Crypto Fear and Greed Index</h5>
                
                <HoverCard :openDelay='200'>
                    <HoverCardTrigger>
                        <InfoIcon />
                    </HoverCardTrigger>
                    
                    <HoverCardContent class='flex-col gap-6'>
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
            <CardContent class='w-64 h-64 px-0 pb-0'>
                <Doughnut
                    :data='data'
                    :options='options'
                />
            </CardContent>
            
            <!--  Fear and Greed labels  -->
            <div class='labels-container great-font flex flex-col items-center gap-3'>
                <h2 class='text-5xl'>{{ fear_and_greed_data }}</h2>
                <p class='text-muted-foreground'>{{ fear_and_greed_label }}</p>
            </div>
            
            <p class='text-xs self-center'>Data provided by
                <NuxtLink
                    to='https://coinmarketcap.com/'
                    external
                    target='_blank'
                    class='hover:underline'
                >
                    CoinMarketCap.com
                </NuxtLink>
            </p>
        </CardContent>
    </Card>
</template>

<script setup>
    import { Doughnut } from 'vue-chartjs';
    import { Skeleton } from '~/components/ui/skeleton';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import InfoIcon from '~/components/InfoIcon.vue';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { fearAndGreed } = storeToRefs(MarketStore);
    // const { getCmcFearAndGreed } = MarketStore;
    
    // const fear_and_greed_data = ref(0);
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
                cutout: '94%',
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
        
        // Dot
        const circleRadius = 14;
        const circleX = 0;
        const circleY = -outerRadius - 5;
        ctx.fillStyle = 'white';
        // Dot bg
        ctx.strokeStyle = '#1f2230'; // tailwind.css from --card style
        ctx.lineWidth = 8;
        
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    
    const options = ref({
        aspectRatio: 2,
        responsive: true,
        maintainAspectRatio: false,
        pointerValue: fear_and_greed_data.value,
        layout: {
            padding: {
                left:8,
                right: 8,
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        animation: {
            animateScale: true,
            duration: 2000,
            onComplete: function () {
                drawDataPointPlugin(this);
            },
        }
    });
    
    // onMounted(() => getCmcFearAndGreed());
</script>

<style scoped>
    .labels-container {
        position: absolute;
        width: 100%;
        top: 57%;
        left: 0;
        text-align: center;
        transform: translateY(-60%);
        pointer-events: none;
        user-select: none;
    }
</style>