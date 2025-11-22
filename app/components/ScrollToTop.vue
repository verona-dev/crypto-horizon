<template>
    <Button
        v-if='show'
        @click='scrollOnClick'
        variant='outline'
        class='scroll-to-top !bg-popover fixed bottom-28 right-12 transition-all duration-100 ease-linear py-5 rounded-md hover:cursor-pointer shadow-2xl z-50'
    >
        <NuxtIcon
            name='ph:caret-double-up-light'
            class='text-foreground'
            size='18'
        />
    </Button>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    const scrollY = ref(0);
    const show = computed(() => {
        /*
        if (route.path === '/market') {
            return scrollY.value > 5500;
        }
        */
        return scrollY.value > 500;
        
    });
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