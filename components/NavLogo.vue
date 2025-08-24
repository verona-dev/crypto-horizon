<script setup lang="ts">
    import {
        DropdownMenu,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu'
    
    import {
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem,
    } from '@/components/ui/sidebar'

</script>

<template>
    <SidebarMenu class=''>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <NuxtLink to='/' class='flex'>
                        <SidebarMenuButton
                            size="lg"
                            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <NuxtIcon
                                    name='my-icon:astronaut'
                                    size='35'
                                />
                            </div>
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <p class="custom truncate font-medium">Crypto</p>
                                <p class="custom truncate font-medium">Horizon</p>
                            </div>
                        </SidebarMenuButton>
                    </NuxtLink>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

<style scoped>
    p.custom {
        font-family: 'Great', sans-serif;
        letter-spacing: 0.4rem;
    }
</style>