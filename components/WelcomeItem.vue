<template>
    <NuxtLink :to='to' :key='keyItem' class='link-item flex flex-col items-center justify-center'>
        <WelcomeSkeleton v-if='!isLoaded' />
        
        <NuxtImg
            :src='src'
            :alt='alt'
            @load='loadImg'
            :class="{ 'hidden': !isLoaded }"
        />
        
        <h3 class='my-5 uppercase'>{{ title }}</h3>
        <p>Image Loaded : {{isLoaded}} </p>
    </NuxtLink>
</template>

<script setup>
    import WelcomeSkeleton from '~/components/skeletons/WelcomeSkeleton.vue';
    
    const props = defineProps({
        title: String,
        src: String,
        alt: String,
        to: String,
        keyItem: String,
    });
    
    const {
        title,
        src,
        alt,
        to,
        keyItem
    } = toRefs(props);
    
    const isLoaded = ref(false);
    const loadImg = () => {
        isLoaded.value = true;
        console.log('herre');
    };
</script>

<style scoped>
    .link-item {
        &:hover img {
            opacity: 0.85;
            scale: 1.02;
        }
        
        &:hover h3 {
            color: var(--secondary);
        }
    }
    
    img {
        border-radius: 6px;
        height: 450px;
        object-fit: cover;
        transition: all 200ms ease-in-out;
        width: 300px;
    }
</style>