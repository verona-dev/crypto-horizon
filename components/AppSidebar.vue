<script setup lang="ts">
    import {type SidebarProps, useSidebar} from '@/components/ui/sidebar'
    import {
        ChartCandlestick,
        BookOpen,
        Landmark,
        GraduationCap,
    } from 'lucide-vue-next'
    
    import NavMain from '@/components/NavMain.vue'
    import NavUser from '@/components/NavUser.vue'
    import NavLogo from '~/components/NavLogo.vue'
    import SidebarToggle from '~/components/SidebarToggle.vue'
    
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
            avatar: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757002350/cartoon-woman-wearing-glasses_j0t0qt.jpg',
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
                        title: 'Crypto Market',
                        url: '/market',
                        get isActive() {
                            return isChildActive(this.url);
                        }
                    },
                    {
                        title: 'Exchanges',
                        url: '/market/exchanges',
                        get isActive() {
                            return isChildActive(this.url);
                        }
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
                        title: 'Learn',
                        url: '/learn',
                        get isActive() {
                            return isChildActive(this.url);
                        }
                    },
                    {
                        title: 'Dyor',
                        url: '/learn/dyor',
                        get isActive() {
                            return isChildActive(this.url);
                        }
                    },
                ],
            },
        ],
    };
    
    const { isMobile } = useSidebar()
</script>

<template>
    <Sidebar v-bind='props'>
        <SidebarHeader>
            <div class='h-24 flex items-center justify-center'>
                <NavLogo />
            </div>
        </SidebarHeader>
        
        <Separator />
        
        <SidebarContent :class='{ "flex-initial" : isMobile }'>
            <NavMain :items="data.navMain" />
        </SidebarContent>
        
        <SidebarContent>
            <div class='h-16 flex items-center'>
                <SidebarToggle />
            </div>
        </SidebarContent>
        
        <Separator />
        
        <SidebarFooter class='h-16 flex items-center justify-center px-0'>
            <NavUser :user="data.user" />
        </SidebarFooter>
        
        <SidebarRail />
    </Sidebar>
</template>