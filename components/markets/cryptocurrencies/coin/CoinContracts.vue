<template>
    <div
        v-if='platforms'
        class='coin-contracts'
    >
        <h6>Contracts</h6>
        
        <div class='flex items-center'>
            <!--  First Contract  -->
            <MazBadge
                class='w-full'
                color='info'
            >
                <div class='py-1.5 pr-4 flex items-center'>
                    <p>{{ platforms[0].chain }}</p>
                </div>
            </MazBadge>
            
            <div class='vertical-separator'></div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        coin: Object,
        required: true,
    });
    
    const { coin } = toRefs(props);
    const platforms = Object.entries(coin.value.platforms).map(([key, value]) => ({
        'chain': key,
        'contract': value
    }));
</script>

<style scoped>
    .coin-contracts {}
</style>