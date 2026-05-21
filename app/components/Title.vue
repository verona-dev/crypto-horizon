<script setup>
    import { cn } from '@/lib/utils';
    
    const props = defineProps({
        tag: { type: String, default: 'h1' },
        level: { type: String, default: 'h1' },
        class: { type: String, default: '' },
    });
    
    const tag = computed(() => props.tag ?? props.level);
    
    const styleClasses = {
        'h1': 'text-6xl md:text-7xl xl:text-9xl tracking-widest break-words',
        'h2': 'text-5xl xl:text-7xl',
        'h3': 'text-3xl xl:text-5xl !leading-8',
        'h4': 'text-xl xl:text-3xl',
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