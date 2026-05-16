<script setup lang="ts">
    import type { SidebarProps } from "@/components/ui/sidebar"
    import { User, GraduationCap, Landmark, Newspaper, ChartCandlestick } from "lucide-vue-next"
    
    import NavMain from './NavMain.vue';
    import NavUser from './NavUser.vue';
    import SidebarToggle from './SidebarToggle.vue';
    import SidebarLogo from './SidebarLogo.vue';
    import ColorMode from '@/components/sidebar/ColorMode.vue';
    
    import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
    
    const props = withDefaults(defineProps<SidebarProps>(), {
        collapsible: "icon",
    })
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { profile } = storeToRefs(ProfileStore);
    const logged_in = computed(() => profile.value);
    const route = useRoute()
    
    const isParentActive = (item_url: string, items: never[]) => {
        return items.some(child => route.path === child.url) || route.path.startsWith(item_url);
    };
    
    const isChildActive = (item_url: string) => {
        return route.path === item_url;
    };
    
    const data = computed(() => {
        const navMain = [
            {
                title: 'Market',
                url: '/market',
                icon: ChartCandlestick,
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
                icon: Newspaper,
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
                icon: Landmark,
                activeIcon: 'ph:piggy-bank-fill',
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
                icon: GraduationCap,
                activeIcon: 'ph:lightbulb-filament-fill',
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
                icon: User,
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
</script>

<template>
    <Sidebar v-bind="props">
        <SidebarHeader>
            <SidebarLogo />
        </SidebarHeader>
        
        <SidebarContent>
            <NavMain :items="data" />
        </SidebarContent>
        
        <SidebarFooter>
            <ColorMode />
            <NavUser />
            <SidebarToggle />
        </SidebarFooter>
        
        <SidebarRail />
    </Sidebar>
</template>
