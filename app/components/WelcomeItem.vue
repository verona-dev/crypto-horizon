<template>
    <NuxtLink
        :to='to'
        class='link-item w-[450px] flex flex-col items-center justify-center rounded-lg z-10 cursor-pointer'
    >
        <div
            class='rounded-lg border border-muted flex items-center justify-center'
        >
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
                    :style='{ border: isHovered ? `1px solid var(--${border})` : "none" }'
                    :src='src'
                    :alt='alt'
                    @mouseenter="isHovered = true"
                    @mouseleave="isHovered = false"
                >
                
                <Skeleton
                    v-else
                    class='h-[275px] w-[385px] !rounded-lg'
                />
            </NuxtImg>
        </div>
        
        <h2 class='my-10'>{{ title }}</h2>
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
    const border = toRef(item.value?.border);
    
    const isHovered = ref(false);
</script>

<style scoped>
    .link-item {
        img {
            border: 1px solid transparent;
            border-radius: 6px;
            height: 275px;
            object-fit: cover;
            transition: all 200ms linear;
            width: 375px;
        }
        
        &:hover {
            color: var(--foreground);
            
            img {
                //transition: all 300ms ease-out;
                //border-radius: 8px !important;
                //border: 1px solid var(--green-shamrock);
                padding: 12px;
            }
        }
        
        h2 {
            letter-spacing: 0.5rem;
        }
        
        &:hover h2 {
            color: var(--primary);
            /*
            text-decoration: underline;
            text-underline-offset: 8px;
            */
        }
    }
</style>