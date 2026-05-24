<template>
    <CoinNews :coin='coin' />
</template>
<script setup lang='ts'>
    import CoinNews from '@/components/market/id/CoinNews.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
</script>