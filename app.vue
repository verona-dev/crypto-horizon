<template>
    <NuxtLoadingIndicator />
    <Toaster />
    
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script>
    import { Toaster } from '@/components/ui/sonner';
    import 'vue-sonner/style.css'
</script>