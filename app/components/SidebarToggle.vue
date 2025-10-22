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
        return h(KbdGroup, { class: '' }, [
            h(Kbd, { class: 'border rounded-md px-2 pt-0.5' }, '⌘'),
            h('span', { class: '' }, '+'),
            h(Kbd, { class: 'border rounded-md px-2 pt-0.5' }, 'E')
        ])
    }
</script>

<template>
    <SidebarMenu class=''>
        <SidebarMenuItem class=''>
            <!--  Open  -->
            <template v-if='open || isMobile'>
                <SidebarMenuButton
                    @click='toggleSidebar'
                    class='h-full'
                    :class='[
                        { "" : open },
                        { "justify-between" : !isMobile },
                    ]'
                >
                    <div class='ml-2 great-font whitespace-normal'>
                        <h5>Crypto</h5>
                        <h5 class='ml-5'>Horizon</h5>
                    </div>
                    
                    <NuxtIcon
                        name='mynaui:sidebar'
                        data-sidebar='trigger'
                        data-slot='sidebar-trigger'
                        :class='cn("h-4 w-4 text-accent-foreground",props.class)'
                    >
                        <PanelLeft />
                        <span class='sr-only'>Toggle Menu</span>
                    </NuxtIcon>
                
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
                        :class='cn("h-4 w-4 text-accent-foreground",props.class)'
                    >
                        <PanelLeft />
                        <span class='sr-only'>Toggle Menu</span>
                    </NuxtIcon>
                </SidebarMenuButton>
            </template>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
