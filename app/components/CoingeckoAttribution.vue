<template>
    <Card class='bg-background w-screen flex items-center justify-center mt-16 p-3.5 z-25'>
        <NuxtLink
            to='https://www.coingecko.com/en/api/'
            target='_blank'
            class='flex items-center gap-3 hover:underline'
            external
        >
            <p class='text-sm'>Data powered by</p>
            
            <NuxtImg
                src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1759342218/CGAPI-Lockup-1_ysyezi.svg'
                alt='coingecko logo'
                v-slot='{ src, isLoaded, imgAttrs, alt }'
                width='150'
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
                    class='w-[150px] rounded-lg'
                />
            </NuxtImg>
            
            <NuxtIcon
                name='iconoir:open-new-window'
                size='12'
                class='icon opacity-0'
            />
        </NuxtLink>
    </Card>
</template>

<script setup>
    import { Card } from '~/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton';
</script>

<style scoped>
    a {
        &:hover {
            .name {
                text-decoration: underline;
            }
            
            .icon {
                opacity: 1;
            }
        }
    }
</style>