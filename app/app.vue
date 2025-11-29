<template>
    <div vaul-drawer-wrapper id='app'>
        <NuxtLoadingIndicator />
        
        <NuxtLayout>
            <NuxtPage />
            <Toaster position='top-center' />
        </NuxtLayout>
    </div>
</template>

<script setup>
    import 'vue-sonner/style.css';
    
    const route = useRoute();
    const config = useRuntimeConfig();
    
    useHead(() => ({
        link: [
            {
                rel: 'canonical',
                href: `${config.public.site_url}` + route.path,
            },
        ],
    }));
</script>