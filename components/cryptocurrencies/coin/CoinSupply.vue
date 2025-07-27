<template>
    <Drawer v-model:open='isOpen'>
        <DrawerContent>
            <DrawerHeader class='mx-auto'>
                <DrawerTitle class=''>Coin Supply</DrawerTitle>
                <!--                <DrawerDescription class='mx-auto'>Subtitle.</DrawerDescription>-->
                
                <div class='close-drawer absolute top-10 right-10'>
                    <!--  Close Drawer  -->
                    <DrawerClose>
                        <NuxtIcon
                            name='iconoir:web-window-xmark'
                            size='45'
                        />
                    </DrawerClose>
                </div>
            </DrawerHeader>
            
            <DrawerFooter class='mt-10'>
                <!--  Livecoinwatch  -->
                <CoinSupplyProgressBars :coin='coin' />
                
                <!--
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
                -->
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
</template>

<script setup>
    import CoinSupplyProgressBars from '~/components/cryptocurrencies/coin/CoinSupplyProgressBars.vue';
    import CoinSupplyDoughnutChart from '~/components/cryptocurrencies/coin/CoinSupplyDoughnutChart.vue';
    import CoinSupplyStackedBars from '~/components/cryptocurrencies/coin/CoinSupplyStackedBars.vue';
    import {
        Drawer,
        DrawerClose,
        DrawerContent,
        DrawerDescription,
        DrawerFooter,
        DrawerHeader,
        DrawerTitle,
    } from '~/components/ui/drawer/index.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        },
        showDrawer: Boolean,
    });
    
    const { coin, showDrawer } = toRefs(props);
    const isOpen = ref(showDrawer.value);
    const emit = defineEmits(['handleDrawer']);
    watch(isOpen, bool => emit('handleDrawer', bool));
</script>