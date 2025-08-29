<script setup lang="ts">
    import {useSidebar} from '@/components/ui/sidebar'
    
    import {
        DropdownMenu,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu'
    
    import {
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem,
    } from '@/components/ui/sidebar'
    
    const { open } = useSidebar();
</script>

<template>
    <SidebarMenu :class='{ "ml-2" : !open }'>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger class='h-full' :class='{ "ml-2" : open }'>
                    <NuxtLink to='/'>
                        <SidebarMenuButton
                            tooltip='Startpage'
                            size='lg'
                            class='flex gap-4 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent'
                        >
                            <div class='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary'>
                                <NuxtIcon
                                    name='my-icon:astronaut'
                                    size='35'
                                />
                            </div>
                            <div class="flex-1 text-left text-sm leading-tight">
                                <p class="custom truncate font-medium">Crypto Horizon</p>
                            </div>
                        </SidebarMenuButton>
                    </NuxtLink>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

<style scoped>
    p.custom {
        font-family: 'Great', sans-serif;
        letter-spacing: 0.35rem;
    }
</style>