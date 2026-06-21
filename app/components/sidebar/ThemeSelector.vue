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
                                    "!w-56 relative flex flex-col flex-wrap items-center justify-around cursor-pointer select-none border-2",
                                    { "bg-muted border-foreground": !$colorMode.unknown && theme.value === $colorMode.preference },
                                ]'
                            >
                                <CircleCheck
                                    v-if='theme.value === $colorMode.preference'
                                    class='bg-background absolute -top-3 -right-3 size-8 rounded-full fill-card'
                                />
                                
                                <!--  Theme name  -->
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
                                        <!--  System theme  -->
                                        <template v-if='theme.value === "system"'>
                                            <template v-if='$colorMode.preference === "system"'>
                                                <p class=''>Detected</p>
                                                
                                                <span class='text-muted-foreground italic capitalize text-sm'>{{ $colorMode.value }} mode</span>
                                            </template>
                                        </template>
                                        
                                        <!--  Themes palette -->
                                        <template v-else>
                                            <div class='flex justify-stretch gap-1.5 h-full'>
                                                <div class='w-4 h-full rounded-xs border border-muted-foreground/25' :class='theme.colors?.background'></div>
                                                <div class='w-4 h-full rounded-xs border border-muted-foreground/25' :class='theme.colors?.primary'></div>
                                                <div class='w-4 h-full rounded-xs border border-muted-foreground/25' :class='theme.colors?.accent'></div>
                                                <div class='w-4 h-full rounded-xs border border-muted-foreground/25' :class='theme.colors?.mutedForeground'></div>
                                            </div>
                                        </template>
                                    </div>
                                </CardContent>
                                
                                <!--  Themes fonts -->
                                <CardFooter v-if='theme.value !== "system" && theme.fonts.length > 0' class='flex flex-col gap-2 h-20'>
                                    <Badge
                                        v-for='font in theme.fonts'
                                        :key='font'
                                        variant='outline'
                                        class='bg-accent'
                                        :style='{ "font-family": `var(--font-${font.value})` }'
                                    >
                                        {{ font.label }}
                                    </Badge>
                                </CardFooter>
                            </Card>
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
    import { CircleCheck } from 'lucide-vue-next';
    import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
    import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
    import Title from '~/components/Title.vue';
    import { toast } from 'vue-sonner';
    import { useSidebar } from '~/components/ui/sidebar/utils.ts';
    import themes from '~/assets/data/themes.json';
    
    const { open, isMobile } = useSidebar();
    const colorMode = useColorMode();
    const current_theme = ref({
        label: '',
        value: '',
    });
    
    const setTheme = theme => {
        current_theme.value = theme;
        colorMode.preference = theme.value;
        toast.success(`${theme.label} theme selected.`, { class: '!flex !gap-3' });
    };
    
    const checkCurrentTheme = () => {
        const match = themes.find(theme => theme.value === colorMode.preference);
        if(match) {
            current_theme.value.label = match.label;
        }
    };
    
    onMounted(() => {
        checkCurrentTheme();
    })
</script>