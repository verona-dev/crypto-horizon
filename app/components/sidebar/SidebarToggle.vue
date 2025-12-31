<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { cn } from "@/lib/utils"
    import { useSidebar } from "../ui/sidebar/utils"
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '@/components/ui/sidebar'
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
    import { Kbd, KbdGroup } from '@/components/ui/kbd';
    
    const { open, toggleSidebar, isMobile } = useSidebar()
    
    const TooltipContent = defineComponent({
        name: 'TooltipContent',
        setup() {
            return () =>
                h('KbdGroup', { class: 'flex items-center gap-2' }, [
                    h('Kbd', { class: 'border rounded-md px-2 pt-0.5' }, '⌘'),
                    h('span', {}, '+'),
                    h('Kbd', { class: 'border rounded-md px-2 pt-0.5' }, 'E')
                ])
        }
    })
</script>

<template>
    <SidebarMenu :class='{ "" : !open }'>
        <SidebarMenuItem>
            <!--  Open  -->
            <template v-if='open || isMobile'>
                <div class='flex'>
                    <SidebarMenuButton
                        @click='toggleSidebar'
                        class='flex items-center gap-3'
                    >
                        <NuxtIcon
                            name='stash:burger-arrow-left-duotone'
                            data-sidebar='trigger'
                            data-slot='sidebar-trigger'
                            :class='cn("h-4 w-4 text-accent-foreground",props.class)'
                        />
                        
                        <span>Collapse</span>
                    </SidebarMenuButton>
                </div>
            </template>
            
            <!--  Close  -->
            <template v-if='!open && !isMobile'>
                <SidebarMenuButton
                    :tooltip='TooltipContent'
                    class='justify-center flex-col'
                    @click='toggleSidebar'
                >
                    <NuxtIcon
                        name='stash:burger-arrow-right-duotone'
                        data-sidebar='trigger'
                        data-slot='sidebar-trigger'
                        :class='cn("h-4 w-4 text-accent-foreground",props.class)'
                    />
                </SidebarMenuButton>
            </template>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
