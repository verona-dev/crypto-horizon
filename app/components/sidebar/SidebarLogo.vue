<script setup lang='ts'>
    import { useSidebar } from '../ui/sidebar/utils';
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar';
    const { open, isMobile } = useSidebar();
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem :class='{ "h-full" : open }'>
            <!--  Open  -->
            <template v-if='open || isMobile'>
                <SidebarMenuButton class=' full h-full justify-evenly select-none hover:cursor-default hover:bg-transparent active:bg-transparent'>
                    <NuxtImg
                        src='logo/btc-planet.png'
                        alt='crypto horizon logo'
                        width='40'
                        height='40'
                        preload
                    />
                    
                    <div class='flex flex-col font-great select-none'>
                        <h5>Crypto</h5>
                        <h5 class='ml-5'>Horizon</h5>
                    </div>
                </SidebarMenuButton>
            </template>
            
            <!--  Close  -->
            <template v-else>
                <NuxtImg
                    src='logo/btc-planet.png'
                    alt='crypto horizon logo'
                    width='40'
                    height='40'
                    preload
                />
            </template>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
