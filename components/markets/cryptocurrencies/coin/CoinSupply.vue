<template>
    <CardContent class='my-10 flex flex-col lg:flex-row flex-wrap justify-center'>
        <CoinSupplyProgressBars :coin='coin' />
        
        <Tabs
            default-value='doughnut-chart'
            class='my-10 self-center w-full xl:w-1/2'
        >
            <TabsList>
                <TabsTrigger value='doughnut-chart'>Doughnut Chart</TabsTrigger>
                <TabsTrigger value='stacked-bars'>Stacked Bars</TabsTrigger>
            </TabsList>
            
            <TabsContent value='doughnut-chart' class='min-h-[500px] xl:w-1/2 mx-auto'>
                <CoinSupplyDoughnutChart :coin='coin' />
            </TabsContent>
            
            <TabsContent value='stacked-bars' class='min-h-[500px] xl:w-11/12 mx-auto'>
                <CoinSupplyStackedBars :coin='coin' />
            </TabsContent>
        </Tabs>
    </CardContent>
</template>

<script setup>
    import CoinSupplyProgressBars from '~/components/markets/cryptocurrencies/coin/CoinSupplyProgressBars.vue';
    import CoinSupplyDoughnutChart from '~/components/markets/cryptocurrencies/coin/CoinSupplyDoughnutChart.vue';
    import CoinSupplyStackedBars from '~/components/markets/cryptocurrencies/coin/CoinSupplyStackedBars.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            default: () => ({}),
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
</script>