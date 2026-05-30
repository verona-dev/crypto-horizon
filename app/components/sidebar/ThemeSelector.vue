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
                        
                        <div class='flex flex-wrap justify-center gap-4 w-160'>
                            <Card
                                v-for='theme of themes'
                                :key='theme'
                                @click="setTheme(theme)"
                                :class='[
                                    "flex flex-col flex-wrap items-center justify-around cursor-pointer !w-48 select-none !p-0",
                                    { "border-progress": !$colorMode.unknown && theme.value === $colorMode.preference },
                                ]'
                            >
                                <CardHeader class='items-center'>
                                    <Title :tag='1' :level='6' :class='{ "text-progress": !$colorMode.unknown && theme.value === $colorMode.value }'>{{ theme.label }}</Title>
                                    <CardDescription>{{ theme.description }}</CardDescription>
                                </CardHeader>
                                
                                <CardContent>
                                    <Button
                                        variant='outline'
                                        class="bg-transparent !h-full border-none shadow-none transition-all duration-200 ease-in-out hover:bg-transparent"
                                    >
                                        <NuxtIcon
                                            :name='theme.icon'
                                            class='size-6'
                                        />
                                    </Button>
                                </CardContent>
                                
                                <CardFooter>
                                    <div class='flex items-center gap-2 h-10'>
                                        <div v-if='theme.colors' class='flex justify-stretch gap-2 h-full'>
                                            <div class='w-4 h-full rounded-xs border border-muted-foreground/25 hover:-top-1' :class='theme.colors.background'></div>
                                            <div class='w-4 h-full rounded-xs' :class='theme.colors.primary'></div>
                                            <div class='w-4 h-full rounded-xs' :class='theme.colors.secondary'></div>
                                            <div class='w-4 h-full rounded-xs' :class='theme.colors.mutedForeground'></div>
                                        </div>
                                        
                                        <span v-if='theme.colors'>Color Palette</span>
                                    </div>
                                </CardFooter>
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
    import { Card, CardDescription, CardContent, CardHeader, CardFooter} from '~/components/ui/card';
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
            description: 'System theme',
        },
        {
            value: 'light',
            label: 'Light Theme',
            icon: 'ph-sun',
            description: 'Light',
            colors: {
                background: 'bg-[#ffffff]',
                primary: 'bg-[#d87943]',
                secondary: 'bg-[#527575]',
                mutedForeground: 'bg-[#6b7280]',
            },
        },
        {
            value: 'dark',
            label: 'Dark Matter',
            icon: 'ph-moon',
            description: 'Dark',
            colors: {
                background: 'bg-[#121113]',
                primary: 'bg-[#e78a53]',
                secondary: 'bg-[#5f8787]',
                mutedForeground: 'bg-[#888888]',
            },
        },
        {
            value: 'caffeine-dark',
            label: 'Caffeine',
            icon: 'ph-moon',
            description: 'Dark',
            colors: {
                background: 'bg-[#111111]',
                primary: 'bg-[#ffe0c2]',
                secondary: 'bg-[#393028]',
                mutedForeground: 'bg-[#b4b4b4]',
            },
        },
        {
            value: 'amethyst-light',
            label: 'Amethyst Light',
            icon: 'ph-sun',
            description: 'Light',
            colors: {
                background: 'bg-[#f8f7fa]',
                primary: 'bg-[#8a79ab]',
                secondary: 'bg-[#dfd9ec]',
                mutedForeground: 'bg-[#6b6880]',
            },
        },
        {
            value: 'amethyst-dark',
            label: 'Amethyst Dark',
            icon: 'ph-moon',
            description: 'Dark',
            colors: {
                background: 'bg-[#1a1823]',
                primary: 'bg-[#a995c9]',
                secondary: 'bg-[#5a5370]',
                mutedForeground: 'bg-[#a09aad]',
            },
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