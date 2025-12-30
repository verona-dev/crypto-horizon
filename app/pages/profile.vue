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
    const { profile } = storeToRefs(ProfileStore);
</script>