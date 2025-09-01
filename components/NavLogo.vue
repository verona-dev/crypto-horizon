<script setup lang="ts">
    import {SidebarMenuButton, useSidebar} from '@/components/ui/sidebar'
    
    import {
        SidebarMenu,
        SidebarMenuItem,
    } from '@/components/ui/sidebar'
    import {CollapsibleTrigger} from '~/components/ui/collapsible';
    import {cn} from '~/lib/utils';
    
    const { open } = useSidebar();
</script>

<template>
    <SidebarMenu>
        <Collapsible>
            <!--  Open  -->
            <template v-if='open'>
                <SidebarMenuItem>
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
                </SidebarMenuItem>
            
            </template>
            
            <!--  Close  -->
            <template v-else>
                <NuxtLink to='/'>
                    <SidebarMenuItem>
                        <CollapsibleTrigger>
                            <SidebarMenuButton
                                tooltip='Startpage'
                                class='justify-center flex-col hover:text-green-deco'
                            >
                                <NuxtIcon
                                    name='my-icon:astronaut'
                                    class=''
                                    :class='cn("h-8 w-8")'
                                />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                    </SidebarMenuItem>
                </NuxtLink>
            </template>
        </Collapsible>
    </SidebarMenu>
</template>

<style scoped>
    .custom {
        font-family: 'Great', sans-serif;
        letter-spacing: 0.35rem;
    }
</style>