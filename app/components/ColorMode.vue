<template>
    <Button
        @click='toggleMode'
        variant='outline'
        class='!bg-transparent border-none rounded-none h-16'
    >
            <NuxtIcon
                :name='icon'
                class='h-5 w-5'
            />
    </Button>
</template>

<script setup>
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar';
    import { useSidebar } from './ui/sidebar/utils';
    const { open, toggleSidebar, isMobile } = useSidebar()
    
    import { Button } from '@/components/ui/button';
    
    const colorMode = useColorMode();
    const light = computed(() => colorMode.value === 'light');
    
    const toggleMode = () => {
        const current_index = color_modes.findIndex(mode => mode.value === colorMode.preference);
        const next_index = (current_index + 1) % color_modes.length;
        colorMode.preference = color_modes[next_index].value;
    };
    
    const color_modes = [
        { value: 'light', label: 'Light', icon: 'radix-icons:sun' },
        { value: 'dark', label: 'Dark', icon: 'radix-icons:moon' },
    ];
    
    const icon = computed(() => light.value ? 'radix-icons:moon' : 'radix-icons:sun');
</script>