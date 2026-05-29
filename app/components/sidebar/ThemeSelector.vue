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
                            name='ph:paint-brush-household-duotone'
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
                    class='!w-fit p-8 border-primary/25'
                >
                    <div class='flex flex-col items-around gap-12'>
                        <div class='grid gap-2'>
                            <Title :tag='1' :level='4'>Theme Selector</Title>
                            <p class='text-sm text-muted-foreground'>Select a theme.</p>
                        </div>
                        
                        <div class='flex flex-wrap gap-4 w-150'>
                            <Card
                                v-for='theme of themes'
                                :key='theme'
                                @click="setTheme(theme)"
                                :class='[
                                    "flex flex-col flex-wrap items-center justify-around cursor-pointer !w-44 select-none !p-0",
                                    { "border-progress": !$colorMode.unknown && theme.value === $colorMode.preference },
                                ]'
                            >
                                <CardHeader>
                                    <Title :tag='1' :level='6' :class='{ "text-progress": !$colorMode.unknown && theme.value === $colorMode.value }'>{{ theme.label }}</Title>
                                    <CardDescription>{{ theme.description }}</CardDescription>
                                </CardHeader>
                                
                                <CardContent>
                                    <Button
                                        variant='outline'
                                        class="!h-full border border-primary/25 transition-all duration-200 ease-in-out hover:bg-transparent"
                                    >
                                        <NuxtIcon
                                            :name='theme.icon'
                                            class='size-6'
                                        />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        
                        <div>
                            Current theme: <b>{{ current_theme }}</b>
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
    import { Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter} from '~/components/ui/card';
    import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
    import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
    import { toast } from 'vue-sonner';
    import Title from '~/components/Title.vue';
    import { useSidebar } from '~/components/ui/sidebar/utils.ts';
    
    const { open, isMobile } = useSidebar();
    const colorMode = useColorMode();
    const current_theme = ref();
    
    const themes = [
        {
            value: 'system',
            label: 'System',
            icon: 'ph-laptop',
            description: 'System theme'
        },
        {
            value: 'light',
            label: 'Light',
            icon: 'ph-sun',
            description: 'Light theme'
        },
        {
            value: 'dark',
            label: 'Dark',
            icon: 'ph-moon',
            description: 'Dark theme'
        },
        {
            value: 'caffeine-light',
            label: 'Caffeine Light',
            icon: 'ph-acorn',
            description: 'Light theme'
        },
        {
            value: 'caffeine-dark',
            label: 'Caffeine Dark',
            icon: 'ph-coffee',
            description: 'Dark theme'
        },
    ];
    
    const setTheme = theme => {
        current_theme.value = theme.label;
        colorMode.preference = theme.value;
        
        toast.success(`${theme.label} theme selected.`, {
            class: '!flex !gap-3',
        });
    };
    
    const checkCurrentTheme = () => {
        const match = themes.find(theme => theme.value === colorMode.preference);
        if(match) {
            current_theme.value = match.label;
        }
    };
    
    onMounted(() => {
        checkCurrentTheme();
    })
</script>