<template>
    <div vaul-drawer-wrapper id='app'>
        <NuxtLoadingIndicator />
        
        <NuxtLayout>
            <NuxtPage />
            <Toaster position='top-center' />
        </NuxtLayout>
    </div>
</template>

<script>
    import { Toaster } from './app/components/ui/sonner'
    import 'vue-sonner/style.css';
</script>