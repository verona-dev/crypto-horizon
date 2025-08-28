<script setup lang="ts">
    import {type SidebarProps, SidebarTrigger, useSidebar} from '@/components/ui/sidebar'
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
    
    
    const props = withDefaults(defineProps<SidebarProps>(), {
        collapsible: "icon",
    })
    
    const route = useRoute()
    const { open } = useSidebar();
    
    const isParentActive = (item_url: string, items: any[]) => {
        if (open.value) {
            if (!route.path.startsWith(item_url)) return false;
            // If the parent has only one route, highlight the parent
            if (items.length === 1) return route.path.startsWith(item_url);
            return !items.some(child => route.path === child.url);
        }
        return route.path.startsWith(item_url);
    };
    
    const isChildActive = (item_url: string) => {
        return route.path === item_url;
    };
    
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
                    return isParentActive(this.url, this.items);
                },
                items: [
                    {
                        title: 'Market',
                        url: '/market',
                    },
                ],
            },
            {
                title: 'News',
                url: '/news',
                icon: BookOpen,
                get isActive() {
                    return isParentActive(this.url, this.items);
                },
                items: [
                    {
                        title: 'Latest News',
                        url: '/news',
                        get isActive() {
                            return isChildActive(this.url);
                        }
                    },
                    {
                        title: 'Outlets',
                        url: '/news/outlets',
                        get isActive() {
                            return isChildActive(this.url);
                        }
                    },
                ],
            },
            {
                title: 'Defi',
                url: '/defi',
                icon: Landmark,
                get isActive() {
                    return isParentActive(this.url, this.items);
                },
                items: [
                    {
                        title: 'What is Defi',
                        url: '/defi',
                        get isActive() {
                            return isChildActive(this.url);
                        }
                    },
                    {
                        title: 'Platforms',
                        url: '/defi/platforms',
                        get isActive() {
                            return isChildActive(this.url);
                        }
                    },
                ],
            },
            {
                title: 'Learn',
                url: '/learn',
                icon: GraduationCap,
                get isActive() {
                    return isParentActive(this.url, this.items);
                },
                items: [
                    {
                        title: 'General',
                        url: '/learn',
                    },
                ],
            },
        ],
    };
</script>

<template>
    <Sidebar v-bind="props">
        <SidebarHeader>
            <div class='h-20 flex items-center justify-center'>
                <NavLogo />
            </div>
            
            <Separator />
            
            <div class='h-20 flex items-center'>
                <SidebarTrigger />
            </div>
        </SidebarHeader>
        
        <Separator />
        
        <SidebarContent>
            <NavMain :items="data.navMain" />
        </SidebarContent>
        
        <SidebarFooter class='h-28 flex items-center justify-center'>
            <NavUser :user="data.user" />
        </SidebarFooter>
        
        <SidebarRail />
    </Sidebar>
</template>