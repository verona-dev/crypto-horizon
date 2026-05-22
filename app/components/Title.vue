<script setup lang='ts'>
    import { cn } from '@/lib/utils';
    
    interface Props {
        tag?: 1 | 2 | 3 | 4 | 5 | 6
        level?: 1 | 2 | 3 | 4 | 5 | 6
        class?: string
    }
    
    const props = defineProps<Props>();
    
    const validate = (value:number) => value === undefined ? 1 : value >= 1 && value <= 6 ? value : 1;
    const tag = computed(() => `h${validate(props.tag ?? props.level ?? 1)}`);
    const level = computed(() => validate(props.level ?? props.tag ?? 1));
    
    const styles: Record<number, string>   = {
        1: 'text-6xl md:text-7xl xl:text-9xl tracking-widest break-words',
        2: 'text-5xl xl:text-7xl',
        3: 'text-3xl xl:text-5xl !leading-8',
        4: 'text-xl xl:text-2xl',
        5: 'text-xl',
        6: 'text-lg text-left',
    };
</script>

<template>
    <component
        :is='tag'
        :class='cn(styles[level], props.class)'
        v-bind='$attrs'
    >
        <slot />
    </component>
</template>