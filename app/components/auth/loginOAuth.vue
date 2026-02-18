<template>
    <div class='flex items-center justify-evenly'>
        <Button
            v-for='provider in providers'
            :key='provider.name'
            @click='onLoginOAuth(provider.name)'
            variant='outline'
            type='button'
            class='flex-1 mx-2 rounded-lg'
        >
            <NuxtIcon
                :name='provider.icon'
                size='18'
            />
        </Button>
    </div>
</template>

<script setup>
    import { Button } from '@/components/ui/button/index.ts';
    
    // AuthStore
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { loginOAuth } = AuthStore;
    
    const providers = [
        { name: 'apple', icon: 'ph:apple-logo' },
        { name: 'google', icon: 'ph:google-logo' },
        { name: 'github', icon: 'ph:github-logo' },
    ];
    
    const onLoginOAuth = async (provider) => {
        const { data } = await loginOAuth(provider);
        
        if(data && data.url) {
            await navigateTo(data.url, {
                external: true,
            });
        }
    };
</script>