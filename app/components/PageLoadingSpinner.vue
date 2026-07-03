<template>
    <div class='w-screen h-full flex justify-center items-center gap-8 pt-36'>
        <CustomSpinner />
        
        <GradientText
            :colors='["#00C2FF", "#10B981", "#D946EF", "#E91E63"]'
            :animation-speed='24'
        >
            <Title :tag='1' :level='3' class='font-great select-none'>{{ site_name }}</Title>
        
        </GradientText>
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
    import Title from '@/components/Title.vue';
    
    const siteConfig = useSiteConfig();
    const site_name = ref(siteConfig?.name || '');
    
    // Theme
    import { checkTheme } from '@/composables/checkTheme.js';
    const { darkThemes } = checkTheme();
</script>
