<template>
    <SidebarMenu>
        <SidebarMenuItem :class='{ "flex items-center w-full h-full" : open }'>
            <Popover>
                <PopoverTrigger as-child>
                    <SidebarMenuButton
                        tooltip='Theme Selector'
                        class='sidebar-menu-button'
                        :class='{ "flex gap-3.5" :  open }'
                    >
                        <NuxtIcon
                            name='ph-laptop'
                            ref='toggleRef'
                            class='h-4 w-4 animation'
                        />
                        
                        <span v-if='open || isMobile'>Toggle Theme</span>
                    </SidebarMenuButton>
                </PopoverTrigger>
                
                <PopoverContent class="w-80">
                    <div class="grid gap-4">
                        <div class="space-y-2">
                            <h4 class="font-medium leading-none">
                                Dimensions
                            </h4>
                            <p class="text-sm text-muted-foreground">
                                Set the dimensions for the layer.
                            </p>
                        </div>
                        
                        <div class='space-y-2'>
                            <div class=' flex justify-center gap-2.5'>
                                <button
                                    v-for='theme of themes'
                                    :key='theme'
                                    :class="{ 'text-emerald-600 dark:text-emerald-400': !$colorMode.unknown && theme.value === $colorMode.value }"
                                    @click="setTheme(theme.value)"
                                >
                                    <NuxtIcon
                                        :name="theme.icon"
                                        class="size-6"
                                    />
                                </button>
                            </div>
                            
                            <div>
                                Preference: <b>{{ $colorMode.preference }}</b>
                                <span v-if="$colorMode.preference === 'system'">&nbsp;(<i>{{ $colorMode.value }}</i> mode detected)</span>
                                <span v-if="$colorMode.forced">&nbsp;(<i>{{ $colorMode.value }}</i> forced)</span>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

<script setup>
    import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
    import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
    import { useSidebar } from '~/components/ui/sidebar/utils.ts';
    
    const { open, isMobile } = useSidebar();
    const colorMode = useColorMode();
    
    const themes = [
        { value: 'system', label: 'System', icon: 'ph-laptop' },
        { value: 'light', label: 'Light', icon: 'ph-sun' },
        { value: 'dark', label: 'Dark', icon: 'ph-moon' },
        { value: 'caffeine-light', label: 'Caffeine Light', icon: 'ph-acorn' },
        { value: 'caffeine-dark', label: 'Caffeine Dark', icon: 'ph-coffee' },
    ];
    
    const setTheme = theme => {
        colorMode.preference = theme;
    };
</script>