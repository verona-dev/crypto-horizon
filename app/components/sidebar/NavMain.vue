<script setup lang="ts">
    import type { LucideIcon } from "lucide-vue-next"
    import { ChevronRight } from "lucide-vue-next"
    import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
    import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar"
    
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
                :key="`${item.title}-${open}`"
                as-child
                :default-open="item.isActive"
                class="group/collapsible"
            >
                <SidebarMenuItem>
                    <CollapsibleTrigger as-child>
                        <!--   Closed Menu  -->
                        <NuxtLink
                            v-if="!open"
                            :to="item.url"
                            @click.prevent="!item.items?.length"
                        >
                            <SidebarMenuButton
                                :tooltip="item.title"
                                :is-active="item.isActive"
                                :class="{ 'dark:!text-primary': item.isActive }"
                            >
                                <component :is="item.icon" v-if="item.icon" />
                            </SidebarMenuButton>
                        </NuxtLink>
                        
                        <!--   Open Menu  -->
                        <SidebarMenuButton
                            v-else
                            :tooltip='item.title'
                            :is-active='item.isActive'
                            :class='[
                                "!h-9",
                                { "!bg-transparent dark:!text-primary": item.isActive },
                            ]'
                        >
                            <component :is="item.icon" v-if="item.icon" />
                            <span>{{ item.title }}</span>
                            <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                        <SidebarMenuSub class='pl-3 mb-3'>
                            <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                                <SidebarMenuSubButton
                                    as-child
                                    :is-active='subItem.isActive'
                                    :class='[
                                            "pl-3",
                                            {"!bg-transparent dark:!text-primary" : subItem.isActive },
                                        ]'
                                >
                                    <NuxtLink
                                        :to="subItem.url"
                                        class='!h-9'
                                    >
                                        <span>{{ subItem.title }}</span>
                                    </NuxtLink>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        </SidebarMenu>
    </SidebarGroup>
</template>