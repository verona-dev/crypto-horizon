<script setup lang='ts'>
    import { useSidebar } from '../ui/sidebar/utils';
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar';
    const { open, isMobile } = useSidebar();
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem :class='{ "h-full" : open }'>
            <SidebarMenuButton
                class='select-none hover:cursor-default hover:bg-transparent active:bg-transparent'
                :class='{ "full h-full justify-evenly" : open }'
            >
                <NuxtImg
                    src='logo/btc-planet.png'
                    alt='crypto horizon logo'
                    width='40'
                    height='40'
                    preload
                />
                
                <div v-if='open || isMobile' class='flex flex-col font-great select-none'>
                    <h5>Crypto</h5>
                    <h5 class='ml-5'>Horizon</h5>
                </div>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
