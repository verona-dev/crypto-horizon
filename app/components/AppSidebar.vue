<script setup lang="ts">
    import {type SidebarProps, useSidebar} from '~/components/ui/sidebar'
    import NavMain from '../components/NavMain.vue'
    import NavUser from '../components/NavUser.vue'
    import SidebarToggle from '../components/SidebarToggle.vue'
    import ColorMode from '~/components/ColorMode.vue'
    
    import {
        Sidebar,
        SidebarContent,
        SidebarFooter,
        SidebarHeader,
        SidebarRail,
    } from '~/components/ui/sidebar'
    
    
    const props = withDefaults(defineProps<SidebarProps>(), {
        collapsible: "icon",
    })
    
    const route = useRoute()
    
    const isParentActive = (item_url: string, items: any[]) => {
        return items.some(child => route.path === child.url) || route.path.startsWith(item_url);
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
                title: 'Launch Pad',
                url: '/',
                icon: 'ph:planet',
            },
            {
                title: 'Market',
                url: '/market',
                icon: 'ph:chart-line-up',
                activeIcon: 'ph:chart-line-up-fill',
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
                        title: 'Trending',
                        url: '/market/trending',
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
                icon: 'ph:book-open-text',
                activeIcon: 'ph:book-open-text-fill',
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
                icon: 'ph:bank',
                activeIcon: 'ph:bank-fill',
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
                icon: 'ph:books',
                activeIcon: 'ph:books-fill',
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
    <Sidebar v-bind='props' class='z-50'>
        <SidebarHeader class='h-20 flex items-center justify-center border-b'>
            <SidebarToggle />
        </SidebarHeader>
        
        <SidebarContent :class='{ "flex-initial" : isMobile }'>
            <NavMain :items="data.navMain" />
        </SidebarContent>
        
        <Separator />
        
        <ColorMode />
        
        <Separator />
        
        <SidebarFooter class='h-20 flex items-center justify-center'>
            <NavUser :user="data.user" />
        </SidebarFooter>
        
        <SidebarRail />
    </Sidebar>
</template>