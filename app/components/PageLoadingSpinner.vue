<template>
    <div class='w-screen'>
        <div class='h-full flex justify-center items-center gap-8 pt-36'>
            <CustomSpinner />
            
            <GradientText
                :colors='["#818CF8", "#A78BFA", "#F0ABFC", "#E91E63"]'
                :animation-speed='8'
            >
                <h1 class='font-great text-4xl lg:text-5xl xl:text-7xl'>{{ site_name }}</h1>
            </GradientText>
        
        </div>
    </div>
    
    <SnowfallBg
        v-if='darkThemes'
        color="#e4d9e2"
        class='absolute inset-0 !min-h-lvh !min-w-full !z-0'
        :min-radius='0.1'
        :max-radius='2'
        :speed='0.2'
        :quantity='50'
    />
</template>

<script setup>
    import CustomSpinner from '~/components/CustomSpinner.vue';
    import GradientText from '~/components/ui/gradient-text/GradientText.vue';
    import { SnowfallBg } from '~/components/ui/snowfall-bg';
    
    const siteConfig = useSiteConfig();
    const site_name = ref(siteConfig?.name || '');
    
    // Theme
    import { checkTheme } from '@/composables/checkTheme.js';
    const { darkThemes } = checkTheme();
</script>
