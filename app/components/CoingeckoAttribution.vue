<template>
    <Card class='bg-sidebar h-20 w-screen flex items-center justify-center hover:border-border p-3.5 z-25'>
        <NuxtLink
            to='https://www.coingecko.com/en/api/'
            target='_blank'
            class='flex items-center gap-3 hover:text-primary'
            external
        >
            <p>Data powered by</p>
            
            <NuxtImg
                :src='!darkThemes ? dark_mode_url : light_mode_url'
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
                    class='w-[150px] rounded-xl'
                />
            </NuxtImg>
            
            <NewTabIcon class='mb-0.5' />
        </NuxtLink>
    </Card>
</template>

<script setup>
    import { Card } from '~/components/ui/card';
    import NewTabIcon from '~/components/NewTabIcon.vue';
    import { Skeleton } from '~/components/ui/skeleton';
    
    // Theme
    import { checkTheme } from '@/composables/checkTheme.js';
    const { darkThemes } = checkTheme();
    
    const light_mode_url = 'CGAPI-Lockup-1.svg';
    const dark_mode_url = 'CGAPI-Lockup.svg';
</script>