<script setup lang="ts">
    import type { LucideIcon } from "lucide-vue-next"
    import { ChevronRight } from "lucide-vue-next"
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
</script>

<template>
    <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
            <Collapsible
                v-for="item in items"
                :key="item.title"
                as-child
                :default-open="item.isActive"
                class="group/collapsible"
            >
                <NuxtLink :to="item.url">
                    <SidebarMenuItem v-if='item.items.length > 1'>
                        <CollapsibleTrigger as-child>
                            <SidebarMenuButton :is-active="item.isActive" :tooltip="item.title">
                                <component :is="item.icon" v-if="item.icon" />
                                <span>{{ item.title }}</span>
                                <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                                    <SidebarMenuSubButton as-child>
                                        <NuxtLink :to="subItem.url">
                                            <span>{{ subItem.title }}</span>
                                        </NuxtLink>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem v-else>
                        <SidebarMenuButton :is-active="item.isActive" :tooltip="item.title">
                            <component :is="item.icon" v-if="item.icon" />
                            
                            <span>{{ item.title }}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </NuxtLink>
            </Collapsible>
        </SidebarMenu>
    </SidebarGroup>
</template>

<style scoped>
    svg {
        width: 20px;
        height: 20px;
    }
</style>