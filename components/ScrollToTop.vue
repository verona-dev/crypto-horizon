<template>
    <div v-if='show' @click='scrollOnClick' class='scroll-to-top'>
        Scroll to top
    </div>
</template>

<script setup>
    const scrollY = ref(0);
    const show = computed(() => scrollY.value >= 400);
    
    const handleScroll = () => scrollY.value = window.scrollY;
    
    const scrollOnClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });
    
    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>

<style scoped>
    .scroll-to-top {
        position: fixed;
        bottom: 100px;
        right: 25px;
        z-index: 30;
        //opacity: 0;
        transition: all 1s ease;
    }
</style>