<template>
    <CardFooter class='coin-footer'>
        <CoinNews :coin='coin' />
    </CardFooter>
</template>
<script setup lang="ts">
    import CoinNews from '~/components/cryptocurrencies/coin/CoinNews.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
</script>