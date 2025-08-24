<script setup lang="ts">
    import type { SidebarProps } from '@/components/ui/sidebar'
    
    import {
        ChartCandlestick,
        Newspaper,
        HandCoins,
        Landmark,
        Frame,
        Map,
        PieChart,
        Settings2,
    } from "lucide-vue-next"
    import NavMain from '@/components/NavMain.vue'
    import NavProjects from '@/components/NavProjects.vue'
    import NavUser from '@/components/NavUser.vue'
    import TeamSwitcher from '@/components/TeamSwitcher.vue'
    
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
            email: 'guest@guest.com',
            avatar: '/avatars/shadcn.jpg',
        },
        teams: [
            {
                name: 'Crypto Horizon',
                plan: 'Enterprise',
            },
        ],
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
                icon: Newspaper,
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
                title: 'Settings',
                url: '#',
                icon: Settings2,
                items: [
                    {
                        title: 'General',
                        url: '#',
                    },
                    {
                        title: 'Team',
                        url: '#',
                    },
                    {
                        title: 'Billing',
                        url: '#',
                    },
                    {
                        title: 'Limits',
                        url: '#',
                    },
                ],
            },
        ],
        projects: [
            {
                name: 'Design Engineering',
                url: '#',
                icon: Frame,
            },
            {
                name: 'Sales & Marketing',
                url: '#',
                icon: PieChart,
            },
            {
                name: 'Travel',
                url: '#',
                icon: Map,
            },
        ],
    }
</script>

<template>
    <Sidebar v-bind="props">
        <SidebarHeader>
            <TeamSwitcher :teams="data.teams" />
        </SidebarHeader>
        
        <SidebarContent>
            <NavMain :items="data.navMain" />
            <NavProjects :projects="data.projects" />
        </SidebarContent>
        
        <SidebarFooter>
            <NavUser :user="data.user" />
        </SidebarFooter>
        
        <SidebarRail />
    </Sidebar>
</template>
