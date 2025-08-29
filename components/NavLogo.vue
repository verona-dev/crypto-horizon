<script setup lang="ts">
    import {useSidebar} from '@/components/ui/sidebar'
    
    import {
        DropdownMenu,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu'
    
    import {
        SidebarMenu,
        SidebarMenuItem,
    } from '@/components/ui/sidebar'
    
    const { open } = useSidebar();
</script>

<template>
    <SidebarMenu :class='{ "ml-3.5" : !open }'>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger class='h-full' :class='{ "ml-3.5" : open }'>
                    <NuxtLink to='/' class='flex items-center justify-center gap-4 hover:text-green-deco'>
                        <div class='flex aspect-square items-center justify-center rounded-lg'>
                            <NuxtIcon
                                name='my-icon:astronaut'
                                class='transition-all duration-400 ease-in-out'
                                :size='open ? "55" : "35"'
                            />
                        </div>
                        
                        <div v-if='open' class='flex-1 text-left text-sm leading-tight'>
                            <h6 class='custom truncate'>Crypto Horizon</h6>
                        </div>
                    </NuxtLink>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

<style scoped>
    .custom {
        font-family: 'Great', sans-serif;
        letter-spacing: 0.35rem;
    }
</style>