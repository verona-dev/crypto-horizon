<script setup lang="ts">
    import {type SidebarProps} from '@/components/ui/sidebar'
    import {
        ChartCandlestick,
        BookOpen,
        Landmark,
        GraduationCap,
    } from "lucide-vue-next"
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
                items: [
                    {
                        title: 'General',
                        url: '#',
                    },
                ],
            },
        ],
    }
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