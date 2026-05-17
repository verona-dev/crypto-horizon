<script setup lang='ts'>
    import { useSidebar } from '../ui/sidebar/utils';
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar';
    const { open } = useSidebar();
    
    import { Rocket } from "lucide-vue-next"

</script>

<template>
    <SidebarMenu class='!items-center'>
        <SidebarMenuItem class='h-full w-full'>
            <SidebarMenuButton
                :class='{ "h-full hover:bg-transparent" : open }'
                :tooltip="!open ? 'Home' : undefined"
            >
                <NuxtLink to='/' :class='{ "flex items-center" : open }'>
                    <Rocket :class='{ "w-4 h-4 shrink-0" : !open }' />
                    
                    <div v-if='open' class='flex flex-col font-great'>
                        <span class='text-lg font-great'>Crypto</span>
                        <span class='text-lg font-great ml-5'>Horizon</span>
                    </div>
                </NuxtLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

