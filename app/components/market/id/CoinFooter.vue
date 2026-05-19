<template>
    <CardFooter>
        <!-- News -->
        <CoinNews :coin='coin' />
    </CardFooter>
</template>
<script setup lang='ts'>
    import CoinNews from '@/components/market/id/CoinNews.vue';
    import { CardFooter } from '~/components/ui/card';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
</script>