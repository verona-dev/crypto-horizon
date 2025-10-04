
<template>
    <div class='my-10 flex-col lg:flex-row flex items-center justify-center gap-16'>
        <div class='w-52 lg:w-[450px] h-52 lg:h-[450px]'>
            <Doughnut
                :data='data'
                :options='options'
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
    
    const content = computed(() => {
        const labels = [];
        const data = [];
        const backgroundColor = [];
        
        // If coin has max supply
        if(max_supply.value) {
            // display TOTAL and REMAINING
            // EXAMPLE: BTC, XRP, BNB
            
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
            // If coin's total supply is the same as circulating supply
            if(total_supply.value === circulating_supply.value) {
                // display only TOTAL
                // EXAMPLE: ETH
                if(total_supply.value) {
                    labels.push('Total Supply');
                    data.push(total_supply.value);
                    backgroundColor.push('#fef0ca');
                }
            }
        }
        
        return { labels, data, backgroundColor };
    });
    
    const data = ref(({
        labels: content.value?.labels,
        datasets: [
            {
                backgroundColor: ['#fef0ca', '#41B883'],
                data: content.value?.data,
                cutout: '50%',
                hoverOffset: 20,
            },
        ],
    }));
    
    const options = ref({
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