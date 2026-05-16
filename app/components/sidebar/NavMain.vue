<script setup lang="ts">
     import type { LucideIcon } from "lucide-vue-next"
    import { ChevronRight } from "lucide-vue-next"
    import {
        Collapsible,
        CollapsibleContent,
        CollapsibleTrigger,
    } from "@/components/ui/collapsible"
    import {
        SidebarGroup,
        SidebarGroupLabel,
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem,
        SidebarMenuSub,
        SidebarMenuSubButton,
        SidebarMenuSubItem,
        useSidebar
    } from "@/components/ui/sidebar"
    
    defineProps<{
        items: {
            title: string
            url: string
            icon?: LucideIcon
            isActive?: boolean
            items?: {
                title: string
                url: string
            }[]
        }[]
    }>()
    
    const { open, isMobile } = useSidebar();
</script>

<template>
    <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu>
            <Collapsible
                v-for="item in items"
                :key="item.title"
                as-child
                :default-open="item.isActive"
                class="group/collapsible"
            >
                <NuxtLink
                    :to='item.url'
                >
                    <SidebarMenuItem>
                        <CollapsibleTrigger as-child>
                            <SidebarMenuButton
                                :tooltip='item.title'
                                :is-active='item.isActive'
                                :class='[
                                "sidebar-menu-button button-hover",
                                {"!bg-transparent dark:!text-blue-pacific" : item.isActive},
                                { "border-blue-pacific/50": !open && !isMobile && item.isActive },
                            ]'
                            >
                                <component :is="item.icon" v-if="item.icon" />
                                <span>{{ item.title }}</span>
                                <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                                    <SidebarMenuSubButton
                                        as-child
                                        :is-active='subItem.isActive'
                                        class='sidebar-menu-button hover:bg-muted'
                                        :class='{ "!bg-muted dark:!text-blue-pacific" : subItem.isActive }'
                                    >
                                        <NuxtLink :to="subItem.url">
                                            <span>{{ subItem.title }}</span>
                                        </NuxtLink>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </NuxtLink>
            </Collapsible>
        </SidebarMenu>
    </SidebarGroup>
</template>
