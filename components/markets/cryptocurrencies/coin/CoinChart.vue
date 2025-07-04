<template>
    <div class='coin-chart'>
        This is coin chart
        {{ coin.coingecko.name}}
    </div>
</template>

<script setup>
const props = defineProps({
    coin: {
        type: Object,
        required: true
    }
});
const { coin } = toRefs(props);
</script>