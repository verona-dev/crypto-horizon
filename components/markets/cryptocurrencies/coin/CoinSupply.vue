<template>
    <Tabs
        default-value='account'
        class='self-center w-full'
    >
        <TabsList class='self-center my-10 p-6'>
            <TabsTrigger value='account' class='m-10'>
                Doughnut Chart
            </TabsTrigger>
            <TabsTrigger value='password' class='m-10'>
                Stacked Bars
            </TabsTrigger>
        </TabsList>
        
        <MazAnimatedElement direction='up' :duration='2000'>
            <p class='text-center uppercase'>Max Supply: {{ coin.maxSupplyChart?.toLocaleString() }}</p>
        </MazAnimatedElement>
        
        <TabsContent value='account' class='min-h-[500px] w-6/12 mx-auto'>
            <CoinSupplyDoughnutChart
                :totalSupply='coin.totalSupplyChart'
                :maxSupply='coin.maxSupplyChart'
            />
        </TabsContent>
        <TabsContent value='password' class='min-h-[500px] w-11/12 mx-auto'>
            <CoinSupplyStackedBars
                :totalSupply='coin.totalSupplyChart'
                :maxSupply='coin.maxSupplyChart'
            />
        </TabsContent>
    </Tabs>
    
    <Separator class='my-4' />
</template>

<script setup>
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