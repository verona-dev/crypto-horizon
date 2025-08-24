<template>
    <Navigation />
    
    <NavigationNew />
    
    <main class='flex flex-1 flex-col items-center max-w-[2000px] mx-auto'>
        <Breadcrumb />
        <slot />
        <ScrollToTop />
    </main>
</template>

<script setup>
    import Navigation from '~/components/Navigation.vue';
    import NavigationNew from '~/components/NavigationNew.vue';
    import Breadcrumb from '~/components/Breadcrumb.vue';
    import ScrollToTop from '~/components/ScrollToTop.vue';
</script>