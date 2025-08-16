<template>
    <Drawer v-model:open='isOpen'>
        <DrawerContent class='top-0 md:top-40'>
            <DrawerHeader class='mt-3 mb-6 xl:mb-16'>
                <div class='flex items-center justify-between px-4 relative'>
                    <!--  Spacer  -->
                    <div class='w-12'></div>
                    
                    <!--  Title container  -->
                    <div class='flex flex-col flex-1 text-center gap-4'>
                        <DrawerTitle>Coin Supply</DrawerTitle>
                        <DrawerDescription class='mx-auto'>Exploring Key Metrics</DrawerDescription>
                    </div>
                    
                    <!--  Close button  -->
                    <DrawerClose class='w-12 flex justify-end'>
                        <NuxtIcon
                            name='iconoir:fast-arrow-down'
                            size='45'
                            class='hover:bg-muted-foreground'
                        />
                    </DrawerClose>
                </div>
            </DrawerHeader>
            
            <DrawerFooter class='mt-0'>
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
    import CoinSupplyProgressBars from '~/components/market/coin/CoinSupplyProgressBars.vue';
    import CoinSupplyDoughnutChart from '~/components/market/coin/CoinSupplyDoughnutChart.vue';
    import CoinSupplyStackedBars from '~/components/market/coin/CoinSupplyStackedBars.vue';
    
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