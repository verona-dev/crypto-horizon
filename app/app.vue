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
    
    const route = useRoute();
    const config = useRuntimeConfig();
    const url = computed(() => `${config.public.site_url}${route.path}`);
    
    useHead(() => ({
        link: [
            {
                rel: 'canonical',
                href: url,
            },
        ],
    }));
</script>