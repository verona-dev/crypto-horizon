<template>
    <Card class='min-h-[450px] xl:min-h-96 !w-4/5 xl:!w-[600px]'>
        <Skeleton
            v-if='!fearAndGreed.value'
            class='w-full h-full'
        />
        
        <div
            v-else
            class='card-container min-h-[450px] xl:min-h-96 animate-fadeIn'
        >
            <CardHeader class='card-header'>
                <!--  Title  -->
                <div class='card-title'>
                    <CardTitle>Crypto Fear and Greed Index</CardTitle>
                    
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
            </CardHeader>
            
            <CardContent class='card-content animate-fadeIn-2000'>
                <!--  Doughnut chart  -->
                <div class='h-48'>
                    <Doughnut
                        :data='data'
                        :options='options'
                    />
                </div>
                
                <!--  Fear and Greed labels  -->
                <div class='labels-container flex flex-col items-center gap-4'>
                    <h2 class='text-6xl'>{{ fear_and_greed_data }}</h2>
                    <h3 class='text-3xl font-great text-muted-foreground'>{{ fear_and_greed_label }}</h3>
                </div>
            </CardContent>
            
            <CardFooter class='card-footer flex flex-col md:flex-row mb-4 text-xs gap-1.5'>
                <span>Data provided by</span>
                <NuxtLink
                    to='https://coinmarketcap.com/'
                    external
                    target='_blank'
                    class='hover:underline text-primary flex items-center gap-1'
                >
                    CoinMarketCap.com
                    
                    <NewTabIcon />
                </NuxtLink>
                <span>on {{ cmc_timestamp }}</span>
            </CardFooter>
        </div>
    </Card>
</template>

<script setup>
    import { Doughnut } from 'vue-chartjs';
    import { Skeleton } from '~/components/ui/skeleton';
    import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '~/components/ui/card';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import NewTabIcon from '@/components/NewTabIcon.vue';
    import InfoIcon from '~/components/InfoIcon.vue';
    
    import dayjs from 'dayjs';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { fearAndGreed, cmcStatus } = storeToRefs(MarketStore);
    const { getFearAndGreed } = MarketStore;
    
    // const fear_and_greed_data = ref(0);
    const fear_and_greed_data = computed(() => fearAndGreed.value?.value);
    const fear_and_greed_label = computed(() => fearAndGreed.value?.value_classification);
    const cmc_timestamp = computed(() => dayjs(cmcStatus.value?.timestamp).format('MMMM D YYYY [at] HH:mm[h]'));
    
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
                top: 8, // fix chart overflow
                bottom: 8,
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
    
    onMounted(() => getFearAndGreed());
</script>

<style scoped>
    .labels-container {
        position: absolute;
        width: 100%;
        top: 64%;
        left: 0;
        text-align: center;
        transform: translateY(-60%);
        pointer-events: none;
        user-select: none;
    }
</style>