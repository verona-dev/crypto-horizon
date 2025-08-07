<template>
    <Navigation />
    
    <main class='flex flex-1 flex-col items-center'>
        <Breadcrumb />
        <slot />
    </main>
</template>

<script setup>
    import Navigation from '~/components/Navigation.vue';
    import Breadcrumb from '~/components/Breadcrumb.vue';
</script>