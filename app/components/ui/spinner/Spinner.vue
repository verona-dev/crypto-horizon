<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { cn } from "@/lib/utils"
    
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
</script>

<template>
    <NuxtIcon
        role="status"
        aria-label="Loading"
        :class="cn('size-4 animate-pulse', props.class)"
        name='ph:flying-saucer-duotone'
        size='26'
    />
</template>
