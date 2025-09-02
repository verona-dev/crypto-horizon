<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { PanelLeft } from "lucide-vue-next"
    import { cn } from "@/lib/utils"
    import { useSidebar } from "./utils"
    import {SidebarMenuButton} from '~/components/ui/sidebar/index';
    
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
    
    const { toggleSidebar, isMobile } = useSidebar()
</script>

<template>
    <SidebarMenuButton
        v-if='isMobile'
        class='w-fit flex items-center justify-center my-10 py-8'
        @click='toggleSidebar'
    >
        <NuxtIcon
            name='mynaui:sidebar'
            data-sidebar='trigger'
            data-slot='sidebar-trigger'
            :class='cn("h-10 w-10",props.class)'
        >
            <PanelLeft />
            <span class='sr-only'>Toggle Menu</span>
        </NuxtIcon>
    </SidebarMenuButton>
</template>
