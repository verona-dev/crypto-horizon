<template>
    <MazAnimatedElement
        direction='up'
        :duration='2000'
        class='my-10 flex items-center justify-center'
    >
        <MazCircularProgressBar
            :percentage='remainingSupplyPercentage'
            :duration='3000'
            suffix='%'
            auto-color
        />
        
        <div class='flex flex-col'>
            <div class='mb-6'>
                <h4 class='ml-6'>Max Supply</h4>
                <p class='ml-6 mt-2'>{{ coin.maxSupplyChart?.toLocaleString() }} {{ coin.symbol }}</p>
            </div>
            <div>
                <h4 class='ml-6'>Total Supply</h4>
                <p class='ml-6 mt-2'>{{ coin.totalSupplyChart?.toLocaleString() }} {{ coin.symbol }}</p>
            </div>
        </div>
        
        
    </MazAnimatedElement>
    
    
</template>

<script setup>
    const props = defineProps({
        coin: {
            type: Object,
            default: (() => {}),
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    
    const remainingSupplyPercentage = computed(() => (coin.value.totalSupplyChart / coin.value.maxSupplyChart) * 100);
</script>