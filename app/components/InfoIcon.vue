<template>
    <NuxtIcon
        name='ph:info'
        :size='size'
        class='info-icon mt-0.5 flex bg-muted-foreground/75'
    />
</template>

<script setup>
    const props = defineProps({
        size: {
            type: [ String, Number ],
            default: 15,
        },
    });
</script>