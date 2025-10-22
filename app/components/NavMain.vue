<script setup lang="ts">
    import type { LucideIcon } from "lucide-vue-next"
    import { ChevronRight } from "lucide-vue-next"
    import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
    import {SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from '~/components/ui/sidebar'
    
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
            <!--            <NavLogo />-->
            
            <Collapsible
                v-for='item in items'
                :key='item.title'
                as-child
                :default-open='item.isActive'
                class='group/collapsible'
            >
                <!--  Open Desktop + Mobile  -->
                <template v-if='open || isMobile'>
                    <!--  Home -->
                    <template v-if='item.url === "/"'>
                        <NuxtLink :to='item.url'>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip='Launch Pad'
                                    class='focus:bg-transparent peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-10 text-sm'
                                >
                                    <component>
                                        <NuxtIcon
                                            name='streamline-ultimate-color:space-rocket-earth'
                                            class='h-6 w-6'
                                        />
                                    </component>
                                    <span>{{ item.title }}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </NuxtLink>
                    </template>
                    
                    <!--  Other routes -->
                    <template v-else>
                        <SidebarMenuItem>
                            <CollapsibleTrigger as-child>
                                <!--  Mobile  -->
                                <template v-if='isMobile'>
                                    <SidebarMenuButton :tooltip='item.title'>
                                        <component :is='item.icon' v-if='item.icon' />
                                        <span>{{ item.title }}</span>
                                        <ChevronRight class='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                    </SidebarMenuButton>
                                </template>
                                
                                <!--  Open Desktop  -->
                                <template v-else>
                                    <SidebarMenuButton :tooltip='item.title' :is-active='item.isActive'>
                                        <component :is='item.icon' v-if='item.icon' />
                                        <span>{{ item.title }}</span>
                                        <ChevronRight class='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                    </SidebarMenuButton>
                                </template>
                            </CollapsibleTrigger>
                            
                            <CollapsibleContent class='mt-1.5'>
                                <SidebarMenuSub class='pl-5'>
                                    <SidebarMenuSubItem v-for='subItem in item.items' :key='subItem.title'>
                                        <SidebarMenuSubButton as-child :is-active='subItem.isActive'>
                                            <NuxtLink :to='subItem.url' class='pl-3'>
                                                <span>{{ subItem.title }}</span>
                                            </NuxtLink>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </template>
                </template>
                
                <!--  Close Desktop -->
                <template v-else-if='!open && !isMobile'>
                    <NuxtLink :to='item.url'>
                        <!--  Home -->
                        <template v-if='item.url === "/"'>
                            <SidebarMenuItem>
                                <CollapsibleTrigger>
                                    <SidebarMenuButton
                                        tooltip='Launch Pad'
                                        class='hover:bg-transparent active:bg-transparent focus:bg-transparent'
                                        size='lg'
                                    >
                                        <NuxtIcon
                                            name='streamline-ultimate-color:space-rocket-earth'
                                            class='h-8 w-8'
                                        />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                            </SidebarMenuItem>
                        </template>
                        
                        <!--  Other routes -->
                        <template v-else>
                            <SidebarMenuItem>
                                <CollapsibleTrigger :class='{ "w-full" : isMobile }'>
                                    <SidebarMenuButton :is-active='item.isActive' :tooltip='item.title'>
                                        <component :is='item.icon' v-if='item.icon' />
                                        <span>{{ item.title }}</span>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                            </SidebarMenuItem>
                        </template>
                    </NuxtLink>
                </template>
            </Collapsible>
        </SidebarMenu>
    </SidebarGroup>
</template>
