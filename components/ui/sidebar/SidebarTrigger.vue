<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { PanelLeft } from "lucide-vue-next"
    import { cn } from "@/lib/utils"
    import { useSidebar } from "./utils"
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar';
    
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
    
    const { open, toggleSidebar } = useSidebar()
</script>

<template>
    <SidebarMenu
        class='flex justify-center'
        :class='{ "items-center" : !open }'
    >
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
                            :class='cn("h-7 w-7",props.class)'
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
                    tooltip='Open Menu'
                    size="lg"
                    class=''
                    @click='toggleSidebar'
                >
                    <NuxtIcon
                        name='stash:burger-arrow-right-duotone'
                        data-sidebar='trigger'
                        data-slot='sidebar-trigger'
                        :class='cn("h-7 w-7",props.class)'
                    
                    >
                        <PanelLeft />
                        <span class='sr-only'>Toggle Menu</span>
                    </NuxtIcon>
                </SidebarMenuButton>
            </template>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
