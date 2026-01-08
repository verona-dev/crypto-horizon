<template>
    <Card class='bg-popover h-full xl:h-120 w-full md:w-4/5 xl:w-fit flex flex-col items-center p-6 gap-4 !shadow-none relative'>
        <CardHeader class='items-center gap-2'>
            <CardTitle class='text-4xl'>{{ username }}</CardTitle>
            <CardDescription class='text-lg capitalize'>&#8226; {{ astronautType }} &#8226;</CardDescription>
        </CardHeader>
        
        <CardContent>
            <div class='p-2 rounded-full shadow-lg'>
                <TooltipProvider :delayDuration='250'>
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar
                                @click='toggleAvatarSelection'
                                class='h-52 w-52 rounded-full ring-offset-background ring-10 ring-secondary ring-offset-1 hover:cursor-pointer hover:ring-green-shamrock'
                            >
                                <AvatarImage
                                    :src='avatar_src'
                                    alt='avatar'
                                />
                                <AvatarFallback class='rounded-full'>A</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        
                        <TooltipContent :side-offset='15' side='right'>
                            <p class='text-xs'>Change Avatar</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                
                <!--  Avatar Change  -->
                <Drawer v-model:open='drawer_visibility'>
                    <DrawerContent>
                        <div class='mx-auto w-full max-w-sm lg:max-w-lg'>
                            <DrawerHeader>
                                <DrawerTitle>Select your avatar</DrawerTitle>
                                <DrawerDescription>Click to select your profile avatar.</DrawerDescription>
                            </DrawerHeader>
                            
                            <ToggleGroup
                                type='single'
                                class='flex flex-wrap my-12 py-8 border border-orange-300'
                            >
                                <template v-for='(avatar, index) in avatars' :key='index'>
                                    <ToggleGroupItem
                                        v-slot='{ pressed }'
                                        :value='index'
                                        class='w-20 h-20 relative rounded-lg'
                                    >
                                        <Avatar class='rounded-lg w-fit h-fit'>
                                            <AvatarImage :src='avatar' alt='avatar image' />
                                            <AvatarFallback>Av</AvatarFallback>
                                        </Avatar>
                                        
                                        <BadgeCheck
                                            v-if='pressed'
                                            class='absolute bottom-1 -right-1 size-4.5 rounded-full fill-blue-500 text-white'
                                        />
                                    </ToggleGroupItem>
                                </template>
                            </ToggleGroup>
                            
                            <DrawerFooter>
                                <Button @click='onSelect'>Done</Button>
                                
                                <DrawerClose as-child>
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
    import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { avatars } = storeToRefs(ProfileStore);
    const { getAvatars } = ProfileStore;
    
    const props = defineProps({
        username: String,
        astronautType: String,
    });
    
    const { username, astronautType } = toRefs(props);
    
    const avatar_src = ref('https://oqnuuqvoiolgpdpkhyby.supabase.co/storage/v1/object/public/avatars/avatar-6.webp');
    const drawer_visibility = ref(false);
    const toggleAvatarSelection = async() => {
        drawer_visibility.value = !drawer_visibility.value;
        await getAvatars();
    };
    
    const onSelect = () => {
        console.log('selected');
        console.log(avatars.value);
    };
</script>