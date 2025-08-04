<template>
    <CardFooter class='coin-footer px-0 mx-auto w-full 2xl:w-[1200px]'>
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