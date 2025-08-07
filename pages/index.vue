<template>
    <Navigation />
    <Welcome />
</template>

<script setup>
    import Welcome from '~/components/Welcome.vue';
    import Navigation from '~/components/Navigation.vue';
    
    definePageMeta({
        layout: false,
    })
</script>