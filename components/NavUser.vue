<script setup lang='ts'>
    import {
        ChevronsUpDown,
        LogIn,
        MailPlus,
    } from 'lucide-vue-next'
    import {
        Avatar,
        AvatarFallback,
        AvatarImage,
    } from '@/components/ui/avatar'
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuGroup,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu'
    import {
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem,
        useSidebar,
    } from '@/components/ui/sidebar'
    
    const props = defineProps<{
        user: {
            name: string
            email: string
            avatar: string
        }
    }>()
    
    const { open, isMobile } = useSidebar()
    
    const onClick = () => alert('Coming soon!');
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <!--  Closed: Trigger Icon -->
                    <SidebarMenuButton
                        size='lg'
                        class='
                            dark:bg-accent dark:hover:bg-card dark:hover:text-foreground
                            dark:data-[state=open]:bg-card
                        '
                    >
                        <Avatar class='h-8 w-8 rounded-lg'>
                            <AvatarImage :src='user.avatar' :alt='user.name' />
                            <AvatarFallback
                                class='bg-tertiary rounded-lg text-lg'
                                :class='{ "hover:border hover:border-foreground" : !open }'
                            >
                                G
                            </AvatarFallback>
                        </Avatar>
                        
                        <div class='grid flex-1 text-left text-sm leading-tight'>
                            <span class='truncate font-medium'>{{ user.name }}</span>
                            <span class='truncate text-xs'>{{ user.email }}</span>
                        </div>
                        
                        <ChevronsUpDown class='ml-auto size-4' />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                
                <!--  Popup  -->
                <DropdownMenuContent
                    class='w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                    :side='isMobile ? "bottom" : "right"'
                    align='end'
                    :side-offset='4'
                >
                    <DropdownMenuLabel class='p-0 font-normal'>
                        <div class='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                            <Avatar class='h-8 w-8 rounded-lg'>
                                <AvatarImage :src='user.avatar' :alt='user.name' />
                                <AvatarFallback class='bg-tertiary rounded-lg text-lg'>
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
                            @click='onClick'
                            class='focus:bg-foreground focus:text-accent cursor-pointer py-4 mb-2'
                        >
                            <MailPlus />
                            Register
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    
                    <DropdownMenuItem
                        @click='onClick'
                        class='focus:bg-foreground focus:text-accent cursor-pointer py-4'
                    >
                        <LogIn />
                        Log In
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
