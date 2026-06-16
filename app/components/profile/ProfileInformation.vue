<template>
    <Card class='h-full flex flex-col !justify-around p-6 2xl:pl-0 gap-4 rounded-none !rounded-tr-xl !border-l-0 !border-b-0'>
        <CardHeader class='flex-row justify-between'>
            <CardTitle class='text-3xl'>Personal Information</CardTitle>
            
            <Button
                @click='onHandleDrawer(true)'
                variant='outline'
                size='lg'
                class='border-primary/25 hover:border-primary/50 hover:bg-muted/50'
                aria-label='edit profile'
            >
                <NuxtIcon
                    name='ph:pencil-simple-line'
                    size='14'
                />
                
                Edit
            </Button>
        </CardHeader>
        
        <CardContent class='max-w-5xl 2xl:px-0'>
            <SplitFlapDisplay
                :rows='rows'
                :columns='columns'
                size='sm'
                accent-color='#00bc7d'
                :show-indicators='true'
                :stagger-delay='20'
                :flip-speed='35'
            />
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

<script setup lang='ts'>
    import { Button } from '~/components/ui/button';
    import { Card, CardTitle, CardContent, CardHeader, CardFooter } from '~/components/ui/card';
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
    import ProfileCountryFlag from '~/components/profile/ProfileCountryFlag.vue';
    import ProfileEdit from '~/components/profile/ProfileEdit.vue';
    import dayjs from 'dayjs';
    import SplitFlapDisplay from '~/components/ui/split-flap-display/SplitFlapDisplay.vue';
    
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
    console.log(profile.value);
    
    const rows = computed(() => {
        return profile.value?.flatMap((item:any) => {
            if (item.name === 'bio') return [];
            
            if (item.name === 'timezone') {
                return [
                    { label: 'Timezone', value: item.value.timezone },
                    { label: 'Offset', value: item.value.utc }
                ];
            }
            
            if (item.name === 'country') {
                return { label: item.label, value: item.value.name };
            }
            
            if (item.name === 'dob') {
                return { label: item.label, value: dayjs(item.value).format('DD.MM.YYYY') };
            }
            
            return { label: item.label, value: item.value };
        });
    });
    
    const columns = computed(() => {
        if(!rows.value) return 24;
        return Math.max(...rows.value.map(row => row.value.length)) + 1;
    });
    
    const show_drawer = ref(false);
    const onHandleDrawer = bool => show_drawer.value = bool;
    
    const onDeleteAccount = async() => {
        await deleteProfile();
    };
</script>