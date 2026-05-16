<script setup lang='ts'>
    import { useSidebar } from '../ui/sidebar/utils';
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar';
    const { open, isMobile } = useSidebar();
    
    import { Rocket } from "lucide-vue-next"

</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton>
<!--                <img-->
<!--                    src='assets/logo/btc-planet.png'-->
<!--                    alt='crypto horizon logo'-->
<!--                    width='35'-->
<!--                    height='35'-->
<!--                    preload-->
<!--                />-->
                
                <Rocket />
                <span>Crypto Horizon</span>
                
<!--                <div class='flex flex-col font-great select-none'>-->
<!--                    <h5>Crypto</h5>-->
<!--                    <h5 class='ml-5'>Horizon</h5>-->
<!--                </div>-->
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

