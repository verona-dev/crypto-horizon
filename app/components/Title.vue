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
        1: 'text-8xl xl:text-9xl',
        2: 'text-6xl xl:text-8xl',
        3: 'text-5xl xl:text-6xl',
        4: 'text-3xl xl:text-4xl',
        5: 'text-2xl',
        6: 'text-xl',
    };
</script>

<template>
    <component
        :is='tag'
        :class="['my-1', cn(styles[level], props.class), $attrs.class]"
        v-bind='$attrs'
    >
        <slot />
    </component>
</template>