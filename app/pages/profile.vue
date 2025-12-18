<template>
    <div class='profile'>
        this is profile page
    </div>
</template>

<script setup>
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { getUser } = AuthStore;
    
    onMounted(() => {
        getUser();
    });
    
    definePageMeta({
        middleware: ['auth'],
    });
</script>