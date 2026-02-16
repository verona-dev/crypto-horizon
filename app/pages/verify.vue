<template>
    <div v-if='!verified' class='flex flex-col justify-center items-center gap-12'>
        <h3>Verifying your account...</h3>
    </div>
    
    <div v-else class='flex flex-col justify-center items-center gap-12'>
        <NuxtIcon
            name='ph:seal-check'
            size='120'
            class='bg-progress'
        />
        
        <h3>Account verified successfully!</h3>
        
        <Button variant='outline'>
            <NuxtLink to='/'>Go Home</NuxtLink>
        </Button>
    </div>
</template>

<script setup>
    import { Button } from '@/components/ui/button';
    const route = useRoute();
    
    // AuthStore
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { verifyOtp } = AuthStore;
    
    const token = ref(route.query.token);
    const verified = ref(false);
    
    definePageMeta({
        middleware: 'verify',
    });
    
    onMounted(async() => {
        if(token.value) {
          const { error } = await verifyOtp({ token: token.value });
          
          if(!error) {
              verified.value = true;
              
              setTimeout(() => {
                  navigateTo('/profile');
              }, 3000);
          }
        }
    });
</script>