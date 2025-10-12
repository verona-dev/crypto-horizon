<template>
    <NuxtLink :to='to' class='link-item w-[450px] flex flex-col items-center justify-center'>
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
                class='h-[275px] w-[385px] rounded-lg'
            />
        </NuxtImg>
        
        <h2 class='my-10'>{{ title }}</h2>
    </NuxtLink>
</template>

<script setup>
    import { Skeleton } from '~/components/ui/skeleton';
    
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
            height: 250px;
            object-fit: cover;
            transition: all 150ms ease-out;
            width: 375px;
        }
        
        &:hover {
            color: var(--foreground);
            
            img {
                scale: 1.01;
            }
        }
        
        h2 {
            letter-spacing: 0.5rem;
        }
        
        &:hover h2 {
            color: var(--foreground);
            //text-decoration: underline;
            //text-underline-offset: 8px;
        }
    }
</style>