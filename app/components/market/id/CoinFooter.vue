<template>
    <CardFooter class='coin-footer w-full flex flex-col gap-8 xl:gap-20'>
        <!-- Links -->
        <CoinLinks
            :links='links'
            :symbol='symbol'
        />
        
        <!-- News -->
        <CoinNews :coin='coin' />
    </CardFooter>
</template>
<script setup lang='ts'>
    import CoinNews from '@/components/market/id/CoinNews.vue';
    import CoinLinks from '@/components/market/id/CoinLinks.vue';
    import { CardFooter } from '~/components/ui/card';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const links = computed(() => coin.value?.links);
    const symbol = toRef(coin.value?.symbol);
</script>