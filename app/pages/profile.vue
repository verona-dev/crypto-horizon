<template>
    <div class='profile page gap-12 flex-col'>
        <h3>Profile</h3>
        
        <div class='flex flex-col items-center gap-6'>
            <div class='w-full flex flex-col xl:flex-row items-center justify-center gap-6'>
                <ProfileAvatar
                    :username='profile.username'
                    :astronaut-type='profile.astronaut_type'
                />
                
                <ProfileInformation :profile='profile_formatted' />
            </div>
            
            <client-only>
                <ProfileMap :coordinates='coordinates' />
            </client-only>
        </div>
    </div>
</template>

<script setup>
    import ProfileAvatar from '~/components/profile/ProfileAvatar.vue';
    import ProfileInformation from '~/components/profile/ProfileInformation.vue';
    import ProfileMap from '~/components/profile/ProfileMap.vue';
    
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    import utc from 'dayjs/plugin/utc';
    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { profile } = storeToRefs(ProfileStore);
    
    const profile_formatted = computed(() => [
        { name: 'username', label: 'Username', value: profile.value?.username },
        { name: 'email', label: 'Email', value: profile.value?.email },
        { name: 'astronaut_type', label: 'Astronaut Type', value: profile.value?.astronaut_type },
        { name: 'dob', label: 'Date of birth', value: profile.value?.dob ? profile.value?.dob : '-' },
        { name: 'country', label: 'Country', value: profile.value?.country },
        { name: 'timezone', label: 'Timezone', value: profile.value?.country?.timezone },
        { name: 'bio', label: 'Bio', value: profile.value?.bio },
        { name: 'updated_at', label: 'Last profile update', value: profile.value?.updated_at ? dayjs(profile.value?.updated_at).fromNow() : '-' },
    ]);
    
    const coordinates = ref([33, 65]);
    
    // console.log(profile_formatted.value);
    
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