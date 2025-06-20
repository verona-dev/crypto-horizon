<template>
    <MazAnimatedElement
        direction='up'
        :duration='2000'
        class='my-6 flex flex-col'
    >
        <!--  Max Supply  -->
        <div class='my-6 flex items-center justify-center'>
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
            
            <div class='flex flex-col w-[350px]'>
                <h5 class='ml-6'>Max Supply</h5>
                <p class='ml-6 mt-2'>{{ coin.maxSupplyChart?.toLocaleString() }} {{ symbol }}</p>
            </div>
        </div>
        
        <div class='my-6 flex flex-col lg:flex-row justify-evenly'>
            <!--  Total Supply  -->
            <div class='flex items-center justify-center'>
                <MazCircularProgressBar
                    :percentage='totalSupplyPercentage'
                    :duration='2500'
                    suffix='%'
                    auto-color
                />
                
                <div class='flex flex-col w-[350px]'>
                    <h4 class='ml-6'>Total Supply</h4>
                    <p class='ml-6 mt-2'>{{ coin.totalSupplyChart?.toLocaleString() }} {{ symbol }}</p>
                </div>
            </div>
            
            <!--  Circulating Supply  -->
            <div class='my-6 flex items-center justify-center'>
                <MazCircularProgressBar
                    :percentage='circulatingSupplyPercentage'
                    :duration='2500'
                    suffix='%'
                    auto-color
                />
                
                <div class='flex flex-col w-[350px]'>
                    <h5 class='ml-6'>Circulating Supply</h5>
                    <p class='ml-6 mt-2'>{{ coin.circulatingSupplyChart?.toLocaleString() }} {{ symbol }}</p>
                </div>
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
    console.log(coin.value.circulatingSupplyChart);
    
    const totalSupplyPercentage = computed(() => (coin.value.totalSupplyChart / coin.value.maxSupplyChart) * 100);
    const circulatingSupplyPercentage = computed(() => (coin.value.circulatingSupplyChart / coin.value.maxSupplyChart) * 100);
    const symbol = computed(() => coin.value?.symbol || coin.value?.name);
</script>