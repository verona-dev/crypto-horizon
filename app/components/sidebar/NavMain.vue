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
                                :class="[
                                  'sidebar-menu-button hover:bg-muted !hover:rounded-2xl my-1',
                                  { 'dark:!text-blue-pacific': item.isActive },
                                ]"
                            >
                                <component :is="item.icon" v-if="item.icon" />
                                <span>{{ item.title }}</span>
                                <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </NuxtLink>
                        
                        <!--   Open Menu  -->
                        <SidebarMenuButton
                            v-else
                            :tooltip='item.title'
                            :is-active='item.isActive'
                            :class='[
                                "sidebar-menu-button hover:bg-muted !hover:rounded-2xl !h-9",
                                { "!bg-transparent dark:!text-blue-pacific": item.isActive },
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
                                            "sidebar-menu-button pl-3",
                                            {"!bg-transparent dark:!text-blue-pacific" : subItem.isActive },
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

<style>
    .sidebar-menu-button {
        @reference w-full overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-1 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:text-sidebar-accent-foreground h-10 focus:bg-transparent flex items-center gap-3 hover:bg-muted/50;
    }
</style>