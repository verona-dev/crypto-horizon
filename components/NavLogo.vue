<script setup lang="ts">
    import {SidebarMenuButton, useSidebar} from '@/components/ui/sidebar'
    
    import {
        SidebarMenu,
        SidebarMenuItem,
    } from '@/components/ui/sidebar'
    
    const { open } = useSidebar();
</script>

<template>
    <SidebarMenu :class='{ "ml-3.5" : !open }'>
        <SidebarMenuItem>
            <!--  Open  -->
            <template v-if='open'>
                <SidebarMenuButton
                    tooltip='Startpage'
                    class='
                        h-10 flex items-center justify-between
                        hover:bg-transparent active:bg-transparent focus:bg-transparent hover:text-green-deco
                    '
                >
                    <NuxtIcon
                        name='my-icon:astronaut'
                        class=''
                        size='40'
                    />
                    
                    <h5 class='custom truncate'>Crypto Horizon</h5>
                </SidebarMenuButton>
            </template>
            
            <!--  Close  -->
            <template v-else>
                <SidebarMenuButton
                    class='justify-center flex-col hover:bg-transparent active:bg-transparent focus:bg-transparent hover:text-green-deco'
                >
                    <NuxtIcon
                        name='my-icon:astronaut'
                        class=''
                        size='35'
                    />
                </SidebarMenuButton>
            </template>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

<style scoped>
    .custom {
        font-family: 'Great', sans-serif;
        letter-spacing: 0.35rem;
    }
</style>