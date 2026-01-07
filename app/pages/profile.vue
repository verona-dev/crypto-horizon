<template>
    <div class='profile page gap-12'>
        <h3>Profile</h3>
        
        <div class='w-full flex flex-col xl:flex-row items-center justify-center gap-6'>
            <ProfileAvatar
                :username='username'
                :astronaut_type='astronaut_type'
            />
            
            <!--  Personal information -->
            <Card class='bg-popover h-full xl:h-120 w-full md:w-4/5 xl:w-140 flex flex-col p-6 gap-4 !shadow-none'>
                <CardHeader class='xl:mt-1'>
                    <CardTitle class='text-2xl'>Personal Information</CardTitle>
                </CardHeader>
                
                <div class='flex'>
                    <CardContent class='flex-1 flex flex-col gap-6'>
                        <div
                            v-for='item in profile_formatted.slice(0, 4)'
                            :key='item.name'
                            class='flex flex-col gap-0'
                        >
                            <span class='text-md text-muted-foreground'>{{ item.label }}</span>
                            <span :class='{ "capitalize" : item.name === "astronaut_type" }'>{{ item.value }}</span>
                        </div>
                    </CardContent>
                    
                    <CardContent class='flex-1 flex flex-col gap-6'>
                        <div
                            v-for='item in profile_formatted.slice(4, profile_formatted.length)'
                            :key='item.name'
                            class='flex flex-col gap-0'
                        >
                            <span class='text-md text-muted-foreground'>{{ item.label }}</span>
                            <span :class='{ "capitalize" : item.name === "astronaut_type" }'>{{ item.value }}</span>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    </div>
</template>

<script setup>
    import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    import ProfileAvatar from '~/components/profile/ProfileAvatar.vue';
    
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    import utc from 'dayjs/plugin/utc';
    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { profile } = storeToRefs(ProfileStore);
    const { getAvatars } = ProfileStore;
    
    const username = ref(profile.value?.username);
    const astronaut_type = ref(profile.value?.astronaut_type);
    
    const profile_formatted = computed(() => [
        { name: 'username', label: 'Username', value: username.value },
        { name: 'email', label: 'Email', value: profile.value?.email },
        { name: 'astronaut_type', label: 'Astronaut Type', value: astronaut_type.value },
        { name: 'location', label: 'Location', value: profile.value?.location },
        { name: 'bio', label: 'Bio', value: profile.value?.bio },
        { name: 'dob', label: 'Date of birth', value: profile.value?.dob ? dayjs.utc(profile.value?.dob).local().format('DD MMM YYYY') : '-' },
        { name: 'last_sign_in', label: 'Last sign in', value: profile.value?.last_sign_in ? dayjs(profile.value?.last_sign_in).fromNow() : '-' },
        { name: 'updated_at', label: 'Last profile update', value: profile.value?.updated_at ? dayjs(profile.value?.updated_at).fromNow() : '-' },
    ]);
    
    // SEO
    const title = 'Private Profile';
    
    definePageMeta({
        title,
        description: title,
    });
    
    useSeoMeta({
        robots: 'noindex, nofollow',
        title,
        description: title,
        ogTitle: undefined,
        ogDescription: undefined,
        ogImage: undefined,
        twitterCard: undefined,
    });
    
    onMounted(async() => {
        await getAvatars();
    });
</script>