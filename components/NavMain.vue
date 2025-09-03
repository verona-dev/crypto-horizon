<script setup lang="ts">
    import type { LucideIcon } from "lucide-vue-next"
    import { ChevronRight } from "lucide-vue-next"
    import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
    import {SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from '@/components/ui/sidebar'
    
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
        <SidebarMenu
            :class='[
                isMobile ? "gap-8 items-stretch" : "gap-3",
                { "flex items-center": !open && !isMobile },
            ]'
        >
            <Collapsible
                v-for='item in items'
                :key='item.title'
                as-child
                :default-open='item.isActive'
                class='group/collapsible'
            >
                <!--  Open Desktop + Mobile  -->
                <template v-if='open || isMobile'>
                    <SidebarMenuItem>
                        <CollapsibleTrigger as-child>
                            <!--  Mobile  -->
                            <template v-if='isMobile'>
                                <SidebarMenuButton
                                    :tooltip='item.title'
                                >
                                    <component :is='item.icon' v-if='item.icon' />
                                    <span>{{ item.title }}</span>
                                    <ChevronRight class='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                </SidebarMenuButton>
                            </template>
                            
                            <!--  Desktop  -->
                            <template v-else>
                                <SidebarMenuButton
                                    :tooltip='item.title'
                                    :is-active='item.isActive'
                                >
                                    <component :is='item.icon' v-if='item.icon' />
                                    <span>{{ item.title }}</span>
                                    <ChevronRight class='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                </SidebarMenuButton>
                            </template>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                            <SidebarMenuSub class='pl-5'>
                                <SidebarMenuSubItem
                                    v-for='subItem in item.items'
                                    :key='subItem.title'
                                >
                                    <SidebarMenuSubButton
                                        as-child
                                        :is-active='subItem.isActive'
                                        class='mt-1'
                                    >
                                        <NuxtLink :to='subItem.url'>
                                            <span>{{ subItem.title }}</span>
                                        </NuxtLink>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </template>
                
                <!--  Close Desktop -->
                <template v-else-if='!open && !isMobile'>
                    <NuxtLink :to='item.url'>
                        <SidebarMenuItem>
                            <CollapsibleTrigger :class='{ "w-full" : isMobile }'>
                                <SidebarMenuButton
                                    :is-active='item.isActive'
                                    :tooltip='item.title'
                                >
                                    <component :is='item.icon' v-if='item.icon' />
                                    <span>{{ item.title }}</span>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                        </SidebarMenuItem>
                    </NuxtLink>
                </template>
            </Collapsible>
        </SidebarMenu>
    </SidebarGroup>
</template>
