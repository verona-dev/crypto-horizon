<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { PanelLeft } from "lucide-vue-next"
    import { cn } from "@/lib/utils"
    import { useSidebar } from "./utils"
    import {SidebarMenuButton} from '~/components/ui/sidebar';
    
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
    
    const { open, toggleSidebar } = useSidebar()
</script>

<template>
    <!--
    :name='open ? "iconoir:sidebar-collapse" : "iconoir:sidebar-expand"'
    :name='open ? "tabler:layout-sidebar-right-filled" : "tabler:layout-sidebar-right-collapse-filled"'
    :name='open ? "stash:burger-arrow-left-duotone" : "stash:burger-arrow-right-duotone"'
    -->
    
    <!--  Open  -->
    <template v-if='open'>
        <NuxtIcon
            name='stash:burger-arrow-left-duotone'
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            :class="cn('h-8 w-8 hover:bg-secondary',props.class)"
            @click="toggleSidebar"
        >
            <PanelLeft />
            <span class="sr-only">Toggle Menu</span>
        </NuxtIcon>
    </template>
    
    <!--  Close  -->
    <template v-else>
        <SidebarMenuButton
            tooltip='Open Menu'
            size="lg"
            class='hover:bg-transparent active:bg-transparent'
        >
            <NuxtIcon
                name='stash:burger-arrow-right-duotone'
                data-sidebar='trigger'
                data-slot='sidebar-trigger'
                :class='cn("h-8 w-8 hover:bg-secondary",props.class)'
                @click='toggleSidebar'
            >
                <PanelLeft />
                <span class='sr-only'>Toggle Menu</span>
            </NuxtIcon>
        </SidebarMenuButton>
    </template>
</template>
