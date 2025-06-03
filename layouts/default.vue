<template>
    <Navigation />
    
    <main>
        <slot />
    </main>
</template>

<script setup>
    import Navigation from '~/components/navigation/Navigation.vue';
</script>