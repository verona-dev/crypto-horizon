<template>
    <div class='flex items-center'>
        <Button
            v-for='provider in providers'
            :key='provider.name'
            @click='onLoginOAuth(provider.name)'
            variant='outline'
            type='button'
            class='flex-1 mx-2.5 h-10 rounded-lg'
        >
            <NuxtIcon
                :name='provider.icon'
                size='20'
            />
            
            <!--
            <span class='text-sm'>{{ provider.label }}</span>
            -->
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
        { name: 'github', label: 'Github', icon: 'ph:github-logo' },
        { name: 'linkedin_oidc', label: 'Linkedin', icon: 'ph:linkedin-logo' },
        { name: 'figma', label: 'Figma', icon: 'ph:figma-logo' },
        // { name: 'apple', icon: 'ph:apple-logo' },
        // { name: 'google', icon: 'ph:google-logo' },
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