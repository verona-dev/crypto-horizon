<template>
    <div class='relative hidden lg:flex w-full h-full flex-col items-center justify-center overflow-hidden'>
        <div class='flex w-full items-center justify-center mr-6'>
            <TextGlitch
                :speed='3.5'
                :enable-shadows='true'
                :text='site_name'
                :enableOnHover='true'
                class='project-name font-great !z-10'
            />
        </div>
        
        <LoadingChains />
    </div>
</template>

<script setup>
    import LoadingChains  from '@/components/LoadingChains.vue';
    import TextGlitch from '~/components/ui/text-glitch/TextGlitch.vue';
    
    const siteConfig = useSiteConfig();
    const site_name = ref(siteConfig?.name || '');
</script>