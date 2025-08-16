
<template>
    <Doughnut
        :data='chartData'
        :options='chartOptions'
        class='w-[500px]'
    />
</template>

<script lang='ts' setup>
    import { Doughnut } from 'vue-chartjs';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const remainingSupply = computed(() => coin.value.maxSupply - coin.value.totalSupply);
    
    const chartContent = computed(() => {
        const labels = [];
        const data = [];
        const backgroundColor = [];
        
        // If coin has max supply
        if (coin.value.maxSupply) {
            if(coin.value.totalSupply) {
                labels.push('Total Supply');
                data.push(coin.value.totalSupply);
                backgroundColor.push('#fef0ca');
            }
            
            if(remainingSupply.value) {
                labels.push('Remaining Supply');
                data.push(remainingSupply.value);
                backgroundColor.push('#41B883');
            }
        } else {
            // If coin does not have max supply
            if(coin.value.totalSupply) {
                labels.push('Total Supply');
                data.push(coin.value.totalSupply);
                backgroundColor.push('#fef0ca');
            }
            
            if(coin.value.circulatingSupply) {
                labels.push('Circulating Supply');
                data.push(coin.value.circulatingSupply);
                backgroundColor.push('#e787c0');
            }
        }
        
        return { labels, data, backgroundColor };
    });
    
    const chartData = ref(({
        labels: chartContent.value?.labels,
        datasets: [
            {
                backgroundColor: ['#fef0ca', '#41B883'],
                data: chartContent.value?.data,
                cutout: '50%',
                hoverOffset: 20,
            },
        ],
    }));
    
    const chartOptions = ref({
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18
                    }
                }
            }
        },
    });
</script>