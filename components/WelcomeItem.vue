<template>
    <NuxtLink :to='to' class='link-item w-96'>
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
                class='h-[300px] w-[385px] rounded-lg'
            />
        </NuxtImg>
        
        <h2 class='my-10'>{{ title }}</h2>
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
            height: 275px;
            object-fit: cover;
            transition: all 150ms ease-out;
            width: 425px;
        }
        
        &:hover {
            img {
                opacity: 0.9;
                scale: 1.01;
            }
            /*
            h2 {
                border-left: 1px solid var(--snowy-mint);
                border-right: 1px solid var(--snowy-mint);
            }
            */
        }
        
        h2 {
            letter-spacing: 0.75rem;
        }
        
        &:hover h2 {
            color: var(--snowy-mint);
        }
    }
</style>