<template>
    <Tabs
        default-value='doughnut-chart'
        class='self-center w-full'
    >
        <TabsList class='self-center my-10 p-6'>
            <TabsTrigger value='doughnut-chart' class='m-10'>
                Doughnut Chart
            </TabsTrigger>
            
            <TabsTrigger
                v-if='coin.maxSupplyChart'
                value='stacked-bars'
                class='m-10'
            >
                Stacked Bars
            </TabsTrigger>
        </TabsList>
        
        <MazAnimatedElement direction='up' :duration='2000'>
            <p
                v-if='coin.maxSupplyChart'
                class='text-center uppercase'
            >
                Max Supply: {{ coin.maxSupplyChart?.toLocaleString() }}
            </p>
        </MazAnimatedElement>
        
        <TabsContent value='doughnut-chart' class='min-h-[500px] w-6/12 mx-auto'>
            <CoinSupplyDoughnutChart :coin="coin" />
        </TabsContent>
        
        <TabsContent value='stacked-bars' class='min-h-[500px] w-11/12 mx-auto'>
            <CoinSupplyStackedBars :coin="coin" />
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