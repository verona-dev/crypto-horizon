<template>
    <div class=''>
        login page
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: 'auth',
    });
</script>