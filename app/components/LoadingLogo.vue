<template>
    <TextGlitch
        :speed='3.5'
        :enable-shadows='true'
        text='Crypto Horizon'
        :enableOnHover='true'
        class='font-great animate-pulse !z-10'
    />
    
    <TextGlitch
        :speed='3.5'
        :enable-shadows='true'
        text='Loading'
        :enableOnHover='true'
        class='font-great animate-pulse !z-10'
    />
</template>

<script setup>
    import TextGlitch from '@/components/ui/text-glitch/TextGlitch.vue';
</script>