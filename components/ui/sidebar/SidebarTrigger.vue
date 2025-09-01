<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { PanelLeft } from "lucide-vue-next"
    import { cn } from "@/lib/utils"
    import { useSidebar } from "./utils"
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar'
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
    
    const { open, toggleSidebar, isMobile } = useSidebar()
    
    const TooltipContent = {
        render() {
            return h('div', {
                class: 'flex select-none items-center gap-1 px-2'
            }, [
                h('span', { class: 'text-xl' }, '⌘'),
                h('span', 'E')
            ])
        }
    };
</script>

<template>
    <SidebarMenu :class='{ "flex items-center justify-center" : !open }'>
        <SidebarMenuItem>
            <!--  Open  -->
            <template v-if='open'>
                <SidebarMenuButton
                    @click='toggleSidebar'
                    class='flex items-center justify-between rounded-none h-16'
                    :class='{ "px-6" : open}'
                >
                    <span class='text-xs truncate'>Close Menu</span>
                    
                    <kbd class='text-foreground border-ring pointer-events-none inline-flex select-none items-center gap-1 rounded border px-3 py-1 text-[14px] opacity-100'>
                        <span class='text-xl'>⌘</span>E
                    </kbd>
                </SidebarMenuButton>
            </template>
            
            <!--  Close  -->
            <template v-else>
                <SidebarMenuButton
                    :tooltip='TooltipContent'
                    class='justify-center flex-col'
                    @click='toggleSidebar'
                >
                    <NuxtIcon
                        name='mynaui:sidebar'
                        data-sidebar='trigger'
                        data-slot='sidebar-trigger'
                        :class='cn("h-8 w-8",props.class)'
                    >
                        <PanelLeft />
                        <span class='sr-only'>Toggle Menu</span>
                    </NuxtIcon>
                </SidebarMenuButton>
            </template>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
