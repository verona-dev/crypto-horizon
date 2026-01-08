<template>
    <div class='profile page gap-12'>
        <h3>Profile</h3>
        
        <div class='w-full flex flex-col xl:flex-row items-center justify-center gap-6'>
            <ProfileAvatar
                :username='username'
                :astronaut-type='astronaut_type'
            />
            
            <ProfileInformation :profile='profile_formatted' />
        </div>
    </div>
</template>

<script setup>
    import ProfileAvatar from '~/components/profile/ProfileAvatar.vue';
    import ProfileInformation from '~/components/profile/ProfileInformation.vue';
    
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
</script>