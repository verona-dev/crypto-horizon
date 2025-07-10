<template>
    <div v-if='chartData' class='coin-chart'>
        This is coin chart
    </div>
</template>

<script setup>
    const props = defineProps({
        chartData: {
            type: Object,
            required: true
        }
    });
    const { chartData } = toRefs(props);
    console.log(chartData.value);
</script>

<style scoped>
    .coin-chart {}
</style>