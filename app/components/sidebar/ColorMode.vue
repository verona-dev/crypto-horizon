<template>
    <SidebarMenu
        class='h-14'
        :class='{ "px-1" :  open }'
    >
        <SidebarMenuItem
            :class='[
                { "flex items-center w-full h-full p-2" : open },
                { "pl-2" : !isMobile }
            ]'
        >
            <SidebarMenuButton
                @click='toggleMode'
                :tooltip='active_mode.label'
                class='sidebar-menu-button '
                :class='{ "flex gap-3.5" :  open }'
            >
                <NuxtIcon
                    ref='toggleRef'
                    :name='active_mode.icon'
                    :key='active_mode.icon'
                    class='h-4 w-4 animation'
                />
                
                <span v-if='open || isMobile'>Toggle Theme</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>

</template>

<script setup>
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '@/components/ui/sidebar/index.ts';
    import { useSidebar } from '../ui/sidebar/utils.ts';
    
    const { open, isMobile } = useSidebar();
    const colorMode = useColorMode();
    const toggleRef = ref(null);
    
    const color_modes = computed(() => [
        { value: 'light', label: 'Toggle Dark mode', icon: open.value ? 'ph:moon-stars-duotone' : 'ph:moon-stars' },
        { value: 'dark', label: 'Toggle Light mode', icon: open.value ? 'ph:sun-dim-duotone' : 'ph:sun' },
    ]);
    
    const active_mode = computed(() => color_modes.value.find(mode => mode.value === colorMode.value) || color_modes.value[0]);
    
    const toggleMode = async () => {
        if (!document.startViewTransition || !toggleRef.value) {
            const current_index = color_modes.value.findIndex(
                (mode) => mode.value === colorMode.preference
            );
            const next_index = (current_index + 1) % color_modes.value.length;
            colorMode.preference = color_modes.value[next_index].value;
            return;
        }
        
        const { left, top } = toggleRef.value.$el.getBoundingClientRect();
        const x = left + toggleRef.value.$el.offsetWidth / 2;
        const y = top + toggleRef.value.$el.offsetHeight / 2;
        
        const transition = document.startViewTransition(async () => {
            // delay added because of Firefox glitch
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const current_index = color_modes.value.findIndex(
                (mode) => mode.value === colorMode.preference
            );
            const next_index = (current_index + 1) % color_modes.value.length;
            colorMode.preference = color_modes.value[next_index].value;
        });
        
        await transition.ready;
        
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 800,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
            }
        );
    };
</script>

<style scoped>
    .animation {
        animation: rotation 0.3s forwards;
    }
    
    @keyframes rotation {
        from {
            transform: rotate(-60deg);
        }
    }
</style>