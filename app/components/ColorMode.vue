<template>
    <SidebarMenu>
        <SidebarMenuItem class='h-16 flex items-center justify-center'>
            <Button
                ref='toggleRef'
                @click='toggleMode'
                variant='outline'
                :tooltip='active_mode.label'
                class='bg-sidebar w-full h-full flex items-center justify-center'
                :class='{ "rounded-none" :  open }'
            >
                <NuxtIcon
                    :name='active_mode.icon'
                    :key='active_mode.icon'
                    class='h-5 w-5'
                    :class='{
                            "rounded-none": open,
                            "light-animation": active_mode.value === "light",
                            "dark-animation": active_mode.value === "dark"
                        }'
                />
            </Button>
        </SidebarMenuItem>
    </SidebarMenu>

</template>

<script setup>
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar';
    import { useSidebar } from './ui/sidebar/utils';
    import { Button } from '~/components/ui/button';
    
    const { open } = useSidebar();
    const colorMode = useColorMode();
    const toggleRef = ref(null);
    
    const active_mode = computed(() => color_modes.value.find(mode => mode.value === colorMode.value) || color_modes.value[0]);
    
    const color_modes = computed(() => [
        { value: 'light', label: 'Toggle Dark mode', icon: 'radix-icons:moon' },
        { value: 'dark', label: 'Toggle Light mode', icon: 'radix-icons:sun' },
    ]);
    
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
            await new Promise(resolve => setTimeout(resolve, 100));
            
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
                duration: 500,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
            }
        );
    };
</script>

<style scoped>
    .light-animation {
        animation: light-animation 0.25s forwards;
    }
    
    .dark-animation {
        
        animation: dark-animation 0.25s forwards;
    }
    
    @keyframes light-animation {
        from {
            transform: rotate(90deg);
        }
    }
    
    @keyframes dark-animation {
        from {
            transform: rotate(-45deg);
        }
    }
</style>