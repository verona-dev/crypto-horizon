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
        class='
            mobile-nav flex items-center justify-between rounded-none
            h-20 p-6
            border border-b-sidebar-ring
        '
        @click='toggleSidebar'
    >
        <NuxtIcon
            name='radix-icons:hamburger-menu'
            data-sidebar='trigger'
            data-slot='sidebar-trigger'
            :class='cn("h-10 w-10",props.class)'
        >
            <PanelLeft />
            <span class='sr-only'>Toggle Menu</span>
        </NuxtIcon>
    </SidebarMenuButton>
</template>

<style>
    .mobile-nav {
        position: fixed;
        background-color: transparent;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
    }
</style>