<template>
    <Card class='bg-popover h-full w-full xl:min-w-160 flex flex-col !justify-around p-5 gap-4 !shadow-none'>
        <CardHeader class='flex-row justify-between'>
            <CardTitle class='text-3xl'>Personal Information</CardTitle>
            
            <Button
                @click='onHandleDrawer(true)'
                class='w-fit'
                variant='ghost'
                size='sm'
            >
                <NuxtIcon
                    name='ph:pencil-simple-line'
                    size='14'
                />
                
                Edit
            </Button>
        </CardHeader>
        
        <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
                <div
                    v-for='item in profile'
                    :key='item.name'
                    class='p-2'
                >
                    <span class='text-sm text-muted-foreground'>{{ item.label }}</span>
                    
                    <div v-if='item.name === "country"' class='flex items-center gap-2'>
                        <ProfileCountryFlag :country='item.value' size='w-4 h-4' />
                        <span>{{ item.value?.name }}</span>
                    </div>
                    
                    <div v-else-if='item.name === "timezone"' class='w-fit'>
                        <span>{{ item.value?.timezone }}</span>&nbsp;
                        <span>{{ item.value?.utc }}</span>
                    </div>
                    
                    <template v-else>
                        <span v-if='item.name === "dob"' class='mt-1 block'>{{ dayjs(item.value).format('DD.MM.YYYY') }}</span>
                        <span v-else class='block' :class='{ "capitalize" : item.name === "astronaut_type" }'>{{ item.value }}</span>
                    </template>
                </div>
            </div>
        </CardContent>
        
        <CardFooter>
            <Dialog>
                <DialogTrigger class='w-full'>
                    <Button variant='destructive' class='w-full'>
                        Delete Account
                    </Button>
                </DialogTrigger>
                
                <DialogContent class='p-10 gap-8'>
                    <DialogHeader class='gap-4'>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <DialogFooter class='flex items-center !justify-between'>
                        <DialogClose as-child class='flex-1'>
                            <Button variant='outline'>
                                Cancel
                            </Button>
                        </DialogClose>
                        
                        <Button
                            @click='onDeleteAccount'
                            variant='destructive'
                            class='flex-1'
                        >
                            Delete Account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
        
        <!--  Edit Profile  -->
        <ProfileEdit
            v-if='show_drawer'
            :profile='profile'
            :showDrawer='show_drawer'
            @handleDrawer='onHandleDrawer'
        />
    </Card>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
    import { Card, CardTitle, CardContent, CardHeader, CardFooter } from '~/components/ui/card';
    import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from '@/components/ui/dialog'
    import ProfileCountryFlag from '~/components/profile/ProfileCountryFlag.vue';
    import ProfileEdit from '~/components/profile/ProfileEdit.vue';
    import dayjs from 'dayjs';
    
    const props = defineProps({
        profile: {
            type: Array,
            required: true,
        }
    });
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { deleteProfile } = ProfileStore;
    
    const { profile } = toRefs(props);
    const show_drawer = ref(false);
    const onHandleDrawer = bool => show_drawer.value = bool;
    
    const onDeleteAccount = async() => {
        await deleteProfile();
    };
</script>