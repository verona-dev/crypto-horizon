<template>
    <CardFooter class='coin-footer w-full'>
        <CoinDescription :coin='coin' />
    </CardFooter>
</template>

<script setup>
    import CoinDescription from '~/components/markets/cryptocurrencies/coin/CoinDescription.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    const { coin } = toRefs(props);
</script>