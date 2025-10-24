<script setup lang="ts">
    import { ChevronRight } from "lucide-vue-next"
    import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
    import {SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from '~/components/ui/sidebar'
    
    defineProps<{
        items: {
            title?: string
            url?: string
            icon: string
            activeIcon: string
            isActive?: boolean
            items?: {
                title: string
                url: string
            }[]
        }[]
    }>()
    
    const { open, isMobile } = useSidebar();
    const colorMode = useColorMode();
    const darkMode = computed(() => colorMode.value === 'dark');
    watch(darkMode, (newVal, oldVal) => {
        console.log(newVal);
    });
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
            <!--  Open Desktop + Mobile  -->
            <template v-if='open || isMobile'>
                <Collapsible
                    v-for='item in items'
                    :key='item.title'
                    as-child
                    :default-open='item.isActive'
                    class='group/collapsible'
                >
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
                </Collapsible>
            </template>
            
            <!--  Close Desktop -->
            <!--  add 2 icons, one fill for active state -->
            <template v-if='!open && !isMobile'>
                <NuxtLink
                    v-for='item in items'
                    :key='item.title'
                    :to='item.url'
                    class='my-2'
                >
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            :tooltip='item.title'
                            class='peer/menu-button w-full items-center gap-2 overflow-hidden rounded-md !p-8 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-12 text-sm group-data-[collapsible=icon]:!p-0 flex justify-center'
                            :class='{ "bg-muted" : item.isActive}'
                        >
                            <NuxtIcon
                                v-if='item.icon'
                                :name='item.isActive ? item.activeIcon : item.icon'
                                class='h-5 w-5'
                                :class='{ "text-secondary-foreground dark:text-green-shamrock" : item.isActive }'
                            />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </NuxtLink>
            </template>
        </SidebarMenu>
    </SidebarGroup>
</template>