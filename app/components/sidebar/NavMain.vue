<script setup lang="ts">
    import { ChevronRight } from 'lucide-vue-next'
    import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
    import {SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from '@/components/ui/sidebar'
    
    defineProps<{
        items: {
            title?: string
            url?: string
            icon?: string
            rocket?: string
            planets?: string[]
            activeIcon?: string
            isActive?: boolean
            items?: {
                title?: string
                url?: string
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
                { "px-1" :  open }
            ]'
        >
            <!--  Open Desktop + Mobile  -->
            <template v-if='open || isMobile'>
                <template v-for='item in items' :key='item.title'>
                    <!--  Home -->
                    <NuxtLink
                        v-if='item.url === "/" && !item.items?.length'
                        :to='item.url'
                    >
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip='Launch Pad'
                                class='sidebar-menu-button'
                            >
                                <NuxtIcon
                                    :name='item.icon'
                                    class='h-4 w-4 dark:text-green-shamrock/75'
                                    :class='{ "animate-rocket" : !isMobile }'
                                />
                                <span>{{ item.title }}</span>
                                
                                <div class='relative h-4 w-4'>
                                    <NuxtIcon
                                        v-for='planet in item.planets'
                                        :key='planet'
                                        :name='planet'
                                        class='h-full w-full dark:text-green-shamrock/75 absolute'
                                        :class='{ "animate-planet" : !isMobile }'
                                    />
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </NuxtLink>
                    
                    <!--  Other routes -->
                    <Collapsible
                        v-else
                        as-child
                        :default-open='item.isActive'
                        class='group/collapsible'
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger as-child>
                                <!--  Mobile  -->
                                <template v-if='isMobile'>
                                    <SidebarMenuButton
                                        :tooltip='item.title'
                                        :class='{ "!bg-transparent dark:!text-green-shamrock" : item.isActive }'
                                    >
                                        <component :is='item.icon' v-if='item.icon' />
                                        <span>{{ item.title }}</span>
                                        <ChevronRight class='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                    </SidebarMenuButton>
                                </template>
                                
                                <!--  Open Desktop  -->
                                <template v-else>
                                    <SidebarMenuButton
                                        :tooltip='item.title'
                                        :is-active='item.isActive'
                                        class='sidebar-menu-button'
                                        :class='{ "!bg-transparent dark:!text-green-shamrock" : item.isActive}'
                                    >
                                        <NuxtIcon
                                            :name='item.isActive ? item.activeIcon : item.icon'
                                            class='h-4 w-4'
                                        />
                                        <span>{{ item.title }}</span>
                                        <ChevronRight class='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                    </SidebarMenuButton>
                                </template>
                            </CollapsibleTrigger>
                            
                            <CollapsibleContent class='mt-0.5'>
                                <SidebarMenuSub class='pl-6'>
                                    <SidebarMenuSubItem v-for='subItem in item.items' :key='subItem.title'>
                                        <SidebarMenuSubButton
                                            as-child
                                            :is-active='subItem.isActive'
                                            class='sidebar-menu-button'
                                            :class='{ "!bg-muted/50 dark:!text-green-shamrock" : subItem.isActive }'
                                        >
                                            <NuxtLink :to='subItem.url' class='pl-3'>
                                                <!--  &#183;  -->
                                                <span>{{ subItem.title }}</span>
                                            </NuxtLink>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </template>
            </template>
            
            <!--  Close Desktop -->
            <template v-if='!open && !isMobile'>
                <NuxtLink
                    v-for='item in items'
                    :key='item.title'
                    :to='item.url'
                    class='my-0.5'
                >
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            :tooltip='item.title'
                            class='sidebar-menu-button'
                            :class='{ "bg-muted" : item.isActive}'
                        >
                            <NuxtIcon
                                v-if='item.icon'
                                :name='item.isActive ? item.activeIcon : item.icon'
                                class='h-4 w-4'
                                :class='{ "text-secondary-foreground dark:text-green-shamrock" : item.isActive }'
                            />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </NuxtLink>
            </template>
        </SidebarMenu>
    </SidebarGroup>
</template>

<style scoped>
    @keyframes rocket {
        0% { transform: translateY(2px); }
        50% { transform: translateY(-2px); }
        100% { transform: translateY(2px); }
    }
    
    .animate-rocket {
        animation: rocket 4s ease-in-out infinite;
    }
    
    @keyframes planet {
        0% { opacity: 0.1; }
        10% { opacity: 0.2; }
        20% { opacity: 0.4; }
        30% { opacity: 0.6; }
        40% { opacity: 0.8; }
        50% { opacity: 1; }
        60% { opacity: 0.8; }
        70% { opacity: 0.6; }
        80% { opacity: 0.4; }
        90% { opacity: 0.2; }
        100% { opacity: 0.1; }
    }
    
    .animate-planet {
        animation: planet 10s ease-in-out infinite;
    }
</style>