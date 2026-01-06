<template>
    <div class='profile page gap-12'>
        <h3>Profile</h3>
        
        <Card class='flex flex-col p-6 gap-12'>
            <CardHeader class='items-center'>
                <CardTitle class='text-4xl capitalize'>{{ username }}</CardTitle>
                <CardDescription class='text-lg'>&#8226; {{ astronaut_type }} &#8226;</CardDescription>
            </CardHeader>
            
            <CardContent>
                <Avatar class='h-72 w-72 rounded-full'>
                    <AvatarImage
                        src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757869820/cat-7710382_zqbc1t.jpg'
                        alt='avatar'
                    />
                    <AvatarFallback class='rounded-full'>A</AvatarFallback>
                </Avatar>
            </CardContent>
        </Card>
        
        {{ profile }}
    </div>
</template>

<script setup>
    import { Card, CardTitle, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { profile } = storeToRefs(ProfileStore);
    
    const username = ref(profile.value?.username);
    const astronaut_type = ref(profile.value?.astronaut_type.toUpperCase());
</script>