<template>
    <div class='profile'>
        profile page:
        {{ profile }}
    </div>
</template>

<script setup>
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { getProfile } = AuthStore;
    const { profile } = storeToRefs(AuthStore);
    
    onMounted(async() => {
       await getProfile();
    });
    
    definePageMeta({
        middleware: ['auth'],
    });
</script>