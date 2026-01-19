<template>
    <NuxtImg
        v-if='country'
        :src="`https://flagcdn.com/w20/${props.country.code.toLowerCase()}.webp`"
        :key='country.code'
        alt="Country flag"
        :class='cn("h-5 w-5 rounded-full",props.size)'
    />
</template>

<script setup>
    import { cn } from '@/lib/utils.ts';
    const props = defineProps({
        country: Object,
        size: String,
    });
</script>