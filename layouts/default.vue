<template>
    <Navigation />
    
    <main>
        <slot />
    </main>
</template>

<script setup>
    import Navigation from '~/components/Navigation.vue';
</script>