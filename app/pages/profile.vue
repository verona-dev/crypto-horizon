<template>
    <div class='profile'>
        profile page:
        {{ profile }}
    </div>
</template>

<script setup>
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { getProfile } = ProfileStore;
    const { profile } = storeToRefs(ProfileStore);
    
    onMounted(async() => {
       await getProfile();
    });
    
    definePageMeta({
        middleware: ['auth'],
    });
</script>