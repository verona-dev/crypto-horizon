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
                    class='animate-fadeIn !w-fit p-8 border-primary/25'
                >
                    <div class='flex flex-col items-around gap-12'>
                        <div class='grid gap-2'>
                            <Title :tag='1' :level='4'>Theme Selector</Title>
                            <p class='text-sm text-muted-foreground'>Select a theme.</p>
                        </div>
                        
                        <div class='flex flex-wrap justify-center gap-4 w-180'>
                            <Card
                                v-for='theme of themes'
                                :key='theme'
                                @click="setTheme(theme)"
                                :class='[
                                    "!w-56 flex flex-col flex-wrap items-center justify-around cursor-pointer select-none border-2",
                                    { "bg-muted/50 border-foreground": !$colorMode.unknown && theme.value === $colorMode.preference },
                                ]'
                            >
                                <CardHeader class='items-center'>
                                    <Title
                                        :tag='1'
                                        :level='6'
                                        :class='{ "text-progress": !$colorMode.unknown && theme.value === $colorMode.value }'
                                    >
                                        {{ theme.label }}
                                    </Title>
                                    
                                    <div class='flex items-center gap-1.5'>
                                        <NuxtIcon
                                            :name='theme.icon'
                                            class='size-4'
                                        />
                                        
                                        <CardDescription>{{ theme.description }}</CardDescription>
                                    </div>
                                </CardHeader>
                                
                                <CardContent class='m-4'>
                                    <div class='flex flex-col items-center h-10'>
                                        <template v-if='theme.value === "system"'>
                                            <template v-if='$colorMode.preference === "system"'>
                                                <p class=''>Detected</p>
                                                
                                                <span class='text-muted-foreground italic capitalize text-sm'>{{ $colorMode.value }} mode</span>
                                            </template>
                                        </template>
                                        
                                        <template v-else>
                                            <div class='flex justify-stretch gap-1.5 h-full'>
                                                <div class='w-4 h-full rounded-xs border border-muted-foreground/25' :class='theme.colors.background'></div>
                                                <div class='w-4 h-full rounded-xs border border-muted-foreground/25' :class='theme.colors.primary'></div>
                                                <div class='w-4 h-full rounded-xs border border-muted-foreground/25' :class='theme.colors.accent'></div>
                                                <div class='w-4 h-full rounded-xs border border-muted-foreground/25' :class='theme.colors.mutedForeground'></div>
                                            </div>
                                        
                                        
                                        </template>
                                    </div>
                                </CardContent>
                                
                                <CardFooter v-if='theme.value !== "system" && theme.fonts.length > 0' class='flex flex-col gap-2'>
                                    <Badge
                                        v-for='font in theme.fonts'
                                        :key='font'
                                        variant='outline'
                                        class='bg-accent'
                                    >
                                        {{ font }}
                                    </Badge>
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
    import { Badge } from '@/components/ui/badge';
    import { Card, CardDescription, CardContent, CardHeader, CardFooter } from '~/components/ui/card';
    import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
    import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
    import { toast } from 'vue-sonner';
    import Title from '~/components/Title.vue';
    import { useSidebar } from '~/components/ui/sidebar/utils.ts';
    
    const { open, isMobile } = useSidebar();
    const colorMode = useColorMode();
    const current_theme = ref('');
    
    const themes = [
        {
            value: 'system',
            label: 'System',
            icon: 'ph-laptop',
            description: 'System theme',
            colors: {
                background: '',
                primary: '',
                accent: '',
                mutedForeground: '',
            },
        },
        {
            value: 'light',
            label: 'Light',
            icon: 'ph-sun',
            description: 'Light theme',
            colors: {
                background: 'bg-[#ffffff]',
                primary: 'bg-[#d87943]',
                accent: 'bg-[#c0c0c0]',
                mutedForeground: 'bg-[#6b7280]',
            },
            fonts: [
                "JetBrains Mono",
                "Geist Mono",
            ],
        },
        {
            value: 'dark',
            label: 'Dark Matter',
            icon: 'ph-moon',
            description: 'Dark theme',
            colors: {
                background: 'bg-[#121113]',
                primary: 'bg-[#e78a53]',
                accent: 'bg-[#333333]',
                mutedForeground: 'bg-[#888888]',
            },
            fonts: [
                "JetBrains Mono",
                "Geist Mono",
            ],
        },
        {
            value: 'caffeine-dark',
            label: 'Caffeine',
            icon: 'ph-moon',
            description: 'Dark theme',
            colors: {
                background: 'bg-[#111111]',
                primary: 'bg-[#ffe0c2]',
                accent: 'bg-[#2a2a2a]',
                mutedForeground: 'bg-[#b4b4b4]',
            },
            fonts: [
                "JetBrains Mono",
                "Geist Mono",
            ],
        },
        {
            value: 'amethyst-light',
            label: 'Amethyst Light',
            icon: 'ph-sun',
            description: 'Light theme',
            colors: {
                background: 'bg-[#f8f7fa]',
                primary: 'bg-[#8a79ab]',
                accent: 'bg-[#e6a5b8]',
                mutedForeground: 'bg-[#6b6880]',
            },
            fonts: [
                "Fira Code",
                "Geist",
            ],
        },
        {
            value: 'amethyst-dark',
            label: 'Amethyst Dark',
            icon: 'ph-moon',
            description: 'Dark theme',
            colors: {
                background: 'bg-[#1a1823]',
                primary: 'bg-[#a995c9]',
                accent: 'bg-[#372e3f]',
                mutedForeground: 'bg-[#a09aad]',
            },
            fonts: [
                "Fira Code",
                "Geist",
            ],
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