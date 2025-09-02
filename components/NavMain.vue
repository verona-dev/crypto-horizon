<script setup lang="ts">
    import type { LucideIcon } from 'lucide-vue-next'
    import { ChevronRight } from 'lucide-vue-next'
    import { useSidebar } from '@/components/ui/sidebar'
    import {
        Collapsible,
        CollapsibleContent,
        CollapsibleTrigger,
    } from '@/components/ui/collapsible'
    import {
        SidebarGroup,
        SidebarGroupLabel,
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem,
        SidebarMenuSub,
        SidebarMenuSubButton,
        SidebarMenuSubItem,
    } from '@/components/ui/sidebar'
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
    
    /* TODO: collapse out if parent or child are active
    const isAnyActive = item => {
        if(item.isActive) return true;
        if(item.item && item.items.some(subItem => subItem.isActive)) return true;
        return false;
    };
    */
</script>

<template>
    <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu
            :class='[
                isMobile ? "gap-8 items-stretch" : "gap-3",
                { "flex items-center": !open }
            ]'
        >
            <Collapsible
                v-for='item in items'
                :key='item.title'
                as-child
                :default-open='item.isActive'
                class='group/collapsible'
                :class='{ "w-full" : isMobile }'
            >
                <!--  Open -->
                <template v-if='open'>
                    <!--  Sub routes -->
                    <SidebarMenuItem v-if='item.items.length > 1'>
                        <CollapsibleTrigger>
                            <SidebarMenuButton
                                :is-active='item.isActive'
                                class=''
                            >
                                <component :is='item.icon' v-if='item.icon' />
                                <span>{{ item.title }}</span>
                                <ChevronRight class='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                            <SidebarMenuSub class='pl-5'>
                                <SidebarMenuSubItem v-for='subItem in item.items' :key='subItem.title'>
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
                    
                    <!--  No Sub routes  -->
                    <SidebarMenuItem v-else>
                        <NuxtLink :to='item.url'>
                            <SidebarMenuButton :is-active='item.isActive' class='w-full'>
                                <component :is='item.icon' v-if='item.icon' />
                                <span>{{ item.title }}</span>
                            </SidebarMenuButton>
                        </NuxtLink>
                    </SidebarMenuItem>
                </template>
                
                <!--  Close -->
                <template v-else>
                    <NuxtLink :to='item.url'>
                        <SidebarMenuItem>
                            <CollapsibleTrigger class='w-full'>
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

<style scoped>
    svg {
        //width: 20px;
        //height: 20px;
    }
</style>