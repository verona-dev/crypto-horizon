<template>
    <NuxtIcon
        name='ph:arrow-up-right'
        :size='size'
        class='mb-0.5'
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