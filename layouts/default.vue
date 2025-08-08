<template>
    <Navigation />
    
    <main class='flex flex-1 flex-col items-center max-w-[2000px] mx-auto'>
        <Breadcrumb :article='article' />
        <slot />
    </main>
</template>

<script setup>
    import Navigation from '~/components/Navigation.vue';
    import Breadcrumb from '~/components/Breadcrumb.vue';
    
    // NewsStore
    import { storeToRefs } from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore';
    const NewsStore = useNewsStore();
    
    const { article } = storeToRefs(NewsStore);
</script>