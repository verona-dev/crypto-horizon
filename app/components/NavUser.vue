<script setup lang='ts'>
    import { ChevronsUpDown, LogIn } from 'lucide-vue-next'
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
    import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
    import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '~/components/ui/sidebar'
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { authModal } = storeToRefs(AuthStore);
    
    const props = defineProps<{
        user: {
            name: string
            email: string
            avatar: string
        }
    }>()
    
    const { open, isMobile } = useSidebar()
    
    const onOpenAuthModal = () => authModal.value = true;
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton size='lg'>
                        <Avatar class='h-8 w-8 rounded-lg'>
                            <AvatarImage :src='user.avatar' :alt='user.name' />
                            <AvatarFallback class='rounded-lg'>
                                G
                            </AvatarFallback>
                        </Avatar>
                        
                        <div class='flex-1 text-left text-sm leading-tight'>
                            <span class='truncate font-medium'>{{ user.name }}</span>
                            <span class='truncate text-xs'>{{ user.email }}</span>
                        </div>
                        
                        <ChevronsUpDown class='ml-auto size-4' />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                
                <!--  Popup  -->
                <DropdownMenuContent
                    class='w-[--reka-dropdown-menu-trigger-width] min-w-56'
                    :side='isMobile ? "bottom" : "right"'
                    align='end'
                    :side-offset='4'
                >
                    <DropdownMenuLabel class='p-0 font-normal'>
                        <div class='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                            <Avatar class='h-8 w-8 rounded-lg'>
                                <AvatarImage :src='user.avatar' :alt='user.name' />
                                <AvatarFallback class='rounded-lg'>
                                    G
                                </AvatarFallback>
                            </Avatar>
                            
                            <div class='grid flex-1 text-left text-sm leading-tight'>
                                <span class='truncate font-semibold'>{{ user.name }}</span>
                                <span class='truncate text-xs'>{{ user.email }}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator />
            
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            @click='onOpenAuthModal'
                            class='cursor-pointer py-3'
                        >
                            <LogIn />
                            Sign In
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
