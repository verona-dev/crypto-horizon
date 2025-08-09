<template>
    <div @click='scrollOnClick' class='scroll-to-top'>
        Scroll to top
    </div>
</template>

<script setup>
    const scrollOnClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
</script>

<style scoped>

</style>