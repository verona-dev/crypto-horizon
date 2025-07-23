<template>
    <div class='my-10 flex flex-col lg:flex-row flex-wrap justify-center'>
        <Drawer>
            <!--  Open Drawer  -->
            <DrawerTrigger>Show Supply Charts</DrawerTrigger>
            
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Title</DrawerTitle>
                    <DrawerDescription>Subtitle.</DrawerDescription>
                </DrawerHeader>
                
                <DrawerFooter>
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
                    
                    <!--  Close Drawer  -->
                    <DrawerClose>
                        <Button variant="outline">
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </div>
</template>

<script setup>
    import CoinSupplyProgressBars from '~/components/markets/cryptocurrencies/coin/CoinSupplyProgressBars.vue';
    import CoinSupplyDoughnutChart from '~/components/markets/cryptocurrencies/coin/CoinSupplyDoughnutChart.vue';
    import CoinSupplyStackedBars from '~/components/markets/cryptocurrencies/coin/CoinSupplyStackedBars.vue';
    import {
        Drawer,
        DrawerClose,
        DrawerContent,
        DrawerDescription,
        DrawerFooter,
        DrawerHeader,
        DrawerTitle,
        DrawerTrigger,
    } from '@/components/ui/drawer';
    
    const props = defineProps({
        coin: {
            type: Object,
            default: () => ({}),
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
</script>