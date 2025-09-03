<script setup lang='ts'>
    import {SidebarMenuButton, useSidebar} from '@/components/ui/sidebar'
    
    import {
        SidebarMenu,
        SidebarMenuItem,
    } from '@/components/ui/sidebar'
    
    const { open, isMobile } = useSidebar()
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <NuxtLink to='/' class='flex justify-center'>
                <!--  Open -->
                <template v-if='open && !isMobile'>
                    <SidebarMenuButton
                        class='h-16 flex items-center justify-center
                               hover:bg-transparent active:bg-transparent focus:bg-transparent
                        '
                        size='lg'
                    >
                        <h5 v-if='open' class='great-font'>Crypto Horizon</h5>
                    </SidebarMenuButton>
                </template>
                
                <!--  Close -->
                <template v-else-if='!open && !isMobile'>
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
                
                <!--  Mobile -->
                <template v-else-if='isMobile'>
                    <SidebarMenuButton
                        tooltip='Startpage'
                        class='flex justify-center'
                    >
                        <h5 class='custom truncate tracking-[0.2rem]'>Crypto Horizon</h5>
                    </SidebarMenuButton>
                </template>
            </NuxtLink>
        </SidebarMenuItem>
    </SidebarMenu>
</template>