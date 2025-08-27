<script setup lang="ts">
    import {type SidebarProps} from '@/components/ui/sidebar'
    import {
        ChartCandlestick,
        BookOpen,
        Landmark,
        GraduationCap,
    } from 'lucide-vue-next'
    
    import NavMain from '@/components/NavMain.vue'
    import NavUser from '@/components/NavUser.vue'
    import NavLogo from '~/components/NavLogo.vue'
    
    import {
        Sidebar,
        SidebarContent,
        SidebarFooter,
        SidebarHeader,
        SidebarRail,
    } from '@/components/ui/sidebar'
    
    const route = useRoute()
    
    const props = withDefaults(defineProps<SidebarProps>(), {
        collapsible: "icon",
    })
    
    const data = {
        user: {
            name: 'Guest',
            email: '',
            avatar: '/avatars/shadcn.jpg',
        },
        navMain: [
            {
                title: 'Market',
                url: '/market',
                icon: ChartCandlestick,
                get isActive() {
                    return route.path.startsWith(this.url);
                },
                items: [
                    {
                        title: 'Market',
                        url: '/market',
                    }
                ],
            },
            {
                title: 'News',
                url: '/news',
                icon: BookOpen,
                get isActive() {
                    return route.path.startsWith(this.url);
                },
                items: [
                    {
                        title: 'Latest News',
                        url: '/news',
                    },
                    {
                        title: 'Outlets',
                        url: '/news/outlets',
                    },
                ],
            },
            {
                title: 'Defi',
                url: '/defi',
                icon: Landmark,
                get isActive() {
                    return route.path.startsWith(this.url);
                },
                items: [
                    {
                        title: 'What',
                        url: '/defi',
                    },
                    {
                        title: 'When',
                        url: '/defi',
                    },
                    {
                        title: 'Where',
                        url: '/defi',
                    },
                    {
                        title: 'How',
                        url: '/defi',
                    },
                ],
            },
            {
                title: 'Learn',
                url: '/learn',
                icon: GraduationCap,
                get isActive() {
                    return route.path.startsWith(this.url);
                },
                items: [
                    {
                        title: 'General',
                        url: '#',
                    },
                ],
            },
        ],
    };
</script>

<template>
    <Sidebar v-bind="props">
        <SidebarHeader class='h-24 flex items-center justify-center'>
            <NavLogo />
        </SidebarHeader>
        
        <Separator />
        
        <SidebarContent>
            <NavMain :items="data.navMain" />
        </SidebarContent>
        
        <SidebarFooter>
            <NavUser :user="data.user" />
        </SidebarFooter>
        
        <SidebarRail />
    </Sidebar>
</template>