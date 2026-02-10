<template>
    <div class='flex flex-col justify-center items-center gap-12'>
        <h2>Thank you for verifying your account.</h2>
        
        <Button variant="outline">
            <NuxtLink to='/'>Go Home</NuxtLink>
        </Button>
    </div>
</template>

<script setup>
    import { Button } from '@/components/ui/button'
    const route = useRoute();
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { verifyOtp } = AuthStore;
    
    const token = ref(route.query.token);
    
    onMounted(async() => {
        if(token.value) {
          await verifyOtp({ token: token.value });
        }
    });
</script>