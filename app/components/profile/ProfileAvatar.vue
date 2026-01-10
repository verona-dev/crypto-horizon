<template>
    <Card class='bg-popover h-full xl:h-120 w-full md:w-4/5 xl:w-fit flex flex-col items-center p-6 gap-4 !shadow-none relative'>
        <CardHeader class='items-center gap-2'>
            <CardTitle class='text-4xl'>{{ username }}</CardTitle>
            <CardDescription class='text-lg capitalize'>&#8226; {{ astronautType }} &#8226;</CardDescription>
        </CardHeader>
        
        <CardContent>
            <div class='p-2 rounded-full shadow-lg'>
                <TooltipProvider :delayDuration='150'>
                    <Tooltip>
                        <TooltipTrigger
                            @mouseenter='show_tooltip = true'
                            @mouseleave='show_tooltip = false'
                        >
                            <Avatar
                                @click='toggleDrawer'
                                class='h-52 w-52 rounded-full ring-offset-background ring-10 ring-secondary hover:cursor-pointer hover:ring-green-shamrock'
                            >
                                <AvatarImage
                                    :src='profile_avatar'
                                    alt='avatar'
                                />
                                <AvatarFallback class='rounded-full'>A</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        
                        <TooltipContent v-if='show_tooltip' :side-offset='15' side='left'>
                            <p class='text-xs'>Change Avatar</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                
                <!--  Avatar Change  -->
                <Drawer v-model:open='drawer_visibility'>
                    <DrawerContent>
                        <div class='mx-auto w-full max-w-sm lg:max-w-lg'>
                            <DrawerHeader class='my-6'>
                                <DrawerTitle class='text-3xl'>Choose an avatar</DrawerTitle>
                                <DrawerDescription class='text-md'>Click to select your profile avatar.</DrawerDescription>
                            </DrawerHeader>
                            
                            <ToggleGroup
                                v-model='selected_avatar'
                                @update:model-value='handleAvatarSelection'
                                type='single'
                                class='flex flex-wrap my-12 xl:h-64 p-4'
                            >
                                <div v-if='!avatars' class='flex flex-wrap justify-evenly'>
                                    <template v-for='n in 8' :key='n'>
                                        <Skeleton class='w-20 h-20 m-3.5 rounded-lg' />
                                    </template>
                                </div>
                                
                                <template v-else>
                                    <template v-for='avatar in avatars' :key='avatar'>
                                        <ToggleGroupItem
                                            v-slot='{ pressed }'
                                            :value='avatar'
                                            class='w-24 h-24 m-2 relative rounded-lg border border-transparent data-[state=on]:bg-transparent'
                                        >
                                            <Avatar class='rounded-lg w-fit h-fit'>
                                                <AvatarImage :src='avatar' alt='avatar image' />
                                                <AvatarFallback>Av</AvatarFallback>
                                            </Avatar>
                                            
                                            <BadgeCheck
                                                v-if='pressed'
                                                class='absolute bottom-1 -right-1 size-4.5 rounded-full fill-progress/80 text-white'
                                            />
                                        </ToggleGroupItem>
                                    </template>
                                </template>
                            </ToggleGroup>
                            
                            <DrawerFooter class='mb-16 gap-4'>
                                <DrawerClose as-child>
                                    <Button
                                        @click='onSubmit'
                                        :disabled='is_current_avatar_selected || !selected_avatar'
                                    >
                                        {{ button_label }}
                                    </Button>
                                </DrawerClose>
                                
                                <DrawerClose as-child>
                                    <Button variant='outline'>Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </CardContent>
        
        <CardFooter>
            <Badge class='bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 shadow-none rounded-full'>
                <div class='h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1' />
                <span class='text-xxs'>Connected</span>
            </Badge>
        </CardFooter>
    </Card>
</template>

<script setup>
    import { BadgeCheck } from 'lucide-vue-next';
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
    import { Badge } from '~/components/ui/badge';
    import { Button } from '~/components/ui/button';
    import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '~/components/ui/drawer';
    import { Skeleton } from '~/components/ui/skeleton';
    import { toast } from 'vue-sonner';
    import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { avatars, profile } = storeToRefs(ProfileStore);
    const { getAvatars, updateAvatar, getProfile } = ProfileStore;
    
    const props = defineProps({
        username: String,
        astronautType: String,
    });
    
    const { username, astronautType } = toRefs(props);
    
    const show_tooltip = ref(false);
    const profile_avatar = computed(() => profile.value?.avatar_url);
    const selected_avatar = ref(profile_avatar.value);
    const drawer_visibility = ref(false);
    const is_current_avatar_selected = computed(() => profile_avatar.value === selected_avatar.value);
    const button_label = computed(() => is_current_avatar_selected.value ? 'Current Avatar' : 'Select Avatar');
    
    const toggleDrawer = async() => {
        drawer_visibility.value = !drawer_visibility.value;
        await getAvatars();
    };
    
    const handleAvatarSelection = (newValue) => {
        if(!newValue) {
            return selected_avatar.value = profile_avatar.value;
        };
        selected_avatar.value = newValue;
    };
    
    const displayToast = (message) => {
        toast.promise(() => new Promise((resolve) => setTimeout(resolve, 250)), {
            success: () => message,
        });
    };
    
    watch(profile_avatar, () => {
        displayToast('Avatar updated successfully.');
    });
    
    const onSubmit = async() => {
        if(profile_avatar.value !== selected_avatar.value) {
            const { success } = await updateAvatar(selected_avatar.value);
            
            if(success) {
                await getProfile();
            }
        } else {
            displayToast('Cannot update avatar.');
        }
        show_tooltip.value = false;
    };
</script>