<template>
    <div class='relative w-screen h-full flex justify-center items-center'>
        <GradientText
            :colors="['#5227FF', '#FF9FFC', '#B19EEF']"
            :animation-speed="8"
        >
            <h1 class='font-great text-4xl lg:text-6xl xl:text-8xl'>{{ site_name }}</h1>
        </GradientText>
        
        <SnowfallBg
            v-if='darkThemes'
            color="#e4d9e2"
            class='absolute inset-0 !min-h-lvh !min-w-full !z-0'
            :min-radius='0.1'
            :max-radius='2'
            :speed='0.2'
            :quantity='50'
        />
    </div>
</template>

<script setup>
    import GradientText from '~/components/ui/gradient-text/GradientText.vue';
    import { SnowfallBg } from '~/components/ui/snowfall-bg';
    
    const siteConfig = useSiteConfig();
    const site_name = ref(siteConfig?.name || '');
    
    // Theme
    import { checkTheme } from '@/composables/checkTheme.js';
    const { darkThemes } = checkTheme();
</script>
