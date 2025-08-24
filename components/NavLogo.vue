<script setup lang="ts">
    import type { Component } from "vue"
    
    import { ref } from "vue"
    import {
        DropdownMenu,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu'
    
    import {
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem,
    } from '@/components/ui/sidebar'
    
    const props = defineProps<{
        teams: {
            name: string
            logo: Component
            plan: string
        }[]
    }>()
    
    const activeTeam = ref(props.teams[0])
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <NuxtLink to='/' class='flex'>
                        <SidebarMenuButton
                            size="lg"
                            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div class="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <NuxtIcon
                                    name='my-icon:astronaut'
                                    size='30'
                                />
                            </div>
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <p class="custom truncate font-medium">{{ activeTeam.name }}</p>
                                <span class="truncate text-xs">{{ activeTeam.plan }}</span>
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
    letter-spacing: 5px;
}
</style>