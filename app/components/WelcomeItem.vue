<template>
    <NuxtLink
        :to='to'
        class='link-item w-[450px] xl:w-1/3 flex flex-col items-center justify-center rounded-lg z-10 cursor-pointer'
        @mouseenter='isHovered = true'
        @mouseleave='isHovered = false'
    >
        <div class='rounded-lg border border-muted flex items-center justify-center'>
            <NuxtImg
                :src='src'
                :alt='alt'
                :custom='true'
                v-slot='{ src, isLoaded, imgAttrs }'
                preload
            >
                <img
                    v-if='isLoaded'
                    v-bind='imgAttrs'
                    class='!rounded-lg transition-all duration-150 ease-linear'
                    :style='{ border: `1px solid var(--${color})`}'
                    :src='src'
                    :alt='alt'
                >
                
                <Skeleton
                    v-else
                    class='h-[275px] w-[385px] !rounded-lg'
                />
            </NuxtImg>
        </div>
        
        <h3
            class='my-10'
            :style='isHovered && { color: `var(--${color})` }'
        >
            {{ title }}
        </h3>
    </NuxtLink>
</template>

<script setup>
    import { Skeleton } from '~/components/ui/skeleton';
    
    const props = defineProps({
        item: {
            type: Object,
            required: true,
        }
    });
    
    const { item } = toRefs(props);
    const title = toRef(item.value?.title);
    const src = toRef(item.value?.src);
    const alt = toRef(item.value?.alt);
    const to = toRef(item.value?.to);
    const color = toRef(item.value?.color);
    
    const isHovered = ref(false);
</script>

<style scoped>
    .link-item {
        img {
            height: 300px;
            object-fit: cover;
            transition: all 200ms linear;
            width: 425px;
        }
        
        &:hover {
            color: var(--foreground);
        }
        
        h2 {
            letter-spacing: 0.5rem;
        }
        
        &:hover h2 {
            color: var(--primary);
        }
    }
</style>