<template>
    <NuxtIcon
        name='ph:arrow-up-right'
        :size='size'
    />
</template>

<script setup>
    const props = defineProps({
        size: {
            type: String,
            default: '12',
        },
    });
</script>