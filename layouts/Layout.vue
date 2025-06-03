<template>
    <Header />
    <main>
        <slot />
    </main>
</template>

<script setup>
    import Header from '~/components/layout/Header.vue';
</script>