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
                            name='ph:paint-brush-broad-duotone'
                            class='h-4 w-4'
                        />
                        
                        <span v-if='open || isMobile'>Select Theme</span>
                    </SidebarMenuButton>
                </PopoverTrigger>
                
                <PopoverContent
                    :side='isMobile ? "bottom" : "right"'
                    align='center'
                    :side-offset='open ? 16 : 12'
                    :avoid-collisions='true'
                    class='min-w-120 p-8 border-primary/25'
                >
                    <div class='flex flex-col items-around gap-10'>
                        <div class='grid gap-2'>
                            <h4 class='font-medium leading-none'>Theme Selector</h4>
                            <p class='text-sm text-muted-foreground'>Select a theme.</p>
                        </div>
                        
                        <div class='flex justify-around'>
                            <div
                                v-for='theme of themes'
                                :key='theme'
                            >
                                <Button
                                    @click="setTheme(theme.value)"
                                    variant='outline'
                                    class="!h-full border border-primary/25 transition-all duration-200 ease-in-out hover:-top-1"
                                    :class='{
                                      "border-emerald-600": !$colorMode.unknown && theme.value === $colorMode.preference,
                                      "text-emerald-600": !$colorMode.unknown && theme.value === $colorMode.value,
                                    }'
                                >
                                    <NuxtIcon
                                        :name='theme.icon'
                                        class='size-6'
                                    />
                                </Button>
                            </div>
                        </div>
                        
                        <div>
                            Current theme: <b>{{ $colorMode.preference }}</b>
                            <span v-if="$colorMode.preference === 'system'">&nbsp;(<i>{{ $colorMode.value }}</i> mode detected)</span>
                            <span v-if="$colorMode.forced">&nbsp;(<i>{{ $colorMode.value }}</i> forced)</span>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
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