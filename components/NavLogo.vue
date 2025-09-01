<script setup lang='ts'>
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
                <NuxtLink to='/'>
                    <!--  Open -->
                    <template v-if='open'>
                        <SidebarMenuButton
                            tooltip='Startpage'
                            class='h-16 flex items-center justify-center
                                   hover:text-green-deco
                            '
                            :class='{ "hover:bg-transparent active:bg-transparent focus:bg-transparent" : open }'
                        >
                                          <h5 v-if='open' class='custom truncate'>Crypto Horizon</h5>
                        </SidebarMenuButton>
                    </template>
                    
                    <!--  Close -->
                    <template v-else>
                        <SidebarMenuButton
                            tooltip='Startpage'
                            class='
                                   hover:text-green-deco
                            '
                            :class='{ "hover:bg-transparent active:bg-transparent focus:bg-transparent" : open }'
                            size='lg'
                        >
                            <NuxtIcon
                                name='my-icon:astronaut'
                                class='h-8 w-8 transition-all duration-400 ease-in-out'
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