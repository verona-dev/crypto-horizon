<template>
    <CardContent class='my-10 flex flex-col lg:flex-row flex-wrap justify-center'>
        <CoinSupplyProgressBars :coin='coin' />
        
        <Tabs
            default-value='doughnut-chart'
            class='my-6 self-center w-3/4'
        >
            <TabsList class='self-center my-10 p-6'>
                <TabsTrigger value='doughnut-chart' class='m-10'>
                    Doughnut Chart
                </TabsTrigger>
                
                <TabsTrigger value='stacked-bars' class='m-10'>
                    Stacked Bars
                </TabsTrigger>
            </TabsList>
            
            <TabsContent value='doughnut-chart' class='min-h-[500px] w-1/2 mx-auto'>
                <CoinSupplyDoughnutChart :coin='coin' />
            </TabsContent>
            
            <TabsContent value='stacked-bars' class='min-h-[500px] w-11/12 mx-auto'>
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