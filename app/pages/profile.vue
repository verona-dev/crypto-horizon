<template>
    <div class='profile page gap-12'>
        <h3>Profile</h3>
        
        <div class='h-140 flex flex-col xl:flex-row items-center gap-6'>
            <!--  Avatar + Username  -->
            <Card class='bg-popover h-full xl:w-120 flex flex-col items-center p-6 gap-8 !shadow-none'>
                <CardHeader class='items-center'>
                    <CardTitle class='text-4xl'>{{ username }}</CardTitle>
                    <CardDescription class='text-lg capitalize'>&#8226; {{ astronaut_type }} &#8226;</CardDescription>
                </CardHeader>
                
                <CardContent>
                    <div class='p-2 rounded-full shadow-lg'>
                        <Avatar class='h-72 w-72 rounded-full ring-offset-background ring-12 ring-ebony-clay ring-offset-1'>
                            <AvatarImage
                                src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757869820/cat-7710382_zqbc1t.jpg'
                                alt='avatar'
                            />
                            <AvatarFallback class='rounded-full'>A</AvatarFallback>
                        </Avatar>
                    </div>
                </CardContent>
            </Card>
            
            <!--  Personal information -->
            <Card class='bg-popover h-full xl:w-120 flex flex-col p-6 !shadow-none'>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                
                <CardContent class='flex flex-col gap-4'>
                    <div
                        v-for='item in personal_information'
                        :key='item.name'
                        class='flex flex-col gap-0'
                    >
                        <span class='text-md text-muted-foreground'>{{ item.label }}</span>
                        <span :class='{ "capitalize" : item.name === "astronaut_type" }'>{{ item.value }}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>

<script setup>
    import { Card, CardTitle, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
    
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    import utc from 'dayjs/plugin/utc';
    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { profile } = storeToRefs(ProfileStore);
    
    const username = ref(profile.value?.username);
    const astronaut_type = ref(profile.value?.astronaut_type);
    
    const personal_information = ref([
        { name: 'username', label: 'Username', value: username.value },
        { name: 'email', label: 'Email', value: profile.value?.email },
        { name: 'astronaut_type', label: 'Astronaut Type', value: astronaut_type.value },
        { name: 'location', label: 'Location', value: profile.value?.location },
        { name: 'dob', label: 'Date of birth', value: dayjs.utc(profile.value?.dob).local().format('DD MMM YYYY') },
        { name: 'bio', label: 'Bio', value: profile.value?.bio },
        { name: 'updated_at', label: 'Last updated', value: dayjs(profile.value?.updated_at).fromNow() },
    ]);
</script>