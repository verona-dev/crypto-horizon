<template>
    <div class='watchlist'>
        <p
            v-for='coin in watchlist'
            :key='coin'
        >
            {{ coin }}
        </p>
    </div>
</template>

<script setup>
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { profile } = storeToRefs(ProfileStore);
    
    const watchlist = ref(profile.value?.watchlist);
</script>
