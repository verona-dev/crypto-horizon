
<template>
    <div class='my-6'>
        <Bar
            :data='chartData'
            :options='chartOptions'
        />
    </div>
</template>

<script lang='ts' setup>
    import { Bar } from 'vue-chartjs';
    
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
            labels.push('Max Supply');
            data.push(coin.value.maxSupply);
            backgroundColor.push('#00b1f5');
            
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
    
    const chartData = ref({
        labels: chartContent.value?.labels,
        datasets: [
            {
                label: 'Supply',
                backgroundColor: chartContent.value?.backgroundColor,
                data: chartContent.value?.data,
            }
        ],
    });
    
    const chartOptions = ref({
        barThickness: 70,
        indexAxis: 'y',
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18
                    },
                }
            },
        },
    });
</script>