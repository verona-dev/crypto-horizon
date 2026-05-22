<template>
    <div class='relative xl:w-screen h-screen flex justify-center items-center'>
        <div class='flex flex-col items-center justify-center gap-16 pb-8'>
            <h1 class='font-great text-4xl lg:text-6xl xl:text-8xl'>{{ site_name }}</h1>
            
            <ChainsCloud />
            
            <RadiantText
                class='!r inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400'
                :duration='5'
            >
                <span class="font-great text-3xl lg:text-5xl xl:text-7xl">Loading...</span>
            </RadiantText>
        </div>
        
        <SnowfallBg
            v-if='dark_mode'
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
    import { SnowfallBg } from '~/components/ui/snowfall-bg';
    import ChainsCloud  from '~/components/ChainsCloud.vue';
    import { RadiantText } from '~/components/ui/radiant-text';
    
    const siteConfig = useSiteConfig();
    const site_name = ref(siteConfig?.name || '');
    
    const siteConfig = useSiteConfig();
    const site_name = ref(siteConfig?.name || '');
    
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
</script>
