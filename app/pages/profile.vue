<template>
    <div class='profile'>
        this is profile page
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth'],
    });
</script>