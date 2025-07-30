<template>
    <NuxtLink :to='to' class='link-item flex flex-col items-center justify-center'>
        <NuxtImg
            :src='src'
            :alt='alt'
            :custom='true'
            v-slot='{ src, isLoaded, imgAttrs }'
            preload
        >
            <img
                v-if='isLoaded'
                v-bind='imgAttrs'
                :src='src'
                :alt='alt'
            >
            
            <Skeleton
                v-else
                class='h-[450px] w-[305px] rounded-lg'
            />
        </NuxtImg>
        
        <h3 class='my-10'>{{ title }}</h3>
    </NuxtLink>
</template>

<script setup>
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    
    const props = defineProps({
        title: String,
        src: String,
        alt: String,
        to: String,
    });
    
    const { title, src, alt, to } = toRefs(props);
</script>

<style scoped>
    .link-item {
        img {
            border-radius: 6px;
            height: 450px;
            object-fit: cover;
            object-position: center top;
            transition: all 150ms ease-in-out;
            width: 300px;
        }
        
        &:hover img {
            opacity: 0.9;
            scale: 1.01;
        }
        
        /*
        &:hover h3 {
            color: var(--secondary);
        }
        */
    }
</style>