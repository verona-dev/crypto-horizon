<script setup lang='ts'>
    import type { HTMLAttributes } from 'vue'
    import { PanelLeft } from 'lucide-vue-next'
    import { cn } from '@/lib/utils'
    import { useSidebar } from './utils'
    import {SidebarMenuButton} from '~/components/ui/sidebar';
    
    const props = defineProps<{
        class?: HTMLAttributes['class']
    }>()
    
    const { toggleSidebar, isMobile } = useSidebar()
</script>

<template>
    <SidebarMenuButton
        v-if='isMobile'
        class=' mobile-nav bg-background w-full flex items-center h-20 p-6 rounded-none fixed top-0 left-0 z-50'
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
            <p class='font-great'>Crypto Horizon</p>
        </NuxtLink>
    </SidebarMenuButton>
</template>