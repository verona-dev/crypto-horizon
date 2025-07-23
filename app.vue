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
    import 'vue-sonner/style.css';
</script>