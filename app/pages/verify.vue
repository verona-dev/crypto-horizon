<template>
    <div class='page gap-24'>
        <NuxtIcon
            name='ph:seal-check'
            size='120'
            class='bg-progress'
        />
        
        <h3>Account verified successfully!</h3>
        
        <div class='flex gap-8'>
            <NuxtLink to='/'>
                <Button variant='outline' size='lg' class='w-42'>Go Home</Button>
            </NuxtLink>
            
            <NuxtLink to='/profile'>
                <Button variant='outline' size='lg' class='w-42'>Profile</Button>
            
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
    import { Button } from '@/components/ui/button';
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { getProfile } = ProfileStore;
    
    definePageMeta({
        middleware: 'verify',
    });
    
    onMounted(async() => await getProfile());
</script>