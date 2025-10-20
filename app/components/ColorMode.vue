<template>
    <SidebarMenu class=''>
        <SidebarMenuItem class='h-16 flex items-center justify-center'>
            <SidebarMenuButton
                @click='toggleMode'
                variant='outline'
                :tooltip='active_mode.label'
                class='bg-sidebar h-full flex items-center justify-center'
                :class='{ "rounded-none" :  open }'
            >
                <NuxtIcon
                    :name='active_mode.icon'
                    class='h-5 w-5'
                />
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>

</template>

<script setup>
    import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '~/components/ui/sidebar';
    import { useSidebar } from './ui/sidebar/utils';
    const { open } = useSidebar();
    
    const colorMode = useColorMode();
    const active_mode = computed(() => color_modes.value.find(mode => mode.value === colorMode.value) || color_modes.value[0]);
    
    const color_modes = computed(() => [
        { value: 'light', label: 'Toggle Dark mode', icon: 'radix-icons:moon' },
        { value: 'dark', label: 'Toggle Light mode', icon: 'radix-icons:sun' },
    ]);
    
    const toggleMode = () => {
        const current_index = color_modes.value?.findIndex(mode => mode.value === colorMode.preference);
        const next_index = (current_index + 1) % color_modes.value?.length;
        colorMode.preference = color_modes.value[next_index]?.value;
    };
</script>