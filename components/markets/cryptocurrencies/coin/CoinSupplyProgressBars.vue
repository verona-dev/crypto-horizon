<template>
    <MazAnimatedElement
        direction='up'
        :duration='2000'
        class='flex flex-col'
    >
        <!--  Max Supply  -->
        <div class='my-7 flex items-center justify-center'>
            <MazCircularProgressBar
                :percentage='100'
                :duration='3500'
            >
                <template #default>
                    <h6>
                        {{ formatNumberWithOptions(coin.maxSupplyChart, false) }}
                    </h6>
                </template>
            </MazCircularProgressBar>
            
            <div class='flex flex-col w-[300px]'>
                <h4 class='ml-6'>Max Supply</h4>
                <p class='ml-6 mt-2'>{{ coin.maxSupplyChart?.toLocaleString() }} {{ symbol }}</p>
            </div>
        </div>
        
        <!--  Total Supply  -->
        <div class='my-7 flex items-center justify-center'>
            <MazCircularProgressBar
                :percentage='remainingSupplyPercentage'
                :duration='2500'
                suffix='%'
                auto-color
            />
            
            <div class='flex flex-col w-[300px]'>
                <h4 class='ml-6'>Total Supply</h4>
                <p class='ml-6 mt-2'>{{ coin.totalSupplyChart?.toLocaleString() }} {{ symbol }}</p>
            </div>
        </div>
    </MazAnimatedElement>
</template>

<script setup>
    import { formatNumberWithOptions } from '~/utils/formatUtils.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            default: (() => {}),
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    
    const remainingSupplyPercentage = computed(() => (coin.value.totalSupplyChart / coin.value.maxSupplyChart) * 100);
    const symbol = computed(() => coin.value?.symbol || coin.value?.name);
</script>