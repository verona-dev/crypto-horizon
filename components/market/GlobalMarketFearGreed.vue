<template>
    <Card class='fear-and-greed bg-background p-12'>
        <div v-if='fear_and_greed_label' class='relative w-52 h-52'>
            <Doughnut
                id='canvas'
                :data='data'
                :options='options'
            />
            
            <div class='labels-container'>
                <h3>{{ fear_and_greed_data }}</h3>
                <p class='text-muted-foreground'>{{ fear_and_greed_label }}</p>
            </div>
        </div>
    </Card>
</template>

<script setup>
    import { Doughnut } from 'vue-chartjs';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { fearAndGreed } = storeToRefs(MarketStore);
    // const { getCmcFearAndGreed } = MarketStore;
    
    const fear_and_greed_data = ref(25);
    // const fear_and_greed_data = computed(() => fearAndGreed.value?.value);
    const fear_and_greed_label = computed(() => fearAndGreed.value?.value_classification);
    
    const data = ref(({
        labels: ['Fear and Greed'],
        datasets: [
            {
                data: [fear_and_greed_data.value, 100 - fear_and_greed_data.value],
                backgroundColor: ['#f44336', '#ddd'],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
                cutout: '95%',
                borderRadius: 12,
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
        
        const circleRadius = 8;
        const circleX = 0;
        const circleY = -outerRadius + 2.5;
        
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
        transform: translateY(-50%);
        pointer-events: none;
        user-select: none;
    }
</style>