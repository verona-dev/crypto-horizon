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
    
    // const fear_and_greed_data = ref(25);
    const fear_and_greed_data = computed(() => fearAndGreed.value?.value);
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
            },
        ],
    }));
    
    function drawDataPointPlugin(chart) {
        const ctx = chart.ctx;
        const data = chart.data;
        
        const datasetMeta = chart.getDatasetMeta(0);
        
        const xCenter = datasetMeta.data[0].x;
        const yCenter = datasetMeta.data[0].y;
        const innerRadius = datasetMeta.data[0].innerRadius;
        const outerRadius = datasetMeta.data[0].outerRadius;

        const doughnutThickness = outerRadius - innerRadius;
        
        const pointerColor = 'green';
        const pointerValue = fear_and_greed_data.value;
        const pointerRadius = 0;
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
        ctx.beginPath();
        ctx.fillStyle = pointerColor;
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'white';
        ctx.roundRect(0 - 2.5, -outerRadius - 10, 5, doughnutThickness + 20, pointerRadius);
        
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    
    const options = ref({
        aspectRatio: 2,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        animation: {
            animateScale: true,
            duration: 1000,
            onComplete: function () {
                drawDataPointPlugin(this);
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