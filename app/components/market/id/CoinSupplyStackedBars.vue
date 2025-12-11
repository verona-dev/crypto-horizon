
<template>
    <div class='my-10 flex-col xl:flex-row flex items-center justify-center gap-16 '>
        <div class='w-full xl:w-[450px] h-96 xl:h-[450px]'>
            <Bar
                :data='data'
                :options='options'
            />
        </div>
        
        <CoinSupplyTable :coin='coin' />
    </div>

</template>

<script lang='ts' setup>
    import { Bar } from 'vue-chartjs';
    import CoinSupplyTable from '@/components/market/id/CoinSupplyTable.vue';
    
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
    const remaining_supply = computed(() => {
        if(max_supply.value) return max_supply.value - total_supply.value;
        return null;
    });
    
    const market_data_computed = computed(() => {
        const labels = [];
        const data = [];
        const backgroundColor = [];
        
        // If id has max supply
        if (max_supply.value) {
            labels.push('Max Supply');
            data.push(max_supply.value);
            backgroundColor.push('#00b1f5');
            
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
            
            if(remaining_supply.value) {
                labels.push('Remaining Supply');
                data.push(remaining_supply.value);
                backgroundColor.push('#41B883');
            }
        } else {
            // If id does not have max supply
            // If id's total supply is the same as circulating supply
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
    
    const data = ref({
        labels: market_data_computed.value?.labels,
        datasets: [
            {
                label: 'Supply',
                backgroundColor: market_data_computed.value?.backgroundColor,
                data: market_data_computed.value?.data,
            }
        ],
    });
    
    const options = ref({
        barThickness: 75,
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
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