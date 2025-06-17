<template>
    <MazAnimatedElement direction='up' :duration='2000'>
        <h6 class='text-center uppercase'>Max Supply: {{ maxSupply.toLocaleString() }}</h6>
    </MazAnimatedElement>
    
    <Tabs
        default-value='account'
        class='self-center w-full'
    >
        <TabsList class='self-center my-10'>
            <TabsTrigger value='account'>
                Doughnut
            </TabsTrigger>
            <TabsTrigger value='password'>
                Stacked
            </TabsTrigger>
        </TabsList>
        
        <TabsContent value='account' class='min-h-[400px] w-full'>
            <CoinSupplyDoughnutChart
                :totalSupply='totalSupply'
                :maxSupply='maxSupply'
            />
        </TabsContent>
        <TabsContent value='password' class='min-h-[400px] w-full'>
            <CoinSupplyStackedChart
                :totalSupply='totalSupply'
                :maxSupply='maxSupply'
            />
        </TabsContent>
    </Tabs>
</template>

<script setup>
import CoinSupplyDoughnutChart from '~/components/markets/cryptocurrencies/coin/CoinSupplyDoughnutChart.vue';
import CoinSupplyStackedChart from '~/components/markets/cryptocurrencies/coin/CoinSupplyStackedChart.vue';

const props = defineProps({
    totalSupply: {
        type: Number,
        default: 0,
        required: true,
    },
    maxSupply: {
        type: Number,
        default: 0,
        required: true,
    },
});

const { totalSupply, maxSupply } = toRefs(props);
</script>