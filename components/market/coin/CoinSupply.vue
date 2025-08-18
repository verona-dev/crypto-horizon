<template>
    <Drawer v-model:open='isOpen'>
        <!--        top-0 lg:top-40 overflow-y-auto md:overflow-hidden -->
        <DrawerContent class=''>
            <DrawerHeader class='border-b border-b-ring'>
                <div class='my-6 flex items-start justify-between px-4 relative'>
                    <!--  Spacer  -->
                    <div class='w-12'></div>
                    
                    <!--  Title container  -->
                    <div class='flex flex-col items-center gap-4'>
                        <DrawerTitle>Coin Supply</DrawerTitle>
                        
                        <DrawerDescription>Exploring Key Metrics</DrawerDescription>
                        
                        <Select
                            v-model='selectedChart'
                            default-value='progress-bars'
                            class=''
                        >
                            <SelectTrigger class='w-[180px] mt-4'>
                                <SelectValue placeholder='Select a chart' />
                            </SelectTrigger>
                            
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='progress-bars'>Progress Bars</SelectItem>
                                    <SelectItem value='doughnut-chart'>Doughnut Chart</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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
            
            <DrawerFooter class='mt-6 overflow-y-auto'>
                <CoinSupplyProgressBars
                    v-if='selectedChart === "progress-bars"'
                    :coin='coin'
                />
                
                <CoinSupplyDoughnutChart
                    v-if='selectedChart === "doughnut-chart"'
                    :coin='coin.livecoinwatch'
                    class='mx-auto'
                />
            </DrawerFooter>
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
    
    import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select";
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        },
        showDrawer: Boolean,
    });
    
    const { coin, showDrawer } = toRefs(props);
    const selectedChart = ref('progress-bars');
    
    watch(selectedChart, val => console.log('Chart changed to', val));
    
    
    const isOpen = ref(showDrawer.value);
    const emit = defineEmits(['handleDrawer']);
    watch(isOpen, bool => emit('handleDrawer', bool));
</script>

<style>
    [data-vaul-drawer-direction='bottom'] {
        min-height: 85vh !important;
    }
</style>