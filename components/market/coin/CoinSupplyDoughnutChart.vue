
<template>
    <div class='my-10 flex-col lg:flex-row flex items-center justify-center gap-16 mx-auto'>
        <div class='w-52 xl:w-[450px] h-52 xl:h-[450px]'>
            <Doughnut
                :data='chartData'
                :options='chartOptions'
                class=''
            />
        </div>
        
        <CoinSupplyTable :coin='coin' />
    </div>
</template>

<script lang='ts' setup>
    import { Doughnut } from 'vue-chartjs';
    import CoinSupplyTable from '~/components/market/coin/CoinSupplyTable.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const market_data = computed(() => coin.value?.coingecko?.market_data);
    const max_supply = computed(() => market_data.value?.max_supply);
    const total_supply = computed(() =>  market_data.value?.total_supply);
    const circulating_supply = computed(() => market_data.value?.circulating_supply);
    const remaining_supply = computed(() => max_supply.value - total_supply.value);
    
    const chartContent = computed(() => {
        const labels = [];
        const data = [];
        const backgroundColor = [];
        
        // If coin has max supply
        if (max_supply.value) {
            if(total_supply.value) {
                labels.push('Total Supply');
                data.push(total_supply.value);
                backgroundColor.push('#fef0ca');
            }
            
            if(remaining_supply.value) {
                labels.push('Remaining Supply');
                data.push(remaining_supply.value);
                backgroundColor.push('#41B883');
            }
        } else {
            // If coin does not have max supply
            if(total_supply.value) {
                labels.push('Total Supply');
                data.push(total_supply.value);
                backgroundColor.push('#fef0ca');
            }
            
            if(circulating_supply.value) {
                labels.push('Circulating Supply');
                data.push(circulating_supply.value);
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
        maintainAspectRatio: false,
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