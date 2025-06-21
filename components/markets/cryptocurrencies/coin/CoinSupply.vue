<template>
    <CoinSupplyProgressBars
        v-if='coin.maxSupplyChart'
        :coin='coin'
    />
    
    <p>Circulating Supply: {{ coin.circulatingSupply }} {{ coin.symbol }}</p>
    <p>Total Supply: {{ coin.totalSupplyFormatted }}   {{ coin.symbol }}</p>
    <p>Max Supply: {{ coin.maxSupply }}  {{ coin.symbol }}</p>
    <p>Volume: {{ coin.volumeFormatted }}</p>
    
    <Tabs
        default-value='doughnut-chart'
        class='self-center w-full'
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
            <CoinSupplyDoughnutChart :coin="coin" />
        </TabsContent>
        
        <TabsContent value='stacked-bars' class='min-h-[500px] w-11/12 mx-auto'>
            <CoinSupplyStackedBars :coin="coin" />
        </TabsContent>
    </Tabs>
    
    <Separator class='my-4' />
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
    console.log(coin.value);
</script>