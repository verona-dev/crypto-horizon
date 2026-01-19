<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { cn } from "@/lib/utils"
    import { useSidebar } from "../ui/sidebar/utils"
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '@/components/ui/sidebar'
    import { Kbd, KbdGroup } from '@/components/ui/kbd'
    
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
    
    const { open, toggleSidebar, isMobile } = useSidebar()
    
    const TooltipContent = defineComponent({
        name: 'TooltipContent',
        setup() {
            return () =>
                h('KbdGroup', { class: 'flex items-center gap-2' }, [
                    h('Kbd', { class: 'border rounded-md py-0.5 px-2' }, '⌘'),
                    h('span', {}, '+'),
                    h('Kbd', { class: 'border rounded-md py-0.5 px-2' }, 'E')
                ])
        }
    })
</script>

<template>
    <SidebarMenu
        class='h-14'
        :class='{ "px-1" :  open }'
    >
        <SidebarMenuItem
            :class='[
                { "flex items-center w-full h-full p-2" : open },
                { "pl-2" : !isMobile }
            ]'
        >
            <SidebarMenuButton
                @click='toggleSidebar'
                :tooltip='TooltipContent'
                class='sidebar-menu-button'
                :class='{ "flex gap-3.5" :  open }'
            >
                <NuxtIcon
                    :name='open? "ph:caret-double-left": "ph:caret-double-right"'
                    data-sidebar='trigger'
                    data-slot='sidebar-trigger'
                    :class='cn("h-4 w-4",props.class)'
                />
                
                <span v-if='open || isMobile'>Collapse</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
