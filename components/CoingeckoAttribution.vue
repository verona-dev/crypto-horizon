<template>
    <Alert class='w-screen flex items-center justify-center mt-16 p-8 rounded-none'>
        <NuxtLink
            to='https://www.coingecko.com/en/api/'
            target='_blank'
            class='flex items-center gap-3 hover:underline'
            external
        >
            <h6>Data powered by</h6>
            
            <NuxtImg
                src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1759342218/CGAPI-Lockup-1_ysyezi.svg'
                alt='coingecko logo'
                v-slot='{ src, isLoaded, imgAttrs, alt }'
                width='250'
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
                    class='w-[250px] rounded-lg'
                />
            </NuxtImg>
        </NuxtLink>
    </Alert>
</template>

<script setup>
    import { Alert } from '@/components/ui/alert';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
</script>