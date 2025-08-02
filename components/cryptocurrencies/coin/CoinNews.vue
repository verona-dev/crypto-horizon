<template>
    <div class='coin-news'>
        this is coin news
    </div>
</template>

<script setup>
    const props = defineProps({
        symbol: String,
    });
    const { symbol } = toRefs(props);
</script>