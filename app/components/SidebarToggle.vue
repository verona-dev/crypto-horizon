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
            h('span', '+'),
            h(Kbd, { class: 'border rounded-md px-2 pt-0.5' }, 'E')
        ])
    }
</script>

<template>
    <SidebarMenu :class='{ "items-center" : !open }'>
        <SidebarMenuItem>
            <!--  Open  -->
            <template v-if='open || isMobile'>
                <div class='flex justify-around items-center'>
                    <div class='ml-2 great-font whitespace-normal select-none'>
                        <h5>Crypto</h5>
                        <h5 class='ml-5'>Horizon</h5>
                    </div>
                    
                    <SidebarMenuButton @click='toggleSidebar' class='w-fit'>
                        <NuxtIcon
                            name='stash:burger-arrow-left-duotone'
                            data-sidebar='trigger'
                            data-slot='sidebar-trigger'
                            :class='cn("h-4 w-4 text-accent-foreground",props.class)'
                        >
                            <PanelLeft />
                            <span class='sr-only'>Toggle Menu</span>
                        </NuxtIcon>
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
                    >
                        <PanelLeft />
                        <span class='sr-only'>Toggle Menu</span>
                    </NuxtIcon>
                </SidebarMenuButton>
            </template>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
