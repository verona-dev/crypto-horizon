<template>
    <div class='flex items-center justify-evenly'>
        <Button @click='onLoginOAuth("apple")' variant='outline' type='button' size='icon'>
            <NuxtIcon
                name='ph:apple-logo'
                size='18'
            />
        </Button>
        
        <Button @click='onLoginOAuth("google")' variant='outline' type='button' size='icon'>
            <NuxtIcon
                name='ph:google-logo'
                size='18'
            />
        </Button>
        
        <Button @click='onLoginOAuth("github")' variant='outline' type='button' size='icon'>
            <NuxtIcon
                name='ph:github-logo'
                size='18'
            />
        </Button>
    </div>
</template>

<script setup>
    import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
    import { Button } from '@/components/ui/button/index.ts';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { loginOAuth } = AuthStore;
    
    const onLoginOAuth = async (provider) => {
        await loginOAuth(provider);
    };
</script>