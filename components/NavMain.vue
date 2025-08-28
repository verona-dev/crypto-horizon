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
        <!--  :class='{ "items-center" : !open }'  -->
        <SidebarMenu
            class='gap-3'
            :class='{ "flex items-center" : !open }'
        >
            <Collapsible
                v-for='item in items'
                :key='item.title'
                as-child
                :default-open='item.isActive'
                class='group/collapsible'
            >
                <!--  Open -->
                <template v-if='open'>
                    <!--  Sub routes -->
                    <SidebarMenuItem v-if='item.items.length > 1'>
                        <CollapsibleTrigger as-child>
                            <SidebarMenuButton
                                :is-active='item.isActive'
                                :tooltip='item.title'
                                class='h-10'
                            >
                                <component :is='item.icon' v-if='item.icon' />
                                <span>{{ item.title }}</span>
                                <ChevronRight class='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub class='pl-5'>
                                <SidebarMenuSubItem v-for='subItem in item.items' :key='subItem.title'>
                                    <SidebarMenuSubButton as-child :is-active='subItem.isActive'  class='h-10 mt-1'>
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
                            <SidebarMenuButton
                                :is-active='item.isActive'
                                :tooltip='item.title'
                                class='h-10'
                            >
                                <component :is='item.icon' v-if='item.icon' />
                                <span>{{ item.title }}</span>
                            </SidebarMenuButton>
                        </NuxtLink>
                    </SidebarMenuItem>
                </template>
                
                <!--  Close -->
                <template v-else>
                    <NuxtLink :to='item.url'>
                        <SidebarMenuItem v-if='item.items.length > 1'>
                            <CollapsibleTrigger as-child>
                                <SidebarMenuButton :is-active='item.isActive' :tooltip='item.title'>
                                    <component :is='item.icon' v-if='item.icon' />
                                    <span>{{ item.title }}</span>
                                    <ChevronRight class='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub class='pl-5'>
                                    <SidebarMenuSubItem v-for='subItem in item.items' :key='subItem.title' >
                                        <SidebarMenuSubButton as-child>
                                            <NuxtLink :to='subItem.url'>
                                                <span>{{ subItem.title }}</span>
                                            </NuxtLink>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                        <SidebarMenuItem v-else>
                            <SidebarMenuButton :is-active='item.isActive' :tooltip='item.title'>
                                <component :is='item.icon' v-if='item.icon' />
                                <span>{{ item.title }}</span>
                            </SidebarMenuButton>
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