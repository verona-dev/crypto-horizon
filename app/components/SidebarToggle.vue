<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { PanelLeft } from "lucide-vue-next"
    import { cn } from "~/lib/utils"
    import { useSidebar } from "./ui/sidebar/utils"
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar'
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
    import { Kbd, KbdGroup } from '~/components/ui/kbd';
    
    const { open, toggleSidebar, isMobile } = useSidebar()
    
    const TooltipContent = () => {
        return h(KbdGroup, { class: 'flex gap-2' }, [
            h(Kbd, { class: 'border px-2' }, '⌘'),
            h('span', { class: '' }, '+'),
            h(Kbd, { class: 'text-xs border px-2' }, 'E')
        ])
    }
</script>

<template>
    <SidebarMenu :class='{ "flex items-center justify-center" : !open }'>
        <SidebarMenuItem :class=' { "w-full" : isMobile }'>
            <!--  Open  -->
            <template v-if='open || isMobile'>
                <SidebarMenuButton
                    @click='toggleSidebar'
                    class='w-full flex items-center justify-center rounded-none h-16'
                    :class='[
                        { "px-6" : open },
                        { "justify-between" : !isMobile },
                    ]'
                >
                    <template v-if='isMobile'>
                        <span class='text-xl truncate'>Close Menu</span>
                    </template>
                    
                    <template v-if='!isMobile'>
                        <span class='text-xs truncate'>Close Menu</span>
                    </template>
                    
                    <kbd
                        v-if='!isMobile'
                        class='text-foreground border-ring pointer-events-none inline-flex select-none items-center gap-1 rounded border px-3 py-1 text-[14px] opacity-100'
                    >
                        <span class='text-xl'>⌘</span>E
                    </kbd>
                </SidebarMenuButton>
            </template>
            
            <!--  Close  -->
            <template v-if='!open && !isMobile'>
                <SidebarMenuButton
                    :tooltip='TooltipContent'
                    class='justify-center flex-col'
                    @click='toggleSidebar'
                >
                    <NuxtIcon
                        name='mynaui:sidebar'
                        data-sidebar='trigger'
                        data-slot='sidebar-trigger'
                        :class='cn("h-8 w-8 text-accent-foreground",props.class)'
                    >
                        <PanelLeft />
                        <span class='sr-only'>Toggle Menu</span>
                    </NuxtIcon>
                </SidebarMenuButton>
            </template>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
