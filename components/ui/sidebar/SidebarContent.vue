<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { cn } from "@/lib/utils"
    import { useSidebar } from "@/components/ui/sidebar"
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
    const { open } = useSidebar();
</script>

<template>
    <div
        data-slot="sidebar-content"
        data-sidebar="content"
        :class="cn(
        'flex min-h-0 mt-4 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
          { '': !open },
        props.class
        )"
    >        <slot />
    </div>
</template>