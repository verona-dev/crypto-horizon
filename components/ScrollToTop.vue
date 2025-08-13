<template>
    <Button
        v-if='show'
        @click='scrollOnClick'
        variant='outline'
        class='!bg-background py-5 scroll-to-top rounded-md hover:cursor-pointer'
    >
        <NuxtIcon
            name='radix-icons:double-arrow-up'
            class='text-sky-100'
            size='18'
        />
    </Button>
</template>

<script setup>
    import { Button } from '@/components/ui/button';
    
    const scrollY = ref(0);
    const show = computed(() => scrollY.value >= 500);
    
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
        bottom: 75px;
        right: 50px;
        z-index: 100;
        transition: all 1s ease;
        box-shadow: 5px 5px 100px -6px var(--color-sky);
        
        &:hover {
            border:1px solid var(--color-sky) !important;
        }
    }
</style>