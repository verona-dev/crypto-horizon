<template>
    <NuxtIcon
        name='radix-icons:info-circled'
        :size='size'
        class='info-icon mt-0.5 flex bg-muted-foreground/50'
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