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
                        <TooltipTrigger @mouseenter='show_tooltip = true'>
                            <Avatar
                                @click='toggleAvatarSelection'
                                class='h-52 w-52 rounded-full ring-offset-background ring-10 ring-secondary ring-offset-1 hover:cursor-pointer hover:ring-green-shamrock'
                            >
                                <AvatarImage
                                    :src='profile_avatar'
                                    alt='avatar'
                                />
                                <AvatarFallback class='rounded-full'>A</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        
                        <TooltipContent v-if='show_tooltip' :side-offset='15' side='right'>
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
                                type='single'
                                class='flex flex-wrap my-12 p-4'
                            >
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
                            </ToggleGroup>
                            
                            <DrawerFooter class='mb-16'>
                                <DrawerClose as-child>
                                    <Button
                                        @click='onSubmit'
                                        :disabled='is_current_avatar_selected'
                                    >
                                        Done
                                    </Button>
                                    
                                    <Button variant='outline'>
                                        Cancel
                                    </Button>
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
    
    const toggleAvatarSelection = async() => {
        drawer_visibility.value = !drawer_visibility.value;
        await getAvatars();
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