<template>
    <div class='index page'>
        <Welcome />
    </div>
</template>

<script setup>
    import Welcome from '~/components/Welcome.vue';
    definePageMeta({
        layout: false,
    })
</script>