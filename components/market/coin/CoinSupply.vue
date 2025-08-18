<template>
    <Drawer v-model:open='isOpen' class='drawer'>
        <DrawerContent class='lg:top-30'>
            <Tabs
                default-value='progress-bars'
                class='overflow-y-auto h-full'
            >
                <DrawerHeader class='border-b border-b-ring'>
                    <div class='my-6'>
                        <!--  Title container  -->
                        <div class='flex flex-col flex-1 text-center gap-4'>
                            <DrawerTitle class='flex justify-center items-center'>
                                Coin Supply
                                
                                <!--  Close button  -->
                                <DrawerClose class='w-12 flex absolute top-15 right-10'>
                                    <NuxtIcon
                                        name='iconoir:fast-arrow-down'
                                        size='45'
                                        class='hover:bg-muted-foreground'
                                    />
                                </DrawerClose>
                            </DrawerTitle>
                            
                            <DrawerDescription class='mx-auto'>Exploring Key Metrics</DrawerDescription>
                            
                            <TabsList class='mb-0'>
                                <TabsTrigger value='progress-bars'>Progress Bars</TabsTrigger>
                                <TabsTrigger value='doughnut-chart'>Doughnut Chart</TabsTrigger>
                            </TabsList>
                        </div>
                    
                    </div>
                </DrawerHeader>
                
                <DrawerFooter class='overflow-y-auto mt-4'>
                    <TabsContent value='progress-bars'>
                        <CoinSupplyProgressBars :coin='coin' />
                    </TabsContent>
                    
                    <TabsContent value='doughnut-chart' class='mx-auto'>
                        <CoinSupplyDoughnutChart :coin='coin.livecoinwatch' />
                    </TabsContent>
                </DrawerFooter>
            </Tabs>
        </DrawerContent>
    </Drawer>
</template>

<script setup>
    import CoinSupplyProgressBars from '~/components/market/coin/CoinSupplyProgressBars.vue';
    import CoinSupplyDoughnutChart from '~/components/market/coin/CoinSupplyDoughnutChart.vue';
    
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

<style>
    [data-vaul-drawer-direction='bottom'] {
        min-height: 85vh !important;
    }
</style>