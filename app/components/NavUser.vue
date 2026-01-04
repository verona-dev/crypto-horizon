<script setup lang='ts'>
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
    import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
    import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '~/components/ui/sidebar'
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { authModal } = storeToRefs(AuthStore);
    const { logOut } = AuthStore;
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { profile } = storeToRefs(ProfileStore);
    
    const { open, isMobile } = useSidebar()
    
    const onOpenAuthModal = () => authModal.value = true;
    
    const logged_in = computed(() => profile.value);
    
    const avatar = computed(() => {
        if(logged_in.value) {
            return 'https://res.cloudinary.com/dgcyv1ehi/image/upload/c_scale,w_100/v1757869821/astronaut-7787907_zy26rf.jpg';
        }
        return 'https://res.cloudinary.com/dgcyv1ehi/image/upload/c_scale,w_100/v1767208523/original-528efd43cf00778a5007f2146a0cdeeb_yuxkuv.webp';
    });
    
    const username = computed(() => {
        if(logged_in.value) {
            return profile.value?.username;
        }
        return 'Guest';
    });
    
    const user_email = computed(() => {
        if(logged_in.value) {
            return profile.value?.email;
        }
        return null;
    });
    
    const onLogOut = async() => {
        const route = useRoute();
        
        if(route.path === '/profile') {
            await navigateTo('/', { replace: true });
        }
        
        await logOut();
    };
</script>

<template>
    <SidebarMenu class='h-14'>
        <SidebarMenuItem :class='{ "flex items-center" : open }'>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton
                        size='lg'
                        :class='open ? "mx-3 pl-1 pr-2.5 flex gap-2.5 rounded-md" : "ml-3 hover:bg-transparent active:bg-transparent"'
                    >
                        <Avatar class='h-6 w-6 rounded-lg'>
                            <AvatarImage :src='avatar' alt='avatar' />
                            <AvatarFallback class='rounded-lg'>
                                G
                            </AvatarFallback>
                        </Avatar>
                        
                        <div class='flex flex-col flex-1 text-left text-sm leading-tight'>
                            <span class='truncate font-medium'>{{ username }}</span>
                            <span class='truncate text-xs'>{{ user_email }}</span>
                        </div>
                        
                        <NuxtIcon name='ph:dots-three-vertical-bold' size='18' />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                
                <!--  Dropdown  -->
                <DropdownMenuContent
                    class='w-[--reka-dropdown-menu-trigger-width] min-w-56'
                    :side='isMobile ? "bottom" : "right"'
                    align='end'
                    :side-offset='open ? 16 : 8'
                >
                    <DropdownMenuLabel class='p-0 font-normal'>
                        <div class='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                            <Avatar class='h-16 w-16 rounded-lg'>
                                <AvatarImage :src='avatar' alt='avatar' />
                                <AvatarFallback class='rounded-lg'>
                                    G
                                </AvatarFallback>
                            </Avatar>
                            
                            <div class='grid flex-1 text-left text-sm leading-tight'>
                                <span class='truncate font-semibold'>{{ username }}</span>
                                <span class='truncate text-xs'>{{ user_email }}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup v-if='logged_in'>
                        <!--  Profile  -->
                        <DropdownMenuItem
                            class='py-3 mb-1 cursor-pointer rounded-lg'
                            as-child
                        >
                            <NuxtLink to='/profile'>
                                <NuxtIcon name='ph:user' size='18' />
                                Profile
                            </NuxtLink>
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                    </DropdownMenuGroup>
                    
                    <DropdownMenuGroup>
                        <!--  Login  -->
                        <DropdownMenuItem
                            v-if='!logged_in'
                            @click='onOpenAuthModal'
                            class='py-3 mt-1 cursor-pointer rounded-lg'
                        >
                            <NuxtIcon name='ph:sign-in' size='18' />
                            Login / Register
                        </DropdownMenuItem>
                        
                        <!--  Logout  -->
                        <DropdownMenuItem
                            v-if='logged_in'
                            @click='onLogOut'
                            class='py-3 mt-1 cursor-pointer rounded-lg'
                        >
                            <NuxtIcon name='ph:sign-out' size='18' />
                            LogOut
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
