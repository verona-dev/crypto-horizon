<template>
    <New />
    
    <main>
        <slot />
    </main>
</template>

<script setup>
    import Header from '~/components/Header.vue';
    import New from '~/components/New.vue';
</script>