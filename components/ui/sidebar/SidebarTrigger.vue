<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { PanelLeft } from "lucide-vue-next"
    import { cn } from "@/lib/utils"
    import { Button } from '@/components/ui/button'
    import { useSidebar } from "./utils"
    
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
    
    const { toggleSidebar } = useSidebar()
</script>

<template>
    <NuxtIcon
        name='gala:sidebar-right'
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        :class="cn('h-8 w-8', props.class)"
        class='hover:cursor-pointer hover:bg-gray-200'
        @click="toggleSidebar"
    >
        <PanelLeft />
        <span class="sr-only">Toggle Sidebar</span>
    </NuxtIcon>
</template>
