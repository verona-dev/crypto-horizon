<template>
    <div>
        <Navigation />
        <Welcome />
    </div>
</template>

<script setup>
    import Welcome from '~/components/Welcome.vue';
    import Navigation from '~/components/Navigation.vue';
    
    definePageMeta({
        layout: false,
    })
</script>