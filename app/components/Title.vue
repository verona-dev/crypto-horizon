<script setup>
    import { cn } from '@/lib/utils';
    
    const props = defineProps({
        tag: { type: String },
        level: { type: String },
        class: { type: String },
    });
    
    const tag = computed(() => props.tag ?? props.level ?? 'h1');
    const level = computed(() => props.level ?? props.tag ?? 'h1');
    
    const styleClasses = {
        'h1': 'text-6xl md:text-7xl xl:text-9xl tracking-widest break-words',
        'h2': 'text-5xl xl:text-7xl',
        'h3': 'text-3xl xl:text-5xl !leading-8',
        'h4': 'text-xl xl:text-2xl',
        'h5': 'text-xl',
        'h6': 'text-lg text-left',
    };
</script>

<template>
    <component
        :is='tag'
        :class='cn(styleClasses[level], props.class)'
        v-bind='$attrs'
    >
        <slot />
    </component>
</template>