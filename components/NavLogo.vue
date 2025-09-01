<script setup lang='ts'>
    import {SidebarMenuButton, useSidebar} from '@/components/ui/sidebar'
    
    import {
        SidebarMenu,
        SidebarMenuItem,
    } from '@/components/ui/sidebar'
    
    const { open } = useSidebar();
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <NuxtLink to='/' class='flex justify-center'>
                <!--  Open -->
                <template v-if='open'>
                    <SidebarMenuButton
                        class='h-16 flex items-center justify-center
                               hover:bg-transparent active:bg-transparent focus:bg-transparent
                        '
                        size='lg'
                    >
                        <h5 v-if='open' class='custom truncate'>Crypto Horizon</h5>
                    </SidebarMenuButton>
                </template>
                
                <!--  Close -->
                <template v-else>
                    <SidebarMenuButton
                        tooltip='Startpage'
                        class='hover:bg-transparent active:bg-transparent focus:bg-transparent'
                        size='lg'
                    >
                        <NuxtIcon
                            name='my-icon:astronaut'
                            class='h-10 w-10'
                        />
                    </SidebarMenuButton>
                </template>
            
            </NuxtLink>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

<style scoped>
    .custom {
        font-family: 'Great', sans-serif;
        letter-spacing: 0.4rem;
    }
</style>