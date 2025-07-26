<template>
    <NuxtLink :to='to' class='link-item flex flex-col items-center justify-center'>
        <WelcomeSkeleton v-if='!isLoaded' />
        
        <NuxtImg
            :src='src'
            :alt='alt'
            @load='loadImg'
            v-else
        />
        <h3 class='my-5 uppercase'>{{ title }}</h3>
    </NuxtLink>
</template>

<script setup>
    import WelcomeSkeleton from '~/components/skeletons/WelcomeSkeleton.vue';
    
    const props = defineProps({
        src: String,
        alt: String,
        to: String,
        title: String,
    });
    
    const {
        src,
        alt,
        to,
        title,
    } = toRefs(props);
    
    const isLoaded = ref(false);
    const loadImg = () => isLoaded.value = true;
</script>

<style scoped>

</style>