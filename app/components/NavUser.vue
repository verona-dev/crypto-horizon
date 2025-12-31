<script setup lang='ts'>
    import { ChevronsUpDown } from 'lucide-vue-next'
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
            return 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757002350/portrait-futuristic-female-humanoid-with-advanced-technology_k4wj3u.jpg';
        }
        return '';
        // return 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757002350/cartoon-woman-wearing-glasses_j0t0qt.jpg';
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
        <SidebarMenuItem
            :class='[
                { "flex items-center w-full h-full p-2" : open },
                { "pl-2" : !isMobile }
            ]'
        >
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton
                        size='lg'
                        class=' '
                        :class='{ "pl-1 pr-2.5 flex gap-1.5" :  open }'
                    >
                        <Avatar class='h-8 w-8 rounded-lg'>
                            <AvatarImage :src='avatar' alt='avatar' />
                            <AvatarFallback class='rounded-lg'>
                                G
                            </AvatarFallback>
                        </Avatar>
                        
                        <div class='flex flex-col flex-1 text-left text-sm leading-tight'>
                            <span class='truncate font-medium'>{{ username }}</span>
                            <span class='truncate text-xs'>{{ user_email }}</span>
                        </div>
                        
                        <ChevronsUpDown class='ml-auto size-4' />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                
                <!--  Dropdown  -->
                <DropdownMenuContent
                    class='w-[--reka-dropdown-menu-trigger-width] min-w-56'
                    :side='isMobile ? "bottom" : "right"'
                    align='end'
                    :side-offset='open ? 14: 12'
                >
                    <DropdownMenuLabel class='p-0 font-normal'>
                        <div class='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                            <Avatar class='h-8 w-8 rounded-lg'>
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
                    
                    <!--  Profile  -->
                    <DropdownMenuItem
                        v-if='logged_in'
                        class='cursor-pointer py-3'
                        as-child
                    >
                        <NuxtLink to='/profile'>
                            <NuxtIcon name='ph:user' size='18' />
                            Profile
                        </NuxtLink>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                        <!--  Login  -->
                        <DropdownMenuItem
                            v-if='!logged_in'
                            @click='onOpenAuthModal'
                            class='cursor-pointer py-3'
                        >
                            <NuxtIcon name='ph:sign-in' size='18' />
                            Login / Register
                        </DropdownMenuItem>
                        
                        <!--  Logout  -->
                        <DropdownMenuItem
                            v-else
                            @click='onLogOut'
                            class='cursor-pointer py-3'
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
