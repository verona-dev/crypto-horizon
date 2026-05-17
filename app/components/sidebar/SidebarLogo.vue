<script setup lang='ts'>
    import { useSidebar } from '../ui/sidebar/utils';
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar';
    const { open, isMobile } = useSidebar();
    
    import { Rocket } from "lucide-vue-next"

</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton class='h-full !py-0 !my-0 hover:bg-transparent'>
                <Rocket />
                
                <div class='flex flex-col font-great'>
                    <span class='text-lg font-great'>Crypto</span>
                    <span class='text-lg font-great ml-5'>Horizon</span>
                </div>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

