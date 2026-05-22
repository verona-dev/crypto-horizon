<script setup lang='ts'>
    import { useSidebar } from '../ui/sidebar/utils';
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar';
    const { open, isMobile } = useSidebar();
    
    import { Rocket } from "lucide-vue-next"

</script>

<template>
    <SidebarMenu class='!items-center'>
        <SidebarMenuItem class='h-full w-full'>
            <!--  Open  -->
            <template v-if='open || isMobile'>
                <SidebarMenuButton
                    :class='{ "h-full select-none hover:cursor-default hover:bg-transparent active:bg-transparent" : open }'
                    :tooltip="!open ? 'Home' : undefined"
                >
                    <NuxtLink to='/' class='flex items-center justify-evenly w-full'>
                        <img
                            src='assets/logo/btc-planet-2.png'
                            alt='crypto horizon logo'
                            width='60'
                            height='60'
                        />
                        
                        <div v-if='open' class='flex flex-col flex-1'>
                            <span class='text-lg font-great'>Crypto</span>
                            <span class='text-lg font-great'>Horizon</span>
                        </div>
                    </NuxtLink>
                </SidebarMenuButton>
            </template>
            
            <!--  Close  -->
            <template v-else>
                <NuxtLink to='/'>
                    <img
                        src='assets/logo/btc-planet-2.png'
                        alt='crypto horizon logo'
                        width='30'
                        height='30'
                    />
                </NuxtLink>
            </template>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

