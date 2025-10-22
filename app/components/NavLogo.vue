<script setup lang='ts'>
    import {SidebarMenuButton, useSidebar} from '~/components/ui/sidebar'
    
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
                <!--  Desktop Open -->
                <template v-if='open && !isMobile'>
                    <SidebarMenuButton
                        class='h-full hover:bg-transparent active:bg-transparent focus:bg-transparent'
                        size='lg'
                    >
                        <div class='ml-2 great-font whitespace-normal'>
                        <h5>Crypto</h5>
                        <h5 class='ml-15'>Horizon</h5>
                        </div>
                    </SidebarMenuButton>
                </template>
                
                <!--  Desktop Close -->
                <template v-else-if='!open && !isMobile'>
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
                </template>
                
                <!--  Mobile -->
                <template v-else-if='isMobile'>
                    <SidebarMenuButton
                        tooltip='Home'
                        class='flex justify-center'
                    >
                        <h6 class='great-font'>Crypto Horizon</h6>
                    </SidebarMenuButton>
                </template>
            </NuxtLink>
        </SidebarMenuItem>
    </SidebarMenu>
</template>