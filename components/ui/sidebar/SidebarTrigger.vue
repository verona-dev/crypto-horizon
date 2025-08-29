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
    <SidebarMenu :class='{ "ml-2" : !open }'>
        <SidebarMenuItem>
                <!--  Open  -->
                <template v-if='open'>
                    <SidebarMenuButton
                        tooltip='Close Menu'
                        class='h-10'
                        @click='toggleSidebar'
                    >
                        <div class='flex w-full'>
                            <NuxtIcon
                                name='stash:burger-arrow-left-duotone'
                                data-sidebar='trigger'
                                data-slot='sidebar-trigger'
                                :class='cn("h-6 w-6",props.class)'
                            >
                                <PanelLeft />
                                <span class='sr-only'>Toggle Menu</span>
                            </NuxtIcon>
                        </div>
                    </SidebarMenuButton>
                </template>
                
                <!--  Close  -->
                <template v-else>
                    <SidebarMenuButton
                        :tooltip='TooltipContent'
                        size="lg"
                        class='justify-center flex-col'
                        @click='toggleSidebar'
                    >
                        <NuxtIcon
                            name='stash:burger-arrow-right-duotone'
                            data-sidebar='trigger'
                            data-slot='sidebar-trigger'
                            :class='cn("h-6 w-6",props.class)'
                        
                        >
                            <PanelLeft />
                            <span class='sr-only'>Toggle Menu</span>
                        </NuxtIcon>
                    </SidebarMenuButton>
                </template>
        </SidebarMenuItem>
    </SidebarMenu>
    
    <!--
    <kbd
        class='pointer-events-none self-start inline-flex select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[14px] font-medium text-muted-foreground opacity-100'
        :class='{ "mx-auto" : !open}'
    >
        <span class='text-xl'>⌘</span>E
    </kbd>
    -->
</template>
