<script setup lang='ts'>
    import {SidebarMenuButton, useSidebar} from '@/components/ui/sidebar'
    
    import {
        SidebarMenu,
        SidebarMenuItem,
    } from '@/components/ui/sidebar'
    
    const { open } = useSidebar();
</script>

<template>
    <SidebarMenu class='ml-3.5'>
        <Collapsible>
            <SidebarMenuItem>
                <NuxtLink to='/'>
                    <!--  Open -->
                    <template v-if='open'>
                        <SidebarMenuButton
                            tooltip='Startpage'
                            class='h-16 flex items-center justify-between
                                   hover:text-green-deco
                            '
                            :class='{ "hover:bg-transparent active:bg-transparent focus:bg-transparent" : open }'
                        >
                            <NuxtIcon
                                name='my-icon:astronaut'
                                class='h-8 w-8'
                            />
                            
                            <h6 v-if='open' class='custom truncate'>Crypto Horizon</h6>
                        </SidebarMenuButton>
                    </template>
                    
                    <!--  Close -->
                    <template v-else>
                        <SidebarMenuButton
                            tooltip='Startpage'
                            class='h-16 flex items-center justify-between
                                   hover:text-green-deco
                            '
                            :class='{ "hover:bg-transparent active:bg-transparent focus:bg-transparent" : open }'
                            size='lg'
                        >
                            <NuxtIcon
                                name='my-icon:astronaut'
                                class='h-8 w-8'
                            />
                        </SidebarMenuButton>
                    </template>
                
                </NuxtLink>
            </SidebarMenuItem>
        </Collapsible>
    </SidebarMenu>
</template>

<style scoped>
    .custom {
        font-family: 'Great', sans-serif;
        letter-spacing: 0.35rem;
    }
</style>