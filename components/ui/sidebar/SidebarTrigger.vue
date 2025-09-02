<script setup lang="ts">
    import type { HTMLAttributes } from "vue"
    import { PanelLeft } from "lucide-vue-next"
    import { cn } from "@/lib/utils"
    import { useSidebar } from "./utils"
    import {SidebarMenuButton} from '~/components/ui/sidebar/index';
    
    const props = defineProps<{
        class?: HTMLAttributes["class"]
    }>()
    
    const { toggleSidebar, isMobile } = useSidebar()
</script>

<template>
    <div class='self-start'>
        <SidebarMenuButton
            v-if='isMobile'
            class=''
            @click='toggleSidebar'
        >
            <NuxtIcon
                name='mynaui:sidebar'
                data-sidebar='trigger'
                data-slot='sidebar-trigger'
                :class='cn("h-8 w-8",props.class)'
            >
                <PanelLeft />
                <span class='sr-only'>Toggle Menu</span>
            </NuxtIcon>
        </SidebarMenuButton>
    </div>
</template>
