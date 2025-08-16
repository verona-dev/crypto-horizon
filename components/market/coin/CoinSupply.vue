<template>
    <Drawer v-model:open='isOpen'>
        <!--        top-0 lg:top-40 overflow-y-auto md:overflow-hidden -->
        <DrawerContent>
            <Tabs default-value='progress-bars'>
                <DrawerHeader class='border-b border-b-ring'>
                    <div class='my-6 flex items-start justify-between px-4 relative'>
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
                
                <DrawerFooter class='overflow-y-auto'>
                    <TabsList class='my-6'>
                        <TabsTrigger value='progress-bars'>Progress Bars</TabsTrigger>
                        <TabsTrigger value='doughnut-chart'>Doughnut Chart</TabsTrigger>
                        <TabsTrigger value='stacked-bars'>Stacked Bars</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value='progress-bars' class=''>
                        <CoinSupplyProgressBars :coin='coin' />
                    </TabsContent>
                    
                    <TabsContent value='doughnut-chart' class=''>
                        <CoinSupplyDoughnutChart :coin='coin' />
                    </TabsContent>
                    
                    <TabsContent value='stacked-bars' class=''>
                        <CoinSupplyStackedBars :coin='coin' />
                    </TabsContent>
                
                </DrawerFooter>
            </Tabs>
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