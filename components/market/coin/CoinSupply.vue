<template>
    <Drawer v-model:open='isOpen'>
        <DrawerContent>
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
                            <SelectTrigger class='w-56 mt-4 px-5 dark:bg-primary-foreground border-ring' data-size='default'>
                                <SelectValue class='w-2/3'/>
                            </SelectTrigger>
                            
                            <SelectContent class='bg-primary-foreground'>
                                <SelectGroup>
                                    <SelectItem value='progress-bars' class='py-4 px-5'>Progress Bars</SelectItem>
                                    <SelectItem value='doughnut-chart' class='py-4 px-5'>Doughnut Chart</SelectItem>
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
                <CoinSupplyCircularProgressBars
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
    import CoinSupplyCircularProgressBars from '~/components/market/coin/CoinSupplyCircularProgressBars.vue';
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
    const isOpen = ref(showDrawer.value);
    const emit = defineEmits(['handleDrawer']);
    watch(isOpen, bool => emit('handleDrawer', bool));
</script>

<style>
    [data-vaul-drawer-direction='bottom'] {
        min-height: 85vh !important;
    }
</style>