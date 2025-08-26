<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { PanelLeft } from "lucide-vue-next"
    import { cn } from "@/lib/utils"
    import { useSidebar } from "./utils"
    
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
    
    const { open, toggleSidebar } = useSidebar()
</script>

<template>
    <!--
    :name='open ? "iconoir:sidebar-collapse" : "iconoir:sidebar-expand"'
    :name='open ? "tabler:layout-sidebar-right-filled" : "tabler:layout-sidebar-right-collapse-filled"'
    :name='open ? "stash:burger-arrow-left-duotone" : "stash:burger-arrow-right-duotone"'
    -->
    <NuxtIcon
        :name='open ? "stash:burger-arrow-left-duotone" : "stash:burger-arrow-right-duotone"'
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        :class="cn(
            'h-8 w-8 text-secondary hover:bg-secondary',
                    { 'text-muted-custom': open },
                    { 'hover:bg-muted-custom': !open },
                    props.class
            )"
        @click="toggleSidebar"
    >
        <PanelLeft />
        <span class="sr-only">Toggle Sidebar</span>
    </NuxtIcon>
</template>
