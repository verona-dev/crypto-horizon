<script setup lang="ts">
    import {type SidebarProps, useSidebar} from '@/components/ui/sidebar'
    import NavMain from './NavMain.vue'
    import NavUser from '../NavUser.vue'
    import SidebarToggle from './SidebarToggle.vue'
    import SidebarLogo from './SidebarLogo.vue'
    import ColorMode from '@/components/sidebar/ColorMode.vue'
    import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { profile } = storeToRefs(ProfileStore);
    const logged_in = computed(() => profile.value);
    
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
    
    const nav_data = computed(() => {
        const navMain = [
            {
                title: 'Launch Pad',
                url: '/',
                icon: 'ph:rocket-launch',
                planets: [
                    'ph:planet-light',
                    'ph:planet',
                    'ph:planet-duotone',
                    'ph:planet-fill'
                ],
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
                        title: 'Cryptocurrencies',
                        url: '/market',
                        get isActive() {
                            return isChildActive(this.url);
                        }
                    },
                    {
                        title: 'Global Market',
                        url: '/market/global-market',
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
                title: 'Academy',
                url: '/academy',
                icon: 'ph:books',
                activeIcon: 'ph:books-fill',
                get isActive() {
                    return isParentActive(this.url, this.items);
                },
                items: [
                    {
                        title: 'Learn',
                        url: '/academy',
                        get isActive() {
                            return isChildActive(this.url);
                        }
                    },
                    {
                        title: 'Dyor',
                        url: '/academy/dyor',
                        get isActive() {
                            return isChildActive(this.url);
                        }
                    },
                ],
            },
        ];
        
        if(logged_in.value) {
            navMain.push({
                title: 'Profile',
                url: '/profile',
                icon: 'ph:user',
                activeIcon: 'ph:user-fill',
                get isActive() {
                    return isParentActive(this.url, this.items);
                },
                items: [
                    {
                        title: 'My Profile',
                        url: '/profile',
                        get isActive() {
                            return isChildActive(this.url);
                        }
                    },
                ],
            });
        }
        
        return navMain;
    });
    
    const { isMobile } = useSidebar();
</script>

<template>
    <Sidebar v-bind='props' class='sidebar'>
        <SidebarHeader class='h-20 flex items-center justify-center border-b'>
            <SidebarLogo />
        </SidebarHeader>
        
        <SidebarContent :class='{ "flex-initial" : isMobile }'>
            <NavMain :items='nav_data' />
        </SidebarContent>
        
        <ColorMode />
        
        <NavUser />
        
        <SidebarToggle />
        
        <SidebarRail />
    </Sidebar>
</template>