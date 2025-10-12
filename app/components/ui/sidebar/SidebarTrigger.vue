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
        class=' mobile-nav bg-background flex items-center h-20 p-6 border border-b-sidebar-ring rounded-none'
        :class='isMobile ? "gap-8" : "justify-between"'
    >
        <NuxtIcon
            name='radix-icons:hamburger-menu'
            data-sidebar='trigger'
            data-slot='sidebar-trigger'
            :class='cn("h-7 w-7",props.class)'
            @click='toggleSidebar'
        >
            <PanelLeft />
            <span class='sr-only'>Toggle Menu</span>
        </NuxtIcon>
        
        <NuxtLink to='/'>
            <p class='great-font'>Crypto Horizon</p>
        </NuxtLink>
    </SidebarMenuButton>
</template>

<style>
    .mobile-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
    }
</style>